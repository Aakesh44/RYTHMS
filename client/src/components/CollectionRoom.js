import React, { useContext, useState } from 'react'
import {BsFillPlayFill} from 'react-icons/bs'
import {GoHeartFill} from 'react-icons/go'
import RecAlbam from './RecAlbam'
import DataContext from '../context/DataContext'
import { Link } from 'react-router-dom'
const CollectionRoom = () => {

const {homeWidth,mainUser,updateList} = useContext(DataContext)


const songs = mainUser?.likedSongs
// console.log(songs);

return (
    <main className='w-full rounded-md mb-16 sm:mb-0'>

      <section  className='Asidelikeboxicon RoomsHeight p-4 flex items-end rounded-t-md'>

        <aside className='Asidelikeboxicon mt-3 shadow-2xl h-24 aspect-square  sm:h-48 sm:w-48 mr-12 Flex rounded-md bg-green-400'>
          <GoHeartFill className=' h-12 w-12'/>
        </aside>

        <aside className='w-3/5 overflow-hidden'>
          <h1 className=' text-sm '>Playlist</h1>
          <h1 style={{fontSize:homeWidth > 1300 ? '70px' :homeWidth > 1100 ? '50px' :'40px'}} className='font-bold text-xl whitespace-nowrap sm:text-4xl my-5 md:my-10 '>Liked Songs</h1>
          <h1 className=' text-sm font-semibold flex gap-1'>
            <Link to={`/profile/${mainUser._id}`} className=' cursor-pointer hover:underline'>{mainUser.name}</Link> 
            <span>•</span>
            <span>{songs.length} songs</span>
          </h1>
        </aside>

      </section>

      <section className='w-full p-4 my-5 h-20 flex items-center'>

        <div onClick={()=>updateList(songs)} className=' Flex h-14 w-14 mr-7 hover:scale-105 cursor-pointer bg-green-500 rounded-full outline-none shadow-none'>
          <BsFillPlayFill  className='h-9 w-9 text-black'/>
        </div>

      </section>

      {
        songs.length > 0 && <RecAlbam songIds = {songs} cat='playlist' />
      }

    </main>
  )
}

export default CollectionRoom