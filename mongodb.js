const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://localhost:27017';
const dbName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!');
    }
    console.log('Connected Successfully');
    const db = client.db(dbName);

    db.collection('users').insertOne({
        name: 'Sarah',
        age: 23
    })
})



//                           fullfilled
//                          /
// promise   -- pending -->
//                          \ 
//                           rejected