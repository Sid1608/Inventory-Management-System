const dotenv=require('dotenv')

// *Useful for getting environment vairables
dotenv.config();
const { default: strictTransportSecurity } = require('helmet/dist/middlewares/strict-transport-security');

const nodemailer=require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENTID, // ClientID
    process.env.OAUTH_CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);
console.log(process.env.OAUTH_REFRESH_TOKEN)
oauth2Client.setCredentials({
    refresh_token:process.env.OAUTH_REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: process.env.MAIL_USERNAME, 
         clientId:process.env.OAUTH_CLIENTID,
         clientSecret: process.env.OAUTH_CLIENT_SECRET,
         refreshToken: process.env.OAUTH_REFRESH_TOKEN,
         accessToken: accessToken
    }
});
tls: {
    rejectUnauthorized: false
  }

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: "siddharth.akar@qoala.id",
    subject: "Node.js Email with Secure OAuth",
    generateTextFromHTML: true,
    html: "<b>test</b>"
};
// smtpTransport.sendMail(mailOptions, (error, response) => {
//     error ? console.log(error) : console.log(response);
//     smtpTransport.close();
// });

// const mailGun=require('nodemailer-mailgun-transport');


// const auth={
//     auth:{
//         api_key:'',
//         domain:''
//     }
// }

// const tranporter=nodemailer.createTransport(mailGun(auth));
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       type: 'OAuth2',
//       user: process.env.MAIL_USERNAME,
//       pass: process.env.MAIL_PASSWORD,
//       clientId: process.env.OAUTH_CLIENTID,
//       clientSecret: process.env.OAUTH_CLIENT_SECRET,
//       refreshToken: process.env.OAUTH_REFRESH_TOKEN
//     }
//   });

const sendMail=(payload,cb)=>{
    smtpTransport.sendMail(payload, (error, response) => {
        error ? console.log(error) : console.log(response);
        smtpTransport.close();
    });
    // const mailOptions={
    //     from:'akarsiddharth@gmail.com',
    //     to:'akarsiddharth@gmail.com',
    //     subject:'hello',
    //     text:'hello'
    // }
    // console.log("INSIDE send Mail",process.env.OAUTH_CLIENTID)
    //  transporter.sendMail(mailOptions,function(err,data) {
    //     if(err){
    //         cb(err,null);
    //     }else{
    //         cb(null,data);
    //     }
    // })
}


module.exports=sendMail;