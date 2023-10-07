const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const approute = require('./routes/approute')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

async function main() {
    
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/music')
        console.log('connected to db');

    } catch (err) {
        console.error(err)
    }
}
main() 

app.use('/',approute)

// const Songs = require('./model/songs')

// async function songCreate(req,res) {
    
//     try {

//         const song = req.body

//         Songs.create(song)

//         res.json(song)

//     } catch (err) {
//             res.status(500).json(`Error: ${err.message}`)
//     }
// }

// const Album = require('./model/album')

// async function mail(req,res) {
    
//     try {
        
//         const album = req.body 
//         Album.create(album)
//         res.json(album)
//     } catch (error) {
        
//     }
// }

// app.post('/',mail)
// app.post('/',songCreate)



const PORT = process.env.PORT || 3500
app.listen(PORT,()=>{console.log(`your app is running on ${PORT}`);})
