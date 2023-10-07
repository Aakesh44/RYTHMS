const User = require('../model/user')

const generateToken = require('../utils/generateToken')


async function login(req,res) {

    try {
        
        const {email,password} = req.body 
        const user = await User.findOne({email:email})

        if(user && (await user.matchPassword(password))){

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
        else{
            res.status(400).json('invalid email or password')
        }
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)
    }

}


module.exports = login