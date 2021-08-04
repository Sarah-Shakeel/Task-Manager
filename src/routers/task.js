const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

//for task model

//rest api (providing path + instance creation + saving the model instance)
// this '/tasks' is the collection name in Robo 3T
//endpoints for resource creation

router.post('/tasks', async (req,res) => {
    const task = new Task(req.body);

// Saving / Adding user by async-await
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }

// old way of saving (adding) User by Promises
    // task.save().then(() => {
    //     res.status(201).send(task);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // })
})

// Endpoints for Reading Resources (tasks)
//find or fetch all tasks
router.get('/tasks', async (req,res) => {

    // Fetching all the tasks through async await
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }


//old method of fetching tasks by promises
    // Task.find({}).then((tasks) => {
    //     res.send(tasks);
    // }).catch((e) => {
    //     res.status(500).send();
    // })
})

//find or fetch a single task
router.get('/tasks/:id', async (req,res) => {
// finding or fetching a single task by async-await
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if(!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send()
    }

// old method of finding / fetching a single task through promises
    // Task.findById(_id).then((task) => {
    //     if(!task) {
    //         return res.status(404).send();
    //     }
    //     res.send(task);
    // }).catch((e) => {
    //     res.status(500).send();
    // })
})


// Endpoint for Updating Resource (task)
router.patch('/tasks/:id', async (req,res) => {

//if the below commented code is added in the code then app.patch does not work.

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })
    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!'});
    }
    try {

        const task = await Task.findById(req.params.id);
        updates.forEach((update) => {
            task[update] = req.body[update];
        })
        await task.save();

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true, // new is set true to create a new user with updated results
        //     runValidators: true // to save and check validations
        // });
        if(!task) {
            //task with given id is not available
            res.send('Task not found!');
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send();
    }
})

// Endpoint for Deleting resource (task)
router.delete('/tasks/:id', async (req,res) => {
    try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
        if(!task) {
        return res.status(404).send();
        }
     res.send(task);

    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;