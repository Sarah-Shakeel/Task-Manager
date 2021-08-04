require('../src/db/mongoose');
const User = require("../src/models/user");
const Task = require('../src/models/task');
const { Promise } = require('mongoose');
const { findByIdAndUpdate, countDocuments, findByIdAndDelete } = require('../src/models/user');

// Updating a user of a specific id
// User.findByIdAndUpdate('60fff2316143c825bced842b', { age: 13 }).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 13 });
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// })
// console.log('');
// console.log('The User has been updated!');


// Updating a user of specific ID (finding the user by id and update it) through async-await.
const UpdateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age: 7 });
    return {user, count};
}

UpdateAgeAndCount('60fff7f704008d1954bd9a5a', 5).then((c) => {
    console.log(c);
}).catch((e) => {
    console.log(e);
})

//course instructor has used findByIdAndDelete, but by findByIdAndRemove it's also doing exactly same thing, though
// it is recommended to use the findByIdAndDelete method.

// Deleting a task of specific ID (finding the task by id and delete it)
// const _id = '60fff3a76143c825bced8437';
// Task.findByIdAndDelete(_id).then((_id) => {
//     console.log('Task of given id '+ _id + ' is deleted');
//     return Task.countDocuments({ completed: true });
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// })

// Deleting a task of specific ID (finding the task by id and delete it) through async-await.
const DeleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const counter = await Task.countDocuments({ __v: 0 });
    return {task, counter};
}

const id = '60fff3566143c825bced8435';
DeleteTaskAndCount(id).then((result) => {
    console.log('Task of the id ' + id + ' is deleted!', result);
}).catch((e) => {
    console.log(e);
})


// trying the async await thingi in this file...
const add = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a<0 || b<0) {
                return reject('Numbers should be non-negative!')
            }
            resolve(a + b);
        },2000)
    })
}

const doWork = async () => {
    const sum =  await add(1,99);
    const sum2 = await add(sum, 20);
    const sum3 = await add(sum2, 2); // Applying negative number in the parameters of any of the sum will give an 
//                                  //  error (catch) bcoz we have called reject for -ive numbers in add function.
    return sum3;
}

doWork().then((result) => {
    console.log('Result: ', result);
}).catch((e) => {
    console.log(e)
})