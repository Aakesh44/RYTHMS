const Artist = require('../model/artist')

async function getArtists(req,res) {
    
    try {
        const artists = await Artist.find()
        res.json(artists)
    } catch (error) {
        
    }
}

module.exports = getArtists