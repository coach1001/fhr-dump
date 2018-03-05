'use strict';
const nodemailer = require('nodemailer');
const serverConfig = require('./serverConfig.json');
var request = require('request');
var jwtToken = '';


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'mail.fhr.org.za',    
    auth: {
        user: 'fweber@fhr.org.za',
        pass: 'Soulreaver1'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Francois Weber" <fweber@fhr.org.za>', // sender address
    to: 'coach1001@gmail.com', // list of receivers
    replyTo: 'fweber@fhr.org.za',
    subject: 'Test from FHR', // Subject line
    text: 'Test from FHR?', // plain text body
    html: '<b>Test from FHR ?</b>' // html body
};

// send mail with defined transport object
//transporter.sendMail(mailOptions, (error, info) => {
//    if (error) {
//        return console.log(error);
//    }
//    console.log('Message %s sent: %s', info.messageId, info.response);
//});

var options = {
    url: serverConfig.gpr_email_url,    
    method: 'GET',
    headers: {
        'Authorization': ''
    }
};

let emailGprLogin = function(loginURL, loginCredentials, callback){
    request.post({
        url: loginURL,            
        json: loginCredentials
    },function succ(err,res,body){
        callback(body);
    });
};

emailGprLogin(serverConfig.gpr_login_url, serverConfig.gpr_emailer_credentials, function(token){
    console.log(token);
    options.headers['Authorization'] = 'Bearer '+ token.token; 
    console.log(options.headers);

    request(options,function(err,res,body){
        let emails = JSON.parse(body);
        emails.map(function(email,index){
            console.log(email);
        });
    });

});