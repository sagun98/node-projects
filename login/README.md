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
multer  
bcryptjs



