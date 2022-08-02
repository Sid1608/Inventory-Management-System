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

const sendMail=(payload,cb)=>{
    smtpTransport.sendMail(payload, (error, response) => {
        if(error){
            cb(error,null);
            console.log(error)
        }else{
            
            console.log(response);
            smtpTransport.close();
            cb(null,response);
        }
         
        
    });
    
}


module.exports=sendMail;