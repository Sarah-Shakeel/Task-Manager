const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 2,
        validate(value) {
            if(value < 0) {
                throw new Error('Enter a valid age!');
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Enter a valid email!');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"!');
            }
        }
    }
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne ({email: email});
    console.log(user);
    if(!user) {
        console.log('There is no user with this email id!')
        throw new Error('Unable to Login!');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        console.log('Apparently it is saying that there is no match!')
        throw new Error('Unable to Login');
    }
    return user;
}

// Hash the plain text password before saving it
userSchema.pre('save', async function(next) {
    const user = this;
    console.log('Just before saving!');
    
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

// Creating a model
const User = mongoose.model('User', userSchema)

module.exports = User;


// // Creating an instance of User model by giving data in code for checking it in console
// const me = new User({
//     name: '    Sarah    ',
//     email: 'SARAH.SHAKEEL97@GMAIL.COM   ',
//     password: '123happynow'
// })
// //saving the instance and apply promise handlers (both success and error results)
// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log(error);
// })