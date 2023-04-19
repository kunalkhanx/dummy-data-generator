const seedrandom = require('seedrandom');
const generateRandom = (query) => {
    let result = 0
    if(query.seed){
        const rng = seedrandom(query.seed);
        result = rng()
    }else{
        result = Math.random()
    }
    let min = query.min ? parseInt(query.min) : 0
    if(query.max) {
        query.max = parseInt(query.max)
        // console.log(typeof query.max)
        // min = query.min ? query.min : 0
        result = Math.floor(result * (query.max - min + 1) + min)
    }else{
        result = Math.floor(result * (Number.MAX_SAFE_INTEGER - min + 1) + min);
    }
    return result
}

module.exports = generateRandom