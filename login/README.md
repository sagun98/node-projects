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

