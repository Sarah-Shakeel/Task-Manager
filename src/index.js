const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = 2000;
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
})

//require bcrypt library to encrypt our password from string to some random generated hash string
const bcrypt = require('bcryptjs');

// how to encrypt a password in a hashed password
const decryptFunction = async () => {
    const password = 'qwerty123@';
    const hashPassword = await bcrypt.hash(password,8);

    const isMatch = await bcrypt.compare(password, hashPassword);
    console.log(isMatch);
}

decryptFunction();