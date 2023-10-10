const mongoose = require('mongoose')

const albumSchema = mongoose.Schema({

    title:{
        type:String,
        // required:true
    },
    artist:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Artist'
        }
    ,
    year:{
        type:String
    },
    img:{
        type:String
    },
    songs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Songs'
        }
    ]
},
{
    timestamps: true
})

module.exports = mongoose.model('Album',albumSchema,'album')