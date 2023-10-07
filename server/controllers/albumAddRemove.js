const User = require('../model/user')

async function addAlbum(req,res) {
    
    try {
        const userId = req.body.userId 
        const albumId = req.body.albumId 

        const userProfile = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { likedAlbums: albumId } },
            {new: true}
        )

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }   

        if (!userProfile.likedAlbums.includes(albumId)) {
            return res.status(400).json({ message: 'Album not liked',userProfile });
        }

        res.json({ message: 'Album liked successfully', userProfile})

    } catch (err) {
        res.status(500).json(`Error:${err.message}`)
    }
}

async function removeAlbum(req,res) {

        try {
        const userId = req.body.userId 
        const albumId = req.body.albumId 

        const userProfile = await User.findByIdAndUpdate(
            userId,
            { $pull: { likedAlbums: albumId } },
            {new: true}
        )

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }   

        if (userProfile.likedAlbums.includes(albumId)) {
            return res.status(400).json({ message: 'Album not disliked',userProfile });
        }

        res.json({ message: 'Album disliked successfully', userProfile})
        
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)
    }
}


module.exports = {addAlbum,removeAlbum}