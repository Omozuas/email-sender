const express = require('express');
const Route=express.Router();
const email=require('../controller/emailController')
const errorHandler=require('../middlewares/errorhandler');

Route.post('/send-email-to',email.sendEmail);



Route.use(errorHandler.notfound);
Route.use(errorHandler.errorHandler);

module.exports=Route;