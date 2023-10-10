import React,{useContext, useEffect, useState} from 'react'
import SearchFilters from './SearchFilters'
import Recommended from './Recommended'
import PlayButton from './PlayButton'
import DataContext from '../context/DataContext'
import { Link } from 'react-router-dom'
import SearchCat from './SearchCat'
import RecAlbam from './RecAlbam'
import Sections from './Sections'
import NoResult from './NoResult'
const SearchRoom = () => {

    const {homeWidth,searchQuery,searchFilter,allSongs,allAlbums,allPlaylists,allProfiles,allArtists,} = useContext(DataContext)
    const [PlayButtonShow,setPlayButtonShow] = useState(false)
    const [searchSongs,setSearchSongs] =useState([])
    const [songIds,setSongIds] = useState([])
    const [searchAlbums,setSearchAlbums] = useState([])
    const [searchPlaylists,setSearchPlaylists] = useState([])
    const [searchProfiles,setSearchProfiles] = useState([])
    const [searchArtists,setSearchArtists] = useState([])

    const query = searchQuery.split('%20').join('')
    const filter = searchFilter.trim()
    // console.log('query :',query);
    

    useEffect(()=>{
        setSearchSongs(allSongs.filter(song => song.title.split(" ").join("").toLowerCase().trim().includes(query.toLowerCase())).slice(0,4))
        setSongIds(allSongs.filter(song => song.title.split(" ").join("").toLowerCase().trim().includes(query.toLowerCase())).map(n=> n._id))
        setSearchAlbums(allAlbums.filter(album=>album.title.split(" ").join("").toLowerCase().trim().includes(query.toLowerCase())))
        setSearchPlaylists(allPlaylists.filter(playlist=>playlist.title.split(" ").join("").toLowerCase().trim().includes(query.toLowerCase())))
        setSearchProfiles(allProfiles.filter(profile=>profile.name.split(" ").join("").toLowerCase().trim().includes(query.toLowerCase())))
        setSearchArtists(allArtists.filter(artist=>artist.name.split(" ").join("").toLowerCase().trim().includes(query.toLowerCase())))

        // console.log('kiki');
    },[searchQuery,searchFilter])
    
   
    // console.log(songIds);

    const handleArtist=(id)=>{
        const artist = allArtists.find(n=> n._id === id)
        return artist.name
    }

    
  return (
    <div className='mb-16 sm:mb-0'>
    <SearchFilters/>

    {
        
    query.length === 0  ? 
        <NoResult query={query}/>:
    (searchAlbums.length === 0 && searchSongs.length === 0 && searchArtists.length === 0 && searchPlaylists.length === 0 && searchProfiles.length === 0) ?
        <NoResult query={query}/>:

    (filter === 'song' && searchSongs.length !== 0 )?
        <div className='MarginTop'><RecAlbam songIds={songIds} /></div>:

    filter === 'album' && (searchAlbums.length === 0) ?
        <div><NoResult query={query}/></div>:       
    filter === 'album' && (searchAlbums.length) ?
        <div><Sections searchAlbums={searchAlbums}/></div>:

    filter === 'playlist' && (searchPlaylists.length === 0) ?
        <div><NoResult query={query}/></div>:       
    filter === 'playlist' && (searchPlaylists.length) ?
        <div><Sections searchPlaylists={searchPlaylists}/></div>:

    filter === 'profile' && (searchProfiles.length === 0) ?
        <div><NoResult query={query}/></div>:       
    filter === 'profile' && (searchProfiles.length) ?
        <div><Sections searchProfiles={searchProfiles}/></div>:
    
    filter === 'artist' && (searchArtists.length === 0) ?
        <div><NoResult query={query}/></div>:       
    filter === 'artist' && (searchArtists.length) ?
        <div><Sections searchArtists={searchArtists}/></div>:


    (filter.length === 0 && searchSongs.length) ?
        <main style={{marginTop:'8vh'}} className='px-4 relative'>

            <section style={{height:homeWidth < 800 ? 'fit-content':'355px',display:homeWidth > 800 && 'flex'}} className='w-full items-start mt-10 '>
                <Link to={`/track/${searchSongs[0]._id}`} style={{width:'450px'}} className=' h-full mt-0  flex flex-col justify-between p-1'>
                    
                    <h1 className=' text-3xl font-bold'>Top result</h1>

                    <div 
                    onMouseEnter={()=>setPlayButtonShow(true)}
                    onMouseLeave={()=>setPlayButtonShow(false)}
                    style={{backgroundColor:PlayButtonShow ? '#282828' : '#141414'}}
                    className='rounded-md p-5 relative cursor-pointer'>
                        <img src={searchSongs[0].img} alt="" className=' h-24 w-24 rounded-2xl mb-4'/>
                        <h1 
                        style={{maxWidth:'98%',textOverflow:'ellipsis'}}
                        className=' text-3xl font-bold whitespace-nowrap overflow-hidden mb-4'>{searchSongs[0].title}</h1>
                        <h1 className=' text-sm font-semibold'>{handleArtist(searchSongs[0].artist[0])}</h1>
                        {
                            PlayButtonShow && <PlayButton show={PlayButtonShow}/>
                        }
                        
                    </div>
                </Link>
                
                <aside className=' w-full'>
                    <Recommended searchSongs={searchSongs} key={0}/>
                </aside>
            </section>

        </main>:<></>

    }
    <>
        {(searchArtists.length  >0  && filter.length === 0) && <SearchCat cat={'artist'}/>}
        {(searchAlbums.length   >0  && filter.length === 0) && <SearchCat cat={'albums'}/>}
        {(searchPlaylists.length>0 && filter.length === 0) && <SearchCat cat={'playlist'}/>}
        {(searchProfiles.length >0 && filter.length === 0) && <SearchCat cat={'profiles'}/>}
    </>

    </div>
    

  )
}

export default SearchRoom