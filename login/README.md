Install mongo db for database

### Useful commands:

#### use nodeauth                         (to create db)
#### db.createCollection('users');        (to create collections)
#### show collections

### Inserting
#### db.users.insert({name: 'Sagun',email:'sagun_90@hotmail.com',
	username:'sagun98',password:'123456'});

### Finding
#### db.users.find();
#### db.users.find().pretty();            (Shows pretty json obj)

### Updating
#### db.users.update({username:'sagun98'},{$set:{email:'sagun@yahoo.com'}});

### Deleting
#### db.users.remove({username:'mike'});


# Starting the NodeAuth project
Necessary modules:
sudo npm -g install express  
sudo npm -g install express-generator
Go to the project folder and run 'express'
Check and add all the dependencies

Then run **express** in the folder to install necessary folders. 

Dependencies needed to install:
##### In the package.json
body-parser  
cookie-parser  
debug  
express  
jade  
morgan  
serve-favicon  


##### Not in the package.json
mongodb  
mongoose (ORM)  
connect-flash  
express-messages  
express-validator  
express-session  
passport     (http://passportjs.org/docs/authenticate)   
passport-local  
passport-http  
multer   (helps in file upload)  
bcryptjs  

### Requiring necessary modules
```bash
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
var LocalStrategy = require ('passport-local').Strategy;
var multer = require('multer');
var upload = multer({dest:'./uploads'}); 

var flash = require('connect-flash');
var bcrypt = require('bcryptjs');

var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;
```  
  

### Middleware setup

##### MULTER:
```bash
var multer = require('multer');  
var upload = multer({dest:'./uploads'});  
```  

##### EXPRESS-SESSIONS:
```bash
app.use(session({  
	secret:'secret',  
	saveUninitialized: true,  
	resave: true  
}));
```

##### PASSPORT:
```bash  
app.use (passport.initialize());  
app.use(passport.session());  
```  

##### Validator:
```bash
//Express Validator (Download this middleware form github 'expressValidator middleware')
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
```
  
  
##### EXPRESS MESSAGES:  
```bash
//Express messages (Download this middleware from github 'Express messages')
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
```
  

## Views and Layouts  
Include bootstrap css and js  
Set the layout.jade page with header and block content  

#### Route for login and register  
=>users.js in routes  
```bash
router.get('/register', function(req, res, next) {  
  res.render('register',{title:'Register'});  
});  
  
router.get('/login', function(req, res, next) {  
  res.render('login',{title:'Login'});  
});  
```
#### Complete the views of login and register using jade which extends layout
  
  
### REGISTER FORM AND VALIDATION (routes/users.js)
Need a post request to register so:  
But need to require multer to handle uploads
```bash
	var multer = require('multer');  
	var upload = multer({dest:'./uploads'}); 
```

Then for setting the file and post variable to respective names  
```bash
//POST route for register
router.post('/register',upload.single('profileimage'), function(req, res, next) {  
	//Putting values to their own name  
	var name = req.body.name;  
	var email = req.body.email;  
	var username = req.body.username;  
	var password = req.body.password;  
	var password2 = req.body.password2;  

	if (req.file){  
		console.log ('Uploading file');  
		var profileimage = req.file.filename;  
	}  
	else {  
		console.log ('No file uploaded...');  
		var profileimage = 'noimage.jpg';  
	}  
```  

### VALIDATION:  
```bash
	//Form Validator  
	req.checkBody('name','Name field is required').notEmpty();  
	req.checkBody('email','Email field is required').notEmpty();  
	req.checkBody('email','Email is not valid').isEmail();  
	req.checkBody('username','Username field is required').notEmpty();  
	req.checkBody('password','Password field is required').notEmpty();  
	req.checkBody('password2','Passwords donot match').equals(req.body.password);  

	// Check Errors  
	var errors = req.validationErrors();  
	if (errors){  
		res.render('register',{  
			errors: errors  
		});  
	}  
	// Else create an object of new User(the User model will the exported below)
	else {  
		var newUser = new User({  
			name: name,  
			email:email,  
			username:username,  
			password:password,  
			profileimage:profileimage  
		});  
```  

If there is any error and we need to spit out the error in the views,
<under p tag of register.jade>  
```bash
ul.errors
	if errors
		each error, i in errors
			div.alert.alert-danger #{error.msg}
```  
  
If there are no errors then need to spit out the flash message  
```bash
	req.flash('success','You are now registered and now can Login');
	res.location('/');
	res.redirect('/');
```
  
  
  
## MODELS AND USER REGISTRATION:  
Create a folder models/users.js
```bash
var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/___dbname(nodeauth)___');
var db = mongoose.connection;
var UserSchema = mongoose.Schema({
	username:{
		type: String,
		index:true
	},
	password:{
		type: String
	},
	email:{
		type:String
	},
	name:{
		type:String
	},
	profileimage:{
		type:String
	} 
});

var User = module.exports = mongoose.model('User',UserSchema);  

module.exports.createUser = function(newUser,callback){
	newUser.save(callback);
}
```  
Then require this user model in routes(routes/users.js) as:  
```bash
	var User = require("../model/users");
```  
  
Below in the same file:
```bash
//Mainly focus on the else block because if block in done above
if (errors){
	res.render('register',{
	errors: errors
	});
}
else {
//Creates a new user to the DB
	var newUser = new User({
		name: name,
		email:email,
		username:username,
		password:password,
		profileimage:profileimage
	});

	User.createUser(newUser,function(err,user){
		if (err) throw err;
		console.log(user);
	});
```

After data goes to db, need to display a success flash message:  
```bash
req.flash('success','You are now registered and now can Login');
res.location('/');
res.redirect('/');
```  
After success flash message is created in the routes, we need to add 'success' class in the views too(layout.jade) !!
```bash
	// At the end of the layout.jade (Add !=messages())
	.container
		!=messages()
		block content

		script (src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js')
		script(src='javascript/bootstrap.js')
```
  
Maybe add some CSS to the stylesheet/style.css
```bash
ul.success li {
	padding:15px;
	margin-bottom:20px;
	border : 1px solid transparent;
	color: #3c763d;
	background-color:#d6e9c6;
	list-style: none;
}

ul.error li {
	padding : 15px;
	margin-bottom: 20px;
	border:1px solid transparent;
	border-radius: 4px;
	background-color: #f2dede; 
	border-color: #ebccd1;
	list-style: none;
}
```

So all in all, the whole code for POST route of register becomes: 
```bash
//POST route for register
router.post('/register',upload.single('profileimage'), function(req, res, next) { 
	//Putting values to their own name
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	if (req.file){
		console.log ('Uploading file');
		var profileimage = req.file.filename;
	}
	else {
		console.log ('No file uploaded...');
		var profileimage = 'noimage.jpg';
	}

	//Form Validator
	req.checkBody('name','Name field is required').notEmpty();
	req.checkBody('email','Email field is required').notEmpty();
	req.checkBody('email','Email is not valid').isEmail();
	req.checkBody('username','Username field is required').notEmpty();
	req.checkBody('password','Password field is required').notEmpty();
	req.checkBody('password2','Passwords donot match').equals(req.body.password);

	// Check Errors
	var errors = req.validationErrors();
	if (errors){
		res.render('register',{
			errors: errors
		});
	}
	else {
		var newUser = new User({
			name: name,
			email:email,
			username:username,
			password:password,
			profileimage:profileimage
		});

		User.createUser(newUser,function(err,user){
			if (err) throw err;
			console.log(user);
		});

		req.flash('success','You are now registered and now can Login');

		res.location('/');
		res.redirect('/');
	}
});
```
  
  
## PASSWORD HASHING WITH BCRYPT

In app.js 
```bash
var bcrypt = require(bcrypt)
```

Now in model/users.js
```bash
var bcrypt = require('bcryptjs');  

//Update createUser to the following with password hashing
module.exports.createUser = function(newUser,callback){
	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
       newUser.password = hash;
       newUser.save(callback);
    });
});
}
```  
  
  
  
## PASSPORT LOGIN AND AUTHENTICATION  
  
Configure the POST route for the login(routes/users.js)

```bash
router.post('/login',
  passport.authenticate('local',{failureRedirect:'/users/login',failureFlash:'Invalid username or password'}),
  function(req, res) {
    req.flash('success','You are now logged in!!');
    res.redirect('/');
  });
```
  
Since we are using local strategy, we need to authenticate the username and the password to the DB and also serialize,deserialize it, 

First, we gonna include:
```bash
var passport = require('passport');
var LocalStrategy = require ('passport-local').Strategy;
```

Then,
```bash
// Authentication to the username and the password
passport.use(new LocalStrategy(function(username,password,done){
// Will create getUserByUsername function in model
	User.getUserByUsername(username,function(err,user){
		if(err) throw err;
		if(!user){
			return done(null,false,{message:'Unknown User'});
		}
// Will create comparePassword function in model
		User.comparePassword(password,user.password,function(err,isMatch){
			if (err) return done(err);
			if (isMatch){
				return done (null,user);
			}
			else {
				return done (null,false,{message:'Invalid Password'});
			}
		});
	})
}));
``` 

Serialize and deserialize the authentication
```bash
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
// Will create the getUserByID function in the model
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});
```

Now for the functions like getUserByID,getUserByUsername,comparePassword in model/users.js
```bash
module.exports.getUserById = function(id,callback){
	User.findById(id,callback);
}

module.exports.getUserByUsername = function(username,callback){
	var query = {username: username};
	User.findOne(query,callback);
}

module.exports.comparePassword = function(candidatePassword,hash,callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
		callback(null,isMatch);
	});
}
``` 
  
  
  
## LOGOUT AND ACCESS CONTROL
In (routes/users/js)  
GET Routes for logout:
```bash
router.get ('/logout',function(req,res){
	req.logout();
	req.flash('success','You are now logged out');
	res.redirect('/users/login');
});
```
In the routes/index.js, add the ensureAuthenticated function:
```bash
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Members' });
});


function ensureAuthenticated(req,res,next){
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/users/login');
}
```

When you are logged in, you do not want to show register and when you are logged out, you donot want to show memebers and logout,  
So for that, you need to have a global variable to check if logged in or logged out
  
In app.js, creating a global variable. 
```bash
app.get('*',function(req,res,next){
  res.locals.user=req.user || null;
  next();
});
```
  
Then in layout.jade, check if user or not:  
```bash
ul.nav.navbar-nav
	if user
		li(class=(title=='Members'?'active':''))
			a(href='/') Members
	if !user
		li(class=(title=='Register'?'active':''))
			a(href='/users/register') Register
		li(class=(title=='Login'?'active':''))
			a(href='/users/login') Login
ul.nav.navbar-nav.navbar-right
	if user
		li
			a(href='/users/logout') Logout

