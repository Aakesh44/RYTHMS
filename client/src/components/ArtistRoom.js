import React, { useContext, useState } from 'react'
import {BsFillPlayFill} from 'react-icons/bs'
import { MdVerified } from "react-icons/md";
import RecAlbam from './RecAlbam'
import DataContext from '../context/DataContext'
import { useParams } from 'react-router-dom';

const ArtistRoom = () => {
    const {allArtists,allSongs,capital,updateList} = useContext(DataContext)


    const id = useParams().id

    const artist = allArtists.find(n=> n._id === id)
    // console.log(artist);
    const artistSongs = allSongs.filter(song=>song.artist.includes(artist._id)).map(n=>n._id)
    // console.log(artistSongs);

  return (
    <main className='w-full rounded-md mb-16 sm:mb-0'>

      <section 
      // style={{backgroundImage:`url(${artist.img})`}}
      className='RoomsHeight bg-black p-4 flex items-end rounded-t-md '>

        <aside className=' w-2/5 sm:w-auto h-fit mr-4 shadow-2xl'>
          <img src={artist?.img} alt="" 
            style={{transform:'scale(1.0)',transition:'transform 0.4s ease'}}
            onMouseEnter={(e)=> { if(e.target) e.target.style.transform = 'scale(1.02)'}}
            onMouseLeave={(e)=> { if(e.target) e.target.style.transform = 'scale(1.00)'} }
            className=' aspect-square h-32 w-32 sm:h-48 sm:w-48 xl:h-60 xl:w-60 cursor-pointer duration-200' />
        </aside>

        <aside className=''>
          {artist?.verified && <h1 className=' text-sm flex items-center'><MdVerified className=' h-6 w-6 text-blue-500'/>verified Artist</h1>}
          
          <h1 className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-8xl mb-5'>{capital(artist?.name)}</h1>
          <h1 className=' text-lg font-semibold flex gap-1 mb-4'>
           {artist?.listener} monthly listeners
          </h1>
        </aside>

      </section>

      <section className='w-full p-4 my-5 h-20 flex items-center'>

        <div onClick={()=>updateList(artistSongs)} className=' Flex h-14 w-14 mr-7 hover:scale-105 cursor-pointer bg-green-500 rounded-full outline-none shadow-none'>
          <BsFillPlayFill className='h-9 w-9 text-black'/>
        </div>

        <button className=' w-fit text-sm p-1 px-5 font-semibold border border-gray-500 rounded-full mr-5 hover:scale-105'>
            Follow
        </button>


      </section>

      <RecAlbam songIds={artistSongs}/>
      
      {/* <Category /> */}
    </main>
  )
}

export default ArtistRoom