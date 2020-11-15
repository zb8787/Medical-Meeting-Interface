const express = require('express')
const multer = require('multer')
const { update } = require('../models/user')
const router = new express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')



// creating and sending new User Data to the database
router.post('/users', async (req,res) =>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (e){
        res.status(400).send(e)
    }  
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch (e) {
        res.status(400).send()
    }
})

// getting all user data
router.get("/users/me", auth, async (req,res) => {
    res.send(req.user)
})


// this is not working properly
// 401 unauthorized error
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// log out all session 
// not functioning 
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/me', auth, async (req, res)=>{
    // return the key to the object 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if (!isValidOperation){
        return res.status(400).send({error: 'invalid updates!'})
    }
    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)

        // if (!user) {
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

// upload audio files
const upload = multer({
    dest: 'audio',
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(m4a|mp3|wav)$/)){
            return cb(new Error('File must be an audio file'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/audio',upload.single('audio'), (req,res) =>{
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

module.exports = router