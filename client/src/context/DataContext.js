import axios from "axios";
import { createContext, useState ,useEffect} from "react";
import { useNavigate,useLocation} from "react-router-dom";

const DataContext = createContext()

export const DataProvider = ({children}) =>{

    const [homeWidth,setHomeWidth] = useState(0)
    const [homeSearch,setHomeSearch] = useState('/')

    const [searchQuery,setSearchQuery] = useState('')
    const [searchFilter,setSearchFilter] = useState('')

    const[userData,setUserData] = useState(()=>{
        const userString = localStorage.getItem('userinfo')
        if(userString){
            return JSON.parse(userString)
        }
        return null
    })


    const location = useLocation()
    const navigate = useNavigate()

    // user data

    const handleUser = async() =>{
        const userInfostring = localStorage.getItem('userinfo')

        if(userInfostring){
            navigate('/');
            const user = JSON.parse(userInfostring)
            setUserData(user)
            // console.log('userData: ',userData);
        }
    }

    useEffect(()=>{
        handleUser()
    },[])



    useEffect(() => {
        const pathSegments = location.pathname.split('/');

        if( !pathSegments[1]){
            setSearchQuery("")
            setSearchFilter("")
            // console.log('loi');
        }
        if(pathSegments[2] ===''){
            navigate('/search')
        }
        else{
            const query = pathSegments[2] || '';
            let filter = pathSegments[3] || '';
            if(query === '') {setSearchFilter('')}
    
            // console.log('jii');
            setSearchQuery(query);
            setSearchFilter(filter);
        }

      }, [searchFilter,searchQuery,navigate]);
    
    const [allSongs,setAllSongs] = useState([])
    const [allProfiles,setAllProfiles] = useState([])
    const [allArtists,setAllArtists] = useState([])
    const [allAlbums,setAllAlbums] = useState([])
    const [allPlaylists,setAllPlaylists] = useState([])
    const [mainUser,setMainUser] = useState({})

    const handleGetUser = async () =>{
        try {
            // console.log(userData._id);
            const userRes = await axios.get(`https://rythms-three.vercel.app/profiles/${userData._id}`)
            const userD =  await userRes.data;
            setMainUser(userD.user)
            // console.log(userD.user);
            console.log('main user :',mainUser);
            console.log('get user ah');
        } catch (err) {
            console.log('err:',err);
        }
    }
    useEffect(()=>{
        if(userData){
            handleGetUser()
        }
    },[])

    const getAllDatas =  async () =>{
        
        try {
            
            // const [songsRes,profilesRes,artistsRes,albumsRes,playlistsRes] = await Promise.all([
            //     axios.get('https://rythms-three.vercel.app/songs'),
            //     axios.get('https://rythms-three.vercel.app/profiles'),
            //     axios.get('https://rythms-three.vercel.app/artists'),
            //     axios.get('https://rythms-three.vercel.app/albums'),
            //     axios.get('https://rythms-three.vercel.app/playlists') 
            // ]);

            const songsRes      = await axios.get("https://rythms-three.vercel.app/songs")
            const profilesRes   = await axios.get("https://rythms-three.vercel.app/profiles")
            const artistsRes    = await axios.get("https://rythms-three.vercel.app/artists")
            const albumsRes     = await axios.get("https://rythms-three.vercel.app/albums")
            const playlistsRes  = await axios.get("https://rythms-three.vercel.app/playlists")
            // if(userData){
            //     const userRes = await axios.get(`https://rythms-three.vercel.app/profiles/${userData._id}`)
            //     const userD =  await userRes.data;
            //     setMainUser(userD.user)
            // }


            const songsData     = await songsRes.data
            const profilesData  = await profilesRes.data
            const artistsData   = await artistsRes.data
            const albumssData   = await albumsRes.data
            const playlistsData = await playlistsRes.data

            setAllSongs(songsData)
            setAllProfiles(profilesData)
            setAllArtists(artistsData)
            setAllAlbums(albumssData)
            setAllPlaylists(playlistsData)
            console.log('liiii');
        } 
        catch(err){
            console.log('err:',err);
        }
    }

    useEffect(()=>{
        getAllDatas()
        getSongIds()
    },[mainUser])


async function handleLikeSong(songId) {

    try {
      const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await axios.put(
      "https://rythms-three.vercel.app/like-song",
      {
        userId:mainUser._id,
        songId:songId
      },
      config
    )
    setMainUser(response.data.userProfile)
    console.log('liked');
    // handleGetUser()
    } 
    catch (err) {
      console.log(err.message);
    }
    }

    async function handleDisLikeSong(songId){
    try {
        const config = {
            headers: {
                "Content-Type":"application/json"
            }
        }

        const response = await axios.put(
            "https://rythms-three.vercel.app/dislike-song",
            {
              userId:mainUser._id,
              songId:songId
            },
            config
        )
        setMainUser(response.data.userProfile)
        console.log('disliked');
        // handleGetUser()
    } 
    catch (err) {
        console.log(err.message);
    }
    }

    async function handleLikeAlbum(albumId) {
        
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const response = await axios.put(
                "https://rythms-three.vercel.app/add-album",
                {
                    userId:mainUser._id,
                    albumId:albumId
                },
                config
            )

            setMainUser(response.data.userProfile) 
            console.log('album liked');

        } catch (err) {
            console.log(err.message);
        }
    }

    async function handleDislikeAlbum(albumId) {
        
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const response = await axios.put(
                "https://rythms-three.vercel.app/remove-album",
                {
                    userId:mainUser._id,
                    albumId:albumId
                },
                config
            )

            setMainUser(response.data.userProfile) 
            console.log('album liked');

        } catch (err) {
            console.log(err.message);
        }
    }

    async function handleLikePlaylist(playlistId) {
        
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const response = await axios.put(
                "https://rythms-three.vercel.app/add-playlist",
                {
                    userId:mainUser._id,
                    playlistId:playlistId
                },
                config
            )

            setMainUser(response.data.userProfile) 
            console.log('album liked');

        } catch (err) {
            console.log(err.message);
        }
    }

    async function handleDislikePlaylist(playlistId) {
        
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const response = await axios.put(
                "https://rythms-three.vercel.app/remove-playlist",
                {
                    userId:mainUser._id,
                    playlistId:playlistId
                },
                config
            )

            setMainUser(response.data.userProfile) 
            console.log('album liked');

        } catch (err) {
            console.log(err.message);
        }
    }

    async function handleCreatePlaylist() {
        
        const count = allPlaylists.filter(playlist => playlist.artist === mainUser._id).length

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const response = await axios.post(
                "https://rythms-three.vercel.app/create-playlist",
                {
                    userId : mainUser._id,
                    title :`My Playlist ${count+1}`
                },
                config
            )

            setMainUser(response.data.userProfile)
            console.log('playlis added');
        } catch (err) {
            console.log(err.message);
        }

    }

    async function handleDeletePlaylist(playlistId) {
        
        try {
            console.log(playlistId);
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const response = await axios.put(
                "https://rythms-three.vercel.app/delete-playlist",
                {   
                    userId:mainUser._id,
                    playlistId: playlistId
                },
                config
            )

            console.log('playlist deleted');
            navigate('/')
            handleGetUser()
        } catch (err) {
            console.log(err.message);
        }
    }

    async function handleEditPlaylist(playlistId,title) {
        
        try {
            console.log(playlistId);
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const response = await axios.put(
                "https://rythms-three.vercel.app/edit-playlist",
                {   
                    title:title,
                    playlistId: playlistId
                },
                config
            )

            console.log('playlist edited deleted');

            handleGetUser()
        }
        catch (err) {
            console.log(err.message);
        }
    }

    async function handlePushToPlaylist(playlistId,songId){
        try {
            
            const config = {
                headers:{
                    "Content-Type": "application/json"
                }
            }
            const response = await axios.put(
                "https://rythms-three.vercel.app/push-playlist",
                {
                    songId:songId,
                    playlistId:playlistId
                },
                config
            )
            console.log('song added');
            getAllDatas()
        } catch (err) {
            console.log('err:',err.message);
        }
    }

    async function handlePullToPlaylist(playlistId,songId) {
        
        try {
            
            const config = {
                headers:{
                    "Content-Type": "application/json"
                }
            }
            const response = await axios.put(
                "https://rythms-three.vercel.app/pull-playlist",
                {
                    songId:songId,
                    playlistId:playlistId
                },
                config
            )
            console.log('song pulled');
            getAllDatas()
        } catch (err) {
            console.log('err:',err.message);
        }

    }
    
    async function handleProfileEdit(userId,name) {
        
        try {
            
            const config = {
                headers:{
                    "Content-Type": "application/json"
                }
            }
            const response = await axios.put(
                "https://rythms-three.vercel.app/edit-profile",
                {
                    userId:userId,
                    name:name
                },
                config
            )
            console.log('song pulled');
            getAllDatas()
        } catch (err) {
            console.log('err:',err.message);
        }
    }

    async function handleFollow(mainId,userId) {

        try {
            
            const config = {
                headers: {
                    'Content-Type':"application/json"
                }
            }

            const response = await axios.put(
                "https://rythms-three.vercel.app/follow",
                {
                    mainId:mainId,
                    userId:userId
                },
                config
            )
            handleGetUser()
            console.log('foloweddd');

        } catch (err) {
            console.log('not followed');
        }
    }

    async function handleUnfollow(mainId,userId) {
        try {
            
            const config = {
                headers: {
                    'Content-Type':"application/json"
                }
            }

            const response = await axios.put(
                "https://rythms-three.vercel.app/unfollow",
                {
                    mainId:mainId,
                    userId:userId
                },
                config
            )
            handleGetUser()
            console.log('unfollowed');

        } catch (err) {
            console.log('not unfollowed');
        }
    }

       
    function capital(str) {
        return str?.charAt(0).toUpperCase() + str?.slice(1);
    }
    const [signinmust,setSignInMust] = useState(false)

    const handleSign = () =>{
        if(Object.keys(mainUser).length === 0){
          setSignInMust(true)
          console.log('ee');
        }
    }

    const handleSignPopUpClose = () =>{
        setSignInMust(!signinmust)
    }

    const [curSongIds,setCurSongIds] = useState([])
    const [curIndex,setCurIndex] = useState(0)
    
    const [curSongI,setCurSongI] = useState(allSongs[0] ? allSongs[0] : allSongs[0])

    async function getSongIds() {
        try {
            const songIdsRes       = await axios.get("https://rythms-three.vercel.app/songIds")
            const songsIdsData  = await songIdsRes.data
            setCurSongIds(songsIdsData)
            // console.log('ji');
        } catch (error) {
            
        }
    }

    function findTheSong(){

        // curSong = 
        // console.log(curSong);
        setCurSongI(allSongs.find(n=>n._id === curSongIds[curIndex]))
    
    }
    
    useEffect(()=>{
      findTheSong()
    },[curIndex,curSongIds])

    async function updateSong(id) {

        setCurSongIds(prev=>[id,...prev.filter(n=> n !== id)])
        setCurIndex(prev=>0)
        // findTheSong()
    }
    
    async function updateList(ids){

        let vs = curSongIds.filter(n=> !ids.includes(n))

        setCurSongIds([...ids,...vs])
        setCurIndex(0)
    }

    const [nowPlayView,setNowPlayView] = useState(false)

    return(
        <DataContext.Provider 
        
        value={{
            homeWidth,
            setHomeWidth,
            homeSearch,
            setHomeSearch,

            searchQuery,setSearchQuery,
            searchFilter,setSearchFilter,

            userData,
            setUserData,

            mainUser,setMainUser,
            handleLikeSong,
            handleDisLikeSong,
            handleUser,
            handleLikeAlbum,
            handleDislikeAlbum,
            handleLikePlaylist,
            handleDislikePlaylist,

            handleCreatePlaylist,
            handleDeletePlaylist,
            handleEditPlaylist,
            handlePushToPlaylist,
            handlePullToPlaylist,

            handleProfileEdit,
            handleFollow,
            handleUnfollow,

            allSongs,
            allAlbums,
            allPlaylists,
            allProfiles,
            allArtists,

            capital,

            signinmust,
            setSignInMust,
            handleSign,
            handleSignPopUpClose,

            curSongIds,
            setCurSongIds,

            curIndex,
            setCurIndex,
            curSongI,
            
            updateSong,
            updateList,

            nowPlayView,
            setNowPlayView

        }}>
            {children}
        </DataContext.Provider>
    )
}



export default DataContext