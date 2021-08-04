const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

taskSchema.pre('save', async function(next) {
    const task = this;
    next();
})

//doing all those things for task model i.e creating model, then instance making and saving it 
const Tasks = mongoose.model('Tasks', taskSchema);
module.exports = Tasks;

//Creating task instance and saving the task model instance by giving data in code for checking it in console
// const task = new Tasks({
//     description: '        Adding a new column!      ',
//     completed: true
// })

// task.save().then(() => {
//     console.log(task);
// }).catch((error) => {
//     console.log('Path not defined!', error);
// })
