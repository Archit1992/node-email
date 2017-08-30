'use strict';

console.log('Loading function');

var fs = require('fs');
var mailer = require('nodemailer');

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    var data = "Mohit, Archit, Manan, Parth";   
    
    mailer.SMTP = {
        host: 'email-smtp.us-east-1.amazonaws.com', 
        port:587,
        use_authentication: true, 
        user: 'AKIAJNXDTUJG2YOEABYQ', 
        pass: 'Ak9kuwUbeN5kDJeJJN85PKrvom0kqp/DZtfnCu5/C10M'
    };


fs.writeFile('./archit.csv', data, function (err, result) {
        if (err) {
            console.log("Error is :", err);
        } else {
            console.log('Archit.csv written to disk successfully!');
            fs.readFile("./archit.csv", function (err, data) {
                mailer.send_mail({
                    sender: 'architgajjar1992@gmail.com',
                    to: 'gajjararchit00004@gmail.com',
                    subject: 'Attachment!',
                    body: 'mail content...',
                    attachments: [{'filename': 'archit.csv', 'content': data}]
                })}, function(err, success) {
                    if (err) {
                        console.log("Error is : ",err);
                    }else{
                        console.log("Success!");
                        callback(null, "Success!");
                    }
                })
            }
        })
}