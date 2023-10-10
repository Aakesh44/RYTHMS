const mongoose = require('mongoose')

const songSchema = mongoose.Schema({

    title:String,
    decription:String,
    link:String,
    artist:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Artist'
        }
    ],
    duration:String,
    lyrics:String,
    img:{
        type:String,
        default:"https://img.freepik.com/free-vector/elegant-musical-notes-music-chord-background_1017-20759.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais"
    },
    release:String
})

module.exports = mongoose.model("Songs",songSchema,'songs')