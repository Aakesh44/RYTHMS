const Album = require('../model/album')

async function getAlbums(req,res) {
    
    try {
        const albums =await Album.find()
        res.json(albums)

    } catch (error) {
        
    }
}

module.exports = getAlbums