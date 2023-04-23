const express = require('express')
const cors = require('cors')

require('./services/mongoose')

const dummyDataRoutes = require('./routes/dummy-data.routes')
const algoRoutes = require('./routes/algo.routes')
const hashtagRoutes = require('./routes/hashtag.routes')
const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use('/api/dummy', dummyDataRoutes)
app.use('/api/algo', algoRoutes)
app.use('/api/hashtag', hashtagRoutes)

app.listen(PORT)