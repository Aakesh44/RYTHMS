const User = require('../model/user')

async function likeSong(req,res) {
    
    try {

        const userId = req.body.userId
        const songId = req.body.songId 
        // console.log(req.body.songId);


        const userProfile = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { likedSongs: songId } },
            { new: true }
        )

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }       

        if (!userProfile.likedSongs.includes(songId)) {
            return res.status(400).json({ message: 'Song not liked',userProfile });
        }

        res.json({ message: 'Song liked successfully', userProfile });
        // console.log('liked',userProfile);
        
          
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)

    }

}

async function disLikeSong(req,res) {
    
    try {
        const userId = req.body.userId 
        const songId = req.body.songId 
        // console.log('stage 1');

        const userProfile = await User.findByIdAndUpdate(
            userId,
            { $pull: { likedSongs: songId } },
            {new: true }
        )

        if (!userProfile) {
            // console.log('no user');
            return res.status(404).json({ message: 'User not found' });
        }       

        if (userProfile.likedSongs.includes(songId)) {
            // console.log('song illa');
            return res.status(400).json({ message: 'Song not disliked',userProfile });
        }

        res.json({ message: 'Song disliked successfully', userProfile });
        // console.log('disliked',userProfile);

          
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)

    }
}
module.exports = {likeSong,disLikeSong}