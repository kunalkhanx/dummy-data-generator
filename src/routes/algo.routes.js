const express = require('express')
const generateRandom = require('../services/generateRandom');
const router = express.Router()


router.get('/random', (req, res) => {
    try{
        const result = generateRandom(req.query)
        res.status(200).json({result})
    }catch(e){
        res.status(400).send({message: 'Invalid request.'})
    }
})


router.get('/random/list', (req, res) => {
    try{
        if(!req.query.size){
            req.query.size = parseInt(9)
        }else{
            req.query.size = parseInt(req.query.size)
        }
        const result = []
        for(let i = 0; i < req.query.size; i++){
            if(req.query.seed){
                req.query.seed = req.query.seed + i
            }
            result.push(generateRandom(req.query))
        }
        res.status(200).json({result})
    }catch(e){
        console.log(e)
        res.status(400).send({message: 'Invalid request.'})
    }
})

router.get('/random/matrix', (req, res) => {
    try{
        const size = [9,9]
        if(req.query.size){
            req.query.size = req.query.size.toLowerCase()
             size[0] = parseInt(req.query.size.split('x')[0])
             size[1] = parseInt(req.query.size.split('x')[1])
        }
        const result = [[]]
        for(let i = 0; i < size[0]; i++){
            if(req.query.seed){
                req.query.seed = req.query.seed + i
            }
            if(!result[i]){
                result[i] = []
            }
            for(let j = 0; j < size[1]; j++){
                if(req.query.seed){
                    req.query.seed = req.query.seed + j
                }
                result[i].push(generateRandom(req.query))
            }
            
        }
        res.status(200).json({result})
    }catch(e){
        console.log(e)
        res.status(400).send({message: 'Invalid request.'})
    }
})

module.exports = router