const mongoose = require('mongoose')

const PlaylistSchema = mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    artist:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Artist",
            ref:"User",
            required:true
        }
    ,
    likes:{
        type:Number,
        default:0
    },
    img:{
        type:String,
        default:"https://img.freepik.com/free-vector/headphone-concept-illustration_114360-2222.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=sph"
    },
    songs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Songs'
        }
    ],
    createAt:{
        type:Date,
        default: Date.now(),
        immutable:true
    }
})

module.exports = mongoose.model('Playlist',PlaylistSchema,'playlist')