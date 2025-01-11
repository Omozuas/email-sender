const express = require('express');
const bodyPerser=require('body-parser');
const dotenv = require('dotenv').config();
const cors =require('cors');
const morgan = require('morgan');
const emailRoute= require('./route/emailRoute');

const app=express();


//router
app.use(cors());
app.use(morgan('dev'));
app.use(bodyPerser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',emailRoute);

//start server
app.listen(process.env.PORT ,()=>{
    console.log('server is running on 4000')
})