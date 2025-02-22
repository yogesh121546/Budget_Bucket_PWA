const express = require('express');
const app = express();
const PORT = 5050;
const { urlencoded } = require('express');
const cookieParser= require('cookie-parser')
require('dotenv').config();
const {connectDB}= require('./SQL/database')


const {signup} = require('./routes/signup');
const {login}= require('./routes/login');
const {logout}= require('./routes/logout'); 
const {authenticateToken}= require('./middleware/jwt');
const {budget}= require('./routes/budget_set');
const {transaction}= require('./routes/transaction');
const {session}= require('./routes/session');


app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());

//Router paths
app.use('/signup',signup);
app.use('/login',login);
app.use('/budget',budget);
app.use('/transaction',transaction)
app.use('/logout',logout);
app.use('/session',session)



app.get('/',authenticateToken,(req,res)=>{
    res.send(`welcome to the home page ${req.user}`);
})

start_server= ()=>{
    connectDB.connect((err)=>{
        if(err){
            console.log(err);
            throw err;
        }
        console.log("connected to the database..."); 
        app.listen(PORT,()=>{
            console.log("server is listening on 5050...");
            
        });  
    })
}
start_server();
