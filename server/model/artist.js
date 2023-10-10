const mongoose = require('mongoose')

const artistSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    followersCount:{
        type:Number,
        default:200
    },
    listener:{
        type:Number,
        default:100
    },
    img:String,

})

module.exports = mongoose.model('Artist',artistSchema,'artist')

