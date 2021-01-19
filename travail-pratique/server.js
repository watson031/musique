'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const { Client } = require('pg')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('dist'))

// CORS for development
// https://enable-cors.org/server_expressjs.html
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    response.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS')
    response.header('Access-Control-Allow-Credentials', 'false')
    next()
})

const PORT = 8080
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'tp_music',
    user: 'postgres',
    password: 'postgres'
})

// connection bd

client.connect((error) => {
    if (error) {
        console.error('connection error', error.stack)
    } else {
        console.log('connected')
    }
})

function responseRequest (datas, response) {
    const stringDatas = JSON.stringify(datas, null, 2)

    response.writeHead(HTTP_OK, { 'content-Type': CONTENT_TYPE_JSON })
    response.end(stringDatas)
}

app.get('/playlist', (request, response) => {
    client.query('SELECT * FROM playlist', (error, result) => {
        if (error) {
            throw error
        }
        responseRequest(result.rows, response)
    })
})

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT)
})
