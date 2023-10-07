import React, { useContext , useState } from 'react'
import '../css/Category.css'
import TitleBar from './TitleBar'
import SectionCards from './SectionCards'
import DataContext from '../context/DataContext'
import FeedCards from './FeedCards'
import SignInMust from './SignInMust'
import {Link} from 'react-router-dom'
const Category = ({cat,id}) => {

  const {homeWidth,allSongs,allAlbums,allPlaylists,allProfiles,allArtists,capital,mainUser,handleSign,signinmust} = useContext(DataContext)
  
  const itemsToDisplay = [
    {width:300,count:1},
    {width:450,count:2},
    {width:700,count:3},
    {width:800,count:4},
    {width:1000,count:5},
    {width:1400,count:6},
  ]
  let count = 0

  itemsToDisplay.forEach((n,i)=> homeWidth >= n.width ? count = n.count :null)

  const profile = allProfiles.find(n=> n._id === id)

  let  topItems = null
  if(cat === 'topsongs'){
     topItems = allSongs
  }
  else if(cat === 'playlist'){
    topItems = allPlaylists
  }
  else if(cat === 'albums'){
    topItems = allAlbums
  }  
  else if(cat === 'tamilsongs'){
    topItems = allSongs
  }  
  else if(cat === 'rahman'){
    topItems = allSongs
  }  
  else if(cat === 'artist'){
    topItems = allArtists
  }
  else if(cat === 'publicPlaylist'){
    topItems = allPlaylists.filter(playlist => playlist.artist === id)
  }
  else if(cat === 'followers'){
    topItems = allProfiles.filter(n => profile.followers.includes(n._id))
  }
  else if(cat === 'following'){
    topItems = allProfiles.filter(n => n.followers.includes(profile._id))
  }
  
  
// console.log(topItems);

  return (
    <main className='Category'>
        <main className=' w-full h-16 flex items-center justify-between px-5 '>
          <h1 onClick={handleSign} className=' text-2xl font-bold cursor-pointer hover:underline'>           
            <Link to={(Object.keys(mainUser).length > 0) &&`${cat === 'publicPlaylist' || cat === 'followers' || cat === 'following' ? `/profile/${id}/${cat}`:`/section/${cat}`}`}>
             {capital(cat) }
            </Link>
          </h1>
          <h1 onClick={handleSign} className=' hidden sm:block Textgrey text-sm font-semibold cursor-pointer hover:underline'>
            <Link to={(Object.keys(mainUser).length > 0) &&`${cat === 'publicPlaylist' || cat === 'followers' || cat === 'following' ? `/profile/${id}/${cat}`:`/section/${cat}`}`}>
              Show all
            </Link>
          </h1>
        </main>
        <section style={{gridTemplateColumns:`repeat(${count},1fr)`}} className='hidden sm:grid items-center mx-4'>
            
            {topItems.slice(0,count)?.map((item,ind)=>(
                <SectionCards item={item} cat={cat} key={ind}/>
              ))
            }

        </section>
        <section className='Mobile'>
          
            {topItems?.map((item,ind)=>(
              <FeedCards item={item} cat={cat} key={ind}/>
            ))}
          
        </section> 
        {signinmust && <SignInMust />}
    </main>
  )
}

export default Category

