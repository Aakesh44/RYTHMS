const User = require('../model/user')

const jwt = require('jsonwebtoken')
const secretKey = 'music'
const generateToken = require('../utils/generateToken')


async function signIn(req,res) {
    
    try {
        
        const {email,...other} = req.body 

        const userExists = await User.findOne({email:email})

        if(userExists){
            return res.status(400).json({ error: 'email not available' });
        }

        // console.log('koo');
        const user = await User.create(req.body)
        // console.log(user);
        if(user){
            res.status(201).json({

                _id : user._id,
                name:user.name,
                img:user.img,
                followers:user.followers,
                following:user.following,
                topArtists:user.topArtists,
                topSongs:user.topSongs,
                currentSong:user.currentSong,
                publicPlaylists:user.publicPlaylists,
                likedSongs:user.likedSongs,
                likedPlaylists:user.likedPlaylists,
                likedAlbums:user.likedAlbums,
                token:generateToken(user._id)
            })
        }
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)
    }

}

module.exports = signIn