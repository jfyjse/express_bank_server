const {json} = require('express');
const express = require('express');
const app = express();

const dataser= require('./service/data.service')

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(222).send("get methd updated")
})

app.post('/register',(req,res)=>
{
    console.log(req.body);
    const result= dataser.register(req.body.accno,req.body.password)
    console.log(res.send(result.message));
    
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



