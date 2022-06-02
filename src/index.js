 const express = require("express");

 const app=express();
 const connectdb=require('./config/db')


 app.use(express.json());


const urlController=require('./controller/Url.controller');

app.use('/api',urlController);


  



 const port=process.env.PORT ||5000;

 app.listen(port,async()=>{
     await connectdb();

   console.log('Server is connected');

 });
 