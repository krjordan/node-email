var express 	 		= require('express');
var app				 		= express();
var nodemailer 		= require('nodemailer');
var path			 		= require('path');
var EmailTemplate = require('email-templates').EmailTemplate;

var templatesDir = path.resolve(__dirname, 'app/templates');

app.use(express.static('app'));

// nodemailer
var smtpTransport = nodemailer.createTransport('SMTP', {
	service: "FILL_IN",
	auth: {
		user: 'FILL_IN',
		pass: 'FILL_IN'
	}
});

app.get('/sendContact', function (req, res) {
	var template = new EmailTemplate(path.join(templatesDir, 'contact-request'));
	var locals = {
		email: req.query.email,
		name: req.query.name,
		message: req.query.message
	};

	template.render(locals, function (err, results) {
		if (err) {
			return console.error(err);
		}

		smtpTransport.sendMail({
			from: locals.email,
			to: 'FILL_IN',
			subject: 'Contact Request',
			html: results.html,
			text: results.text
		}, function (err, responseStatus) {
			if (err) {
				console.error(err);
				res.end('error');
			} else {
				console.log(responseStatus.message);
				res.end('sent');
			}
		});
	});
});

var server = app.listen(8080, function () {
	var host = 'localhost';
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});