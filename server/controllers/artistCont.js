const Artist = require('../model/artist')

async function getArtists(req,res) {
    
    try {
        const artists = await Artist.find()
        res.json(artists)
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)
    }
}

module.exports = getArtists