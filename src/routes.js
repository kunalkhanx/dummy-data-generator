const express = require('express')
const first_names = require('./data/first_names.json')
const last_names = require('./data/last_names.json')
const usersData = require('./data/users.json')
const addressesData = require('./data/addresses.json')
const createUsers = require('./services/createUsers')
const createAddresses = require('./services/createAddresses')
const router = express.Router()


router.get('/users', (req, res) => {
    try{
        const length = req.query.length ? (req.query.length > 100 ? 100 : req.query.length) : 25
        const users = usersData.slice(0, length)
        // console.log(users.length)
        res.status(200).json(users)
    }catch(e){
        res.status(400).send({message: 'Invalid request.'})
    }
})

router.get('/users/random', (req, res) => {
    try{
        const length = req.query.length ? (req.query.length > 100 ? 100 : req.query.length) : 25
        const users = createUsers(first_names, last_names, length)
        // console.log(users.length)
        res.status(200).json(users)
    }catch(e){
        res.status(400).send({message: 'Invalid request.'})
    }
})

router.get('/addresses', (req, res) => {
    try{
        const length = req.query.length ? (req.query.length > 100 ? 100 : req.query.length) : 25
        const addresses = addressesData.slice(0, length)
        // console.log(addresses.length)
        res.status(200).json(addresses)
    }catch(e){
        res.status(400).send({message: 'Invalid request.'})
    }
})


router.get('/addresses/random', (req, res) => {
    try{
        const length = req.query.length ? (req.query.length > 100 ? 100 : req.query.length) : 25
        const addresses = createAddresses(length)
        // console.log(addresses.length)
        res.status(200).json(addresses)
    }catch(e){
        res.status(400).send({message: 'Invalid request.'})
    }
})


module.exports = router