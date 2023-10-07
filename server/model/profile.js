const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const profileSchema = mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    img:{
        type:String,
        default:null
    },
    adPermission:{
        type:Boolean,
        default:false
    },
    dataPermission:{
        type:Boolean,
        default:false
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
        }
    ],
    topArtists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist',
        }
    ],
    topSongs: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Song',
        }
    ],
    currentSong: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song',
        }
    ],
    publicPlaylists: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Playlist',
        }
    ],
    likedSongs: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Song',
        }        
    ],
    likedPlaylists: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Playlist',
        }        
    ],
    likedAlbums: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Album',
        }          
    ]
    

})

profileSchema.pre('save', async function (next) {
    
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)

})

profileSchema.methods.matchPassword = async function(enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password)
}

module.exports = mongoose.model('Profile',profileSchema,'profile')