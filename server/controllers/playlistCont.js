const Playlist = require('../model/playlist')
const User = require('../model/user')

async function createPlaylist(req,res) {
    try {
        
        const userId = req.body.userId 
        const title = req.body.title 

        const playlist = {
            title:title,
            artist:userId
        }

        await  Playlist.create(playlist)
            
        const play = await Playlist.findOne({title:title})
        if(!play) res.json('failed')
        
        const playlistId = play._id 

        if(!playlistId) res.json('id failed')

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
        res.status(500).json(`Error: ${err.message}`)
    }
}

async function deletePlaylist(req,res) {

    const userId = req.body.userId 
    const playlistId = req.body.playlistId 
    console.log(req.body);

    try {
        const userProfile = await User.findByIdAndUpdate(
            userId,
            { $pull: { likedPlaylists: playlistId } },
            {new: true}
        )

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }   

        if (userProfile.likedPlaylists.includes(playlistId)) {
            return res.status(400).json({ message: 'Playlist deleted',userProfile });
        }

        
        const deleteplaylist  = await Playlist.deleteOne({_id:playlistId})
        console.log(deleteplaylist);

        if(deleteplaylist.deletedCount < 1){
            return res.status(404).json({ message: 'Playlist not found' });
        }

        return res.status(200).json({ message: 'Playlist deleted successfully' });

    } catch (err) {
        console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
    }
}

async function editPlaylist(req,res){

    const playlistId = req.body.playlistId
    const title = req.body.title 

    try {
        
        const playlistEdit = await Playlist.findByIdAndUpdate(
            playlistId,
            {
                $set:{
                    title:title
                }
            }
        )
        console.log(playlistEdit);
        playlistEdit.modifiedCount === 0 ? res.json('title not updated') : res.json('title updated')

    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

async function pushToPlaylist(req,res) {
    
    const songId = req.body.songId 
    const playlistId = req.body.playlistId 

    try {
        
        const playlistUp = await Playlist.findByIdAndUpdate(
            playlistId,
            {
                $addToSet: {songs : songId}
            }
        )

        const playlist = await Playlist.findOne({_id:playlistId})

        if(! playlist.songs.includes(songId)){
            res.json('not added')
        }

        res.status(200).json('song added')

    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

async function pullToPlaylist(req,res) {
    
    const songId = req.body.songId 
    const playlistId = req.body.playlistId 

    try {
        
        const playlistUp = await Playlist.findByIdAndUpdate(
            playlistId,
            {
                $pull: {songs : songId}
            }
        )

        const playlist = await Playlist.findOne({_id:playlistId})

        if(playlist.songs.includes(songId)){
            res.json('not deleted')
        }

        res.status(200).json('song pull from playlist')

    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

async function getPlaylists(req,res) {
    
    try {
        const playlists = await Playlist.find()
        res.json(playlists)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports = {createPlaylist,deletePlaylist,editPlaylist,pushToPlaylist,pullToPlaylist,getPlaylists}