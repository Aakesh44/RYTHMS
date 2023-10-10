const Album = require('../model/album')

async function getAlbums(req,res) {
    
    try {
        const albums =await Album.find()
        res.json(albums)

    } catch (err) {
        res.status(500).json(`Error:${err.message}`)
    }
}

module.exports = getAlbums