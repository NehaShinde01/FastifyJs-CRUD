// Require the framework and instantiate it
const app = require('fastify')({ logger: true })

app.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
  try {
    var json = JSON.parse(body)
    done(null, json)
  } catch (err) {
    err.statusCode = 400
    done(err, undefined)
  }
})

const USERS = [
  {
    id: 1,
    name: 'neha',
    email: 'neha@gmail.com',
    mobile: 2390798362
  },
  {
    id: 2,
    name: 'riya',
    email: 'riya@gmail.com',
    mobile: 2390798362
  },
  {
    id: 3,
    name: 'nima',
    email: 'nima@gmail.com',
    mobile: 2390798362
  },
  {
    id: 4,
    name: 'ravi',
    email: 'ravi@gmail.com',
    mobile: 2390798362
  }

];
app.get('/users', (req, res) => {
  return USERS;
})
app.post('/users', (req, res) => {
  const user = { 
    id: USERS[USERS.length - 1].id + 1,
    ...req.body,
  };
  USERS.push(user);

  return user;
})
app.get('/users/:id',(req,res)=>{
  const user= USERS.find((user)=>user.id==req.params.id)
  
  return user;
})
app.patch('/users/:id',(req,res)=>{
  const index = USERS.findIndex(user => user.id==req.params.id);
  USERS[index] = {
    ...USERS[index],
    ...req.body
  }
  
  return USERS[index]; 
})
//delete
app.delete( '/users/:id',(req,res)=>{
  const index = USERS.findIndex(user => user.id==req.params.id);
  USERS.splice(index,1);
  
  return true;
})
//search
app.get('/users/search/:q',(req,res)=>{
  return USERS.filter((user) =>
    user.name.includes(req.params.q)||
    user.email.includes(req.params.q)||
    user.mobile.toString().includes(req.params.q)//
  );
})

// Run the server!
app.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})