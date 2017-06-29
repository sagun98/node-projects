var express = require('express');
var path = require ('path');
var bodyParser = require ('body-parser');
var nodemailer = require ('nodemailer');


var app = express();

//Setting up jade
app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

app.use (bodyParser.json());
app.use (bodyParser.urlencoded({extended: false}));
app.use (express.static(path.join(__dirname,'public')));

//Route for index page
app.get('/',function(req,res){
    res.render('index',{title:'Welcome'});
});

//Route for about page
app.get('/about',function(req,res){
    res.render('about');
});

//GET Route for contact page
app.get('/contact',function(req,res){
    res.render('contact');
});

//POST Route for contact page
app.post('/contact/send',function(req,res){
    console.log("test");
    var transporter = nodemailer.createTransport({
        service:'Gmail',
        auth: {
            user:'manhero96@gmail.com',
            pass: '######'
        }
    });

    var mailOptions = {
        from: 'Sagun Maharjan <manhero96@gmail.com>',
        to: 'manhero96@gmail.com',
        subject: 'Website Submission',
        text: 'You have a submisssion with following details...Name:'+req.body.name+'Email:'+req.body.email+'Message:'+req.body.message ,
        html: '<p>You have a submisssion with following details...</p>'
    };

    transporter.sendMail(mailOptions,function(error,info){
        console.log("test2");
        if(error){
            console.log(error);
            res.redirect('/');
        }
        else {
            console.log ('Message Sent'+info.response);
            res.redirect('/');
        }
    });
});


app.listen(3000);
console.log ('Server is running on prt 3000');
