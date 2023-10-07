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
    songs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Songs'
        }
    ]

})

module.exports = mongoose.model('Artist',artistSchema,'artist')

//

const artist={

    // gv:     "https://i.pinimg.com/236x/c3/f4/bd/c3f4bd7a247b7b74f54fd7a9594809df.jpg",
    // raja:   "https://i.pinimg.com/564x/99/bd/ff/99bdffa049468065875aabeaf6e93b2c.jpg",
    // yesudas:"https://i.pinimg.com/236x/36/c0/fb/36c0fb4b27588d5d954982fe4ba79dfc.jpg",
    // anirudh:"https://i.pinimg.com/236x/07/f7/a8/07f7a810d9fbac664ebb9dda1339c37e.jpg",
    // dhanus: "https://i.pinimg.com/474x/08/70/99/087099f4ee6f616427b2c0ce2ce33e6d.jpg",
    // shakthi:"https://i.pinimg.com/564x/11/a6/ea/11a6ea0e5a56d56f14e1de00a5a96823.jpg"
} 

//