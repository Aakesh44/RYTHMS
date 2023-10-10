const Songs = require('../model/songs')

async function getSongs(req,res) {
    
    try {
        const songs = await Songs.find()
        res.json(songs)
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)
    }
}

async function getSongIds(req,res){
    try {
        const songs = await Songs.find()

        const songsIds = songs.map(n=>n._id)

        res.json(songsIds)

    } catch (err) {
        res.status(500).json(`Error:${err.message}`)
    }
}
module.exports = {getSongs,getSongIds}