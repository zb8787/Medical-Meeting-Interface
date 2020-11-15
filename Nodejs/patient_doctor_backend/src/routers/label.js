const express = require('express')
const router = new express.Router()
const Label = require('../models/label')
const auth = require('../middleware/auth')

router.post('/labels', auth, async (req,res) =>{
    // const label = new Label(req.body)
    const label = new Label({
        ...req.body,
        owner: req.user._id
    })
    try {
        await label.save()
        res.status(201).send(label)
    } catch (e){
        res.status(400).send(e)
    }
})

router.get('/labels', auth, async (req,res) =>{
    try{
        const labels = await Label.find({owner: req.user._id})
        res.send(labels)
    } catch (e){
        res.status(500).send()
    }
})

router.get('/labels/:id', auth, async (req,res) =>{
    const _id = req.params.id
    try{
        // const label = await Label.find({_id})
        const label = await Label.findOne({_id, owner: req.user._id})
        if(!label){
            return res.status(404).send()
        }
        res.send(label)
    } catch (e){
        res.status(500).send()
    }
})

router.patch('/labels/:id', auth, async (req, res)=>{
    // return the key to the object 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed','description']
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if (!isValidOperation){
        return res.status(400).send({error: 'invalid updates!'})
    }
    try {
        // const label = await Label.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        const label = await Label.findOne({_id: req.params.id, owner: req.user._id})
        if (!label){
            return res.status(404).send()
        }
        updates.forEach((update) => label[update] = req.body[update])
        await label.save()
        res.send(label)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/labels/:id', auth, async (req, res) => {
    try {
        const label = await Label.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if (!label) {
            return res.status(404).send()
        }
        res.send(label)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router