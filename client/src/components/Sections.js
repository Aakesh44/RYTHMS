import React, { useContext } from 'react'
import TitleBar from './TitleBar'
import FeedCards from './FeedCards'
import '../css/sections.css'
import SectionCards from './SectionCards'
import DataContext from '../context/DataContext'
import { useLocation } from 'react-router-dom'
const Sections = ({searchAlbums,searchPlaylists,searchProfiles,searchArtists}) => {

  const {homeWidth,allAlbums,allArtists,allPlaylists,allSongs} = useContext(DataContext)

  const location = useLocation()
  const path = location.pathname.split('/')
  const cat = path[2]

  let  topItems = null

  if(searchAlbums){
    topItems = searchAlbums
  }
  else if(searchPlaylists){
    topItems = searchPlaylists
  }
  else if(searchProfiles){
    topItems = searchProfiles
  }
  else if(searchArtists){
    topItems = searchArtists
  }
  else if(cat === 'topsongs'){
     topItems = allSongs.slice(0,20)
  }
  else if(cat === 'playlist'){
    topItems = allPlaylists.slice(0,10)
  }
  else if(cat === 'albums'){
    topItems = allAlbums.slice(0,10)
  }  
  else if(cat === 'tamilsongs'){
    topItems = allSongs.slice(0,10)
  }  
  else if(cat === 'rahman'){
    topItems = allSongs.slice(0,10)
  }  
  else if(cat === 'artist'){
    topItems = allArtists.slice(0,10)
  }



  return (
    <main style={{minHeight:'350px'}} className='w-full MarginTop mb-16 sm:mb-0'>
        {/* <TitleBar/> */}

        <section 
        style={{gridTemplateColumns:
                homeWidth > 1300 ? "repeat(7,1fr)" :
                homeWidth > 1100 ? "repeat(6,1fr)" :
                homeWidth > 800 ? "repeat(4,1fr)" :
                homeWidth > 600 ? "repeat(3,1fr)" :
       
                "repeat(2,1fr)" 
        }}
        className='hidden w-full sm:grid p-5 gap-5 flex-wrap items-center'>

            {topItems?.map((item,ind)=>(
                <SectionCards item={item} cat={searchAlbums ? 'albums':searchPlaylists ? 'playlist' :searchProfiles ? 'profiles' :searchArtists ? 'artist' :cat} key={ind}/>
              ))
            }

        </section>

        <section style={{gridTemplateColumns:"repeat(2,1fr)"}} className='sections'>

          {topItems?.map((item,ind)=>(
                <FeedCards item={item} cat={searchAlbums ? 'albums':searchPlaylists ? 'playlist' :searchProfiles ? 'profiles' :searchArtists ? 'artist' :cat} key={ind}/>
            ))
          }  

        </section>
    </main>
  )
}

export default Sections