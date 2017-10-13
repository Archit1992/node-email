'use strict';

console.log('Loading function');

var fs = require('fs');
var mailer = require('nodemailer');

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    var data = "Archit_1, Archit_2, Archit_3, Archit_4";
    
    mailer.SMTP = {
        host: 'host_name', 
        port:587,
        use_authentication: true, 
        user: 'SMTP_user',
        pass: 'SMTP_pswd'
    };

// writing csv string data into csv file.
fs.writeFile('./archit.csv', data, function (err, result) {
        if (err) {
            console.log("Error is :", err);
        } else {
            console.log('Archit.csv written to disk successfully!');
            fs.readFile("./archit.csv", function (err, data) {
                mailer.send_mail({
                    sender: 'sender_email',
                    to: 'receiver_email',
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
