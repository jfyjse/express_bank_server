const {json} = require('express');
const express = require('express');
const app = express();
const session = require('express-session')
const dataser= require('./service/data.service')

app.use(express.json());
app.use(session(
{
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
})
)
app.get('/',(req,res)=>{
    res.status(222).send("get methd updated")
})

app.post('/register',(req,res)=>
{
    console.log(req.body);
    const result= dataser.register(req.body.accno,req.body.pwd)
    // console.log(res.send(result.message));
    res.status(result.statusCode)
    console.log(res.json(result));
    
})
app.post('/login',(req,res)=>
{
    console.log(req.body);
    console.log(req.session.currentUser);
    const result= dataser.login(req,req.body.accno,req.body.pwd)
    // console.log(res.send(result.message));
    res.status(result.statusCode)
    console.log(res.json(result));
    
})

app.post('/deposit',(req,res)=>
{
    console.log(req.body);
    const result= dataser.deposit(req,req.body.accno,req.body.pwd,req.body.amt)
    // console.log(res.send(result.message));
    res.status(result.statusCode)
    console.log(res.json(result));
    
})

app.post('/withdraw',(req,res)=>
{
    console.log(req.body);
    const result= dataser.withdraw(req.body.accno,req.body.pwd,req.body.amt)
    // console.log(res.send(result.message));
    res.status(result.statusCode)
    console.log(res.json(result));
    
})

app.put('/',(req,res)=>{
    res.send("put")
})



app.patch('/',(req,res)=>
{
   res.send("patch") 
})

app.delete('/',(req,res)=>
{
   res.send("delete") 
})


app.listen(3000,()=>{
    console.log("started listening");
    
})



