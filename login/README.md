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

#### Middleware setup

##### MULTER:
var multer = require('multer');  
var upload = multer({dest:'./uploads'});  
  
##### EXPRESS-SESSIONS:
app.use(session({  
	secret:'secret',  
	saveUninitialized: true,  
	resave: true  
}));

##### PASSPORT:  
app.use (passport.initialize());  
app.use(passport.session());  

##### Validator:
Search github for middleware of express-validator and copy paste  
  
##### EXPRESS MESSAGES:  
Search github for middleware of express-messages and copy paste
  

### Views and Layouts  
Include bootstrap css and js  
Set the layout.jade page with header and block content  

#### Route for login and register  
=>users.js in routes  

router.get('/register', function(req, res, next) {  
  res.render('register',{title:'Register'});  
});  
  
router.get('/login', function(req, res, next) {  
  res.render('login',{title:'Login'});  
});  

#### Complete the views of login and register using jade which extends layout
