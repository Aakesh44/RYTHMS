import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import DataContext from '../context/DataContext'
import SectionCards from './SectionCards'
import FeedCards from './FeedCards'

const ProfileViews = () => {
    const {allPlaylists,allProfiles,homeWidth} = useContext(DataContext)

    const id = useParams().id 
    const option = useParams().option

    const profile = allProfiles.find(n=> n._id === id)
    // console.log('id :',id,'option :',option);
    // console.log(profile);
    
    let topItems 

    if (option === 'publicPlaylist') {
        
        topItems = allPlaylists.filter(playlist=> playlist.artist  === id)
    } 
    else if(option === 'followers'){
        topItems = allProfiles.filter(n => profile.followers.includes(n._id))
      }
      else if(option === 'following'){
        topItems = allProfiles.filter(n=> n.followers.includes(profile._id))
      }
  return (
    <main style={{minHeight:'350px',marginTop:'9vh'}} className='w-full '>
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
            <SectionCards item={item} cat={option === 'publicPlaylist' ? 'playlist' :(option === 'followers' || option === 'following') && 'profiles'} key={ind}/>
          ))
        }

    </section>

    <section className='Mobile'>
          
          {topItems?.map((item,ind)=>(
            <FeedCards item={item} cat={option === 'publicPlaylist' ? 'playlist' :(option === 'followers' || option === 'following') && 'profiles'} key={ind}/>
          ))}
        
      </section> 
</main>
  )
}

export default ProfileViews