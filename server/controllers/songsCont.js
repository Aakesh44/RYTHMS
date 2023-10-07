const Songs = require('../model/songs')

async function getSongs(req,res) {
    
    try {
        const songs = await Songs.find()
        res.json(songs)
    } catch (error) {
        
    }
}

async function getSongIds(req,res){
    try {
        const songs = await Songs.find()

        const songsIds = songs.map(n=>n._id)

        res.json(songsIds)

    } catch (err) {
        
    }
}
module.exports = {getSongs,getSongIds}