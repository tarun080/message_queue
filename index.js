const express = require('express')
const db = require('./db/db')
const routes = require('./routes/routes')
const {startConsumer} = require('./controllers/consumer')

const app = express()

app.use(express.json())
app.use('/api/v1' , routes)

const port = 3002

app.get('/app', (req, res) => {
  return res.status(200).send({ "message": "App Response from server1!" })
})

startConsumer()

app.listen(port, () => {
  console.table([
    {
      port : `${port}`
    }
  ])
})

