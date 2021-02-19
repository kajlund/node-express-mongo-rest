const path = require('path')

const dotenv = require('dotenv')

// Load environment variables BEFORE setting up Server
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const server = require('./server')

server.start().catch((err) => {
  server.error(err)
  throw err // Get out of Dodge
})
