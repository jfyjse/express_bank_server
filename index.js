
const express = require('express');
const app = express();
app.get('/',(req,res)=>{
    res.send("get")
})

app.put('/',(req,res)=>{
    res.send("put")
})


app.post('/',(req,res)=>
{
   res.send("post") 
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



