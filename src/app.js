const express = require('express')
const cors = require('cors')
const dummyDataRoutes = require('./routes/dummy-data.routes')
const algoRoutes = require('./routes/algo.routes')
const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use('/api/dummy', dummyDataRoutes)
app.use('/api/algo', algoRoutes)

app.listen(PORT)