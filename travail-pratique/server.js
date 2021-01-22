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

// Read all category from playlist
app.get('/playlist', (request, response) => {
    client.query('SELECT * FROM playlist', (error, result) => {
        if (error) {
            throw error
        }
        responseRequest(result.rows, response)
    })
})

// Get tracks from a selected playlist
app.get('/playlist/:id', (request, response) => {
    const idPlaylist = parseInt(request.params.id)

    // console.log('SERVER ID:' + idPlaylist)
    client.query('SELECT * FROM track WHERE playlist_id = $1', [idPlaylist], (error, result) => {
        if (error) {
            throw error
        }
        responseRequest(result.rows, response)
    })
})

// add a track
app.post('/playlist', (request, response) => {
    const idPlaylist = request.body.idPlaylist
    const title = request.body.title
    const uri = request.body.uri
    const masterId = request.body.masterId

    client.query('INSERT INTO track (playlist_id, title, uri, master_id) VALUES ($1, $2, $3, $4)', [idPlaylist, title, uri, masterId], (error, result) => {
        if (error) {
            throw error
        }
    })
    // responseRequest(request.body, response)
})
// delete a track when user click on a checked track
app.delete('/playlist', (request, response) => {
    const idPlaylist = parseInt(request.body.idPlaylist)
    const uri = request.body.uri
    console.log('ID :' + idPlaylist)
    console.log('URI :' + uri)

    client.query('DELETE FROM track WHERE playlist_id = $1 and uri=$2', [idPlaylist, uri], (error, result) => {
        if (error) {
            throw error
        }console.log(result)
        responseRequest(result.rowCount, response)
    })
})
app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT)
})
