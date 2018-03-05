//'use strict';
const nodemailer = require('nodemailer');
const serverConfig = require('./serverConfig.json');
const async = require('async');

var fs = require("fs");
var request = require('request');
var jwtToken = '';


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	host: 'mail.fhr.org.za',
	port: 25,
	secure: false,
	requireTLS: true,
	tls: {
		rejectUnauthorized: false
	},
	auth: {
		user: 'fweber',
		pass: 'Soulreaver1'
	},
	authMethod: 'PLAIN'    
});

// setup email data with unicode symbols
let mailOptions = {
	from: 'fweber@fhr.org.za', // sender address
	to: 'coach1001@gmail.com', // list of receivers
	replyTo: 'gpr.fhr@gmail.com',
	subject: 'Test from FHR', // Subject line
	text: 'Test from FHR?', // plain text body
	html: '<b>Test from FHR ?</b>' // html body
};

// send mail with defined transport object
/*transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		return console.log(error);
	}
	console.log('Message %s sent: %s', info.messageId, info.response);
});*/

var options = {
	url: serverConfig.gpr_email_url,    
	method: 'GET',
	headers: {
		'Authorization' : '',
		'Range' : '0-10'		
	}
};

var reportFileOptions = {
	url: '',
	method: 'GET',
	jar: true,
	auth: {
		user: 'reportConsumer',
		pass: 'password'
	},
	/*headers:
	{
		'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6'
	},*/
};

let emailGprLogin = function(loginURL, loginCredentials, callback){
	request.post({
		url: loginURL,            
		json: loginCredentials
	},function succ(err,res,body){
		callback(body);
	});
};

let emailsSetProccessing = function(email, callback){
	let mailOptions_ = Object.assign({},options);
  mailOptions_.url = serverConfig.gpr_email_update_url + email.id;
  mailOptions_.method = 'PATCH';
  delete mailOptions_.headers.Range;
  mailOptions_.json = {status_message : 'PROCESSING'};
  mailOptions_.headers['Content-Type'] = 'application/json';
  console.log(mailOptions_);

  request(mailOptions_, function(err, res, body){  	
  	callback(err, body)
  })

};

let emailsSetAwaiting = function(email, callback){
	let mailOptions_ = Object.assign({},options);
  mailOptions_.url = serverConfig.gpr_email_update_url + email.id;
  mailOptions_.method = 'PATCH';
  delete mailOptions_.headers.Range;
  mailOptions_.json = {status_message : 'AWAITING'};
  mailOptions_.headers['Content-Type'] = 'application/json';
  console.log(mailOptions_);

  request(mailOptions_, function(err, res, body){  	
  	callback(err, body)
  })
}

let emailSendAsync = function(email,callback){
	emails.map(function(email,index){            				
		reportFileOptions.url = email.attachment_url;            			
		let fileName = 'temp_'+Date.now()+'.pdf';
		let fileStream = fs.createWriteStream(fileName);			
		fileStream.on('close',function(){				
			let mailOptions_ = Object.assign({},mailOptions);                				
			mailOptions_.attachments = [];
			mailOptions_.attachments.push({
				filename: email.attachment_filename,
				path: fileName,
				contentDisposition: 'inline; filename='+email.attachment_filename,
				contentType: email.attachment_filetype
			})
			                				
			transporter.sendMail(mailOptions_, (error, info) => {
				if (error) {
					return console.log(error);
				}
				console.log('Message %s sent: %s', info.messageId, info.response);
				fs.unlink(fileName);
			});								
		});			
		request(reportFileOptions).pipe(fileStream);								
	});
}

emailGprLogin(serverConfig.gpr_login_url, serverConfig.gpr_emailer_credentials, function(token){    
	options.headers['Authorization'] = 'Bearer '+ token.token; 

	request(options,function(err,res,body){
		let emails = JSON.parse(body);
		
		async.map(emails,emailsSetProccessing, function(err,res){
		//SYNC1
						
		//SYNC1
		});					
	});
}); 