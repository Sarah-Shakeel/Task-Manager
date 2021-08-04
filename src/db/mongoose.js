//requiring mongoose and establishing connection of node with database (in Robo3T)
const mongoose = require('mongoose');
//const validator = require('validator');

//In below code local host can be replaced by IP address '192.168.3.14'
mongoose.connect('mongodb://192.168.2.26:27017/test-db', { //task-manager-api is the db name made in robo 3T
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}); 


// mongodb://localhost:27017/task-manager-new       <-- (my db url path)