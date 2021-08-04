const express = require('express');
const { update } = require('../models/user');
const router = new express.Router();
const User = require('../models/user')

// for user model 

//rest api (providing path + instance creation + saving the model instance)
//endpoints for resource creation

router.post('/users', async (req, res) => {
    const user = new User(req.body);
// Saving / Adding user by async-await
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

//endpoints for logging in a user
router.post('/users/login', async (req,res) => {
    try{
        const user = await findByCredentials(req.body.email, req.body.password);
        res.send(user);
    }
    catch(e) {
        res.status(400).send('There was a problem finding the user!');
    }
})

//endpoints for resource reading

//find or fetch all users
router.get('/users', async (req,res) => {
// find / fetch users by async await method
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send()
    }

// old way of finding users through Promises    
    // const users = User.find()
    // User.find().then((users) => {
    //     res.send(users);
    // }).catch((e) => {
    //     res.status(500).send();
    // })
})

//find a single user
router.get('/users/:id', async (req,res) => {
    // finding a single user by async await
    const _id = await req.params.id;

    try {
        const user = await User.findById(_id);

        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }

// Old way of finding a single user through promises
    // User.findById(_id).then((user) => {
    //     if(!user) {
    //         return res.status(404).send();
    //     }
    //     res.send(user);
    // }).catch((e) => {
    //     res.status(500).send();
    // })
})

// End points for resource updation (primarily using the async await method)

router.patch('/users/:id', async (req,res) => {
    
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'email', 'password'];
    const isValidOperation = updates.every((update)  => {
        return allowedUpdates.includes(update);
    })
    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!'});
    }
    try {

        const user = await User.findById(req.params.id);
        updates.forEach((update) => {
            user[update] = req.body[update];
        })
        await user.save()

        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Endpoints for deleting resource (user) (by async-await) 

router.delete('/users/:id', async (req,res) => {
    try {
    const user = await User.findByIdAndDelete(req.params.id);
    
        if(!user) {
        return res.status(404).send();
        }
     res.send(user);

    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;