const nodemailer=require("nodemailer");
const asynchandler=require('express-async-handler');
class EmailController{

    static  sendEmail=asynchandler(async(req,res)=>{
const{email,subject,text,html}=req.body;
if(!email){
    throw new Error('user email is required');
}
if(!subject){
    throw new Error('subject email is required');
}
       let transporter=nodemailer.createTransport({
        service: "gmail",
        host:'smtp.gmail.com',
        port: 587, //true for 465 ,false for otther ports
        secure :false,
        auth:{
            user:process.env.MAIL_ID,
            pass:process.env.MP
        }
       
       });

       try {
        // Send email
        let info = await transporter.sendMail({
          from: {
            name: 'Pi Clone',
            address: process.env.MAIL_ID,
          },
          to: email,
          subject: subject,
          text: text || undefined,
          html: html || undefined,
        });
  
        // Log the message ID and return success response
        console.log('Email sent: %s', info.messageId);
        return res.json({
          message: 'Email sent successfully',
          info: info.messageId,
        });
      } catch (error) {
        // Handle errors
        // throw new Error(`${error.message}`)
        console.error('Error sending email: ', error);
        return res.status(500).json({
          message: 'Failed to send email',
          error: error.message,
        });
    
      }
    });
}

module.exports=EmailController;