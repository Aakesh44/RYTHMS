const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const approute = require('./routes/approute')

app.use(cors(
    {
        origin:["https://rythms-music-player.vercel.app"],
        methods:['GET','POST', 'PUT', 'DELETE'],
        credentials: true
    }
))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

async function main() {
    
    try {
        await mongoose.connect('mongodb+srv://aakeshviswanathan:J9qvVRtfSCZBEKV8@cluster0.x7watxt.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true})
        console.log('connected to db');

    } catch (err) {
        console.error(err)
    }
}
main() 

app.get('/',(req,res)=>res.json('server is running'))
app.use('/',approute)


const PORT = process.env.PORT || 3500
app.listen(PORT,()=>{console.log(`your app is running on ${PORT}`);})
