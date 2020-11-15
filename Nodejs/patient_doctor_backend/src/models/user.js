const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Label = require('./label')

const userSchema = new mongoose.Schema({
    // name and age set as objects 
    name: {
        type: String,
        // force this value to be inputted 
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(validator.isEmail(value) !== true){
                throw new Error('Invalid email')
            }
        }
    },
    category: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0){
                throw new Error('Category must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            while (value.toLowerCase().includes('password')){
                throw new Error('Try new password (cannot contain password)')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// virtual property (figure out two things' relationship)
userSchema.virtual('label', {
    ref: 'Label',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function(){
    const user = this 
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token: token})
    await user.save()
    return token
}

userSchema.methods.toJSON = function () {
    const user = this 
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email})

    if (!user) {
        throw new error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch){
        throw new error('Unable to login')
    }

    return user
}


// encrypt the password 
userSchema.pre('save', async function (next){
    const user = this 
    // console.log('next user ')
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// delete user task when user is removed
userSchema.pre('remove', async function(next) {
    const user = this 
    await Label.deleteMany({owner: user._id})
    next()
})


// model defined: name, definition 
const User = mongoose.model('User', userSchema)


module.exports = User



