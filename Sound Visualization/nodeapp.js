const express = require("express")
const app = express()
const server = require('http').Server(app)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

server.listen(3000)
