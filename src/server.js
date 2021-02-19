const cors = require('cors')
const express = require('express')

const conf = require('./config')

const log = require('pino')(conf.log)
exports.log = log
const pino = require('pino-http')({ logger: log })

const app = express()
exports.app = app

app.disable('x-powered-by')

app.use(pino)
app.use(cors())
app.use(express.json({ limit: '100kb' })) // Limit input data size
app.use(express.urlencoded({ extended: true }))

exports.start = async () => {
  try {
    // await connect()
    app.listen(conf.port, () => {
      log.info(`REST API on http://localhost:${conf.port}/api`)
    })
  } catch (e) {
    log.error(e)
  }
}

// Routes
app.get('/ping', (_, res) => {
  res.status(200).send('pong')
})
