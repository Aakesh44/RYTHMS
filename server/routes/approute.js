const express = require('express')
const router = express.Router()

const logInCont = require('../controllers/log-inCont')
const signInCont = require('../controllers/sign-inCont')
const profileCont = require('../controllers/profileCont')
const albumCont = require('../controllers/albumCont')
const playlistCont = require('../controllers/playlistCont')
const artistCont = require('../controllers/artistCont')
const songCont = require('../controllers/songsCont')
const likeSong = require('../controllers/likedSongCont')
const albumAddRemove = require('../controllers/albumAddRemove')
const playlistAddRemove = require('../controllers/playlistAddRemove')

const requestValidation = require('../middleware/validationReq')


router.route('/log-in')

.post(

    requestValidation.requestBody,
    requestValidation.requestValid,
    logInCont
)

router.route('/sign-up')

.post(
    requestValidation.requestBody,
    requestValidation.requestValid,
    signInCont
)

router.route('/profiles').get(profileCont.getProfile)
router.route('/profiles/:id').get(profileCont.getUser)
router.route('/edit-profile').put(profileCont.editUser)
router.route('/follow').put(profileCont.addFollowing)
router.route('/unfollow').put(profileCont.removeFollowing)

router.route('/albums').get(albumCont)
router.route('/add-album').put(albumAddRemove.addAlbum)
router.route('/remove-album').put(albumAddRemove.removeAlbum)

router.route('/playlists').get(playlistCont.getPlaylists)
router.route('/add-playlist').put(playlistAddRemove.addPlaylist)
router.route('/remove-playlist').put(playlistAddRemove.removePlaylist)

router.route('/create-playlist').post(playlistCont.createPlaylist)
router.route('/delete-playlist').put(playlistCont.deletePlaylist)
router.route('/edit-playlist').put(playlistCont.editPlaylist)
router.route('/push-playlist').put(playlistCont.pushToPlaylist)
router.route('/pull-playlist').put(playlistCont.pullToPlaylist)

router.route('/songs').get(songCont.getSongs)
router.route('/songIds').get(songCont.getSongIds)
router.route('/like-song').put(likeSong.likeSong)
router.route('/dislike-song').put(likeSong.disLikeSong)

router.route('/artists').get(artistCont)




module.exports = router