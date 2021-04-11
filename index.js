const {json} = require('express');
const express = require('express');
const app = express();
const session = require('express-session')
const dataser= require('./service/data.service')

app.use(express.json());

const logMiddleware = (req,res, next)=>
{
    console.log(req.body);
    next();
}

app.use(logMiddleware);

const authMiddleware =(req,res,next)=>
{
    if (!req.session.currentUser) {
        return res.json ({
          status: false,
          statusCode: 441,
          message: "pls login"
        })
    
      }
      else{
          next();
      }
}


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
   
    dataser.register(req.body.accno,req.body.pwd)
    .then(result=>{res.status(result.statusCode).json(result)
    })
    
    
})
app.post('/login',(req,res)=>
{    
    dataser.login(req,req.body.accno,req.body.pwd)
    .then(result=>{
    res.status(result.statusCode).json(result)   
    })
    
    
})

app.post('/deposit',authMiddleware,(req,res)=>
{
   dataser.deposit(req.body.accno,req.body.pwd,req.body.amt).then(ress =>{
       res.status(ress.statusCode).json(ress)
   })
    
    
})

app.post('/withdraw',authMiddleware,(req,res)=>
{
    dataser.withdraw(req.body.accno,req.body.pwd,req.body.amt).then(ress =>{
        res.status(ress.statusCode).json(ress)
    })
    
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



