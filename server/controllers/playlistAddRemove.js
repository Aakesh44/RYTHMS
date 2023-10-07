const User = require('../model/user')

async function addPlaylist(req,res) {
    
    try {
        const userId = req.body.userId 
        const playlistId = req.body.playlistId 

        const userProfile = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { likedPlaylists: playlistId } },
            {new: true}
        )

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }   

        if (!userProfile.likedPlaylists.includes(playlistId)) {
            return res.status(400).json({ message: 'playlist not liked',userProfile });
        }

        res.json({ message: 'playlist liked successfully', userProfile})

    } catch (err) {
        res.status(500).json(`Error:${err.message}`)
    }
}

async function removePlaylist(req,res) {

        try {
        const userId = req.body.userId 
        const playlistId = req.body.playlistId 

        const userProfile = await User.findByIdAndUpdate(
            userId,
            { $pull: { likedPlaylists: playlistId } },
            {new: true}
        )

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }   

        if (userProfile.likedPlaylists.includes(playlistId)) {
            return res.status(400).json({ message: 'Playlist not disliked',userProfile });
        }

        res.json({ message: 'Playlist disliked successfully', userProfile})
        
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)
    }
}


module.exports = {addPlaylist,removePlaylist}