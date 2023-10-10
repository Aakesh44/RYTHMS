import React, { useContext, useState } from 'react'
import song from '../images/song.jpg'
import {BsHeart,BsFillHeartFill,BsThreeDots,BsFillPauseFill,BsFillPlayFill} from 'react-icons/bs'

import Category from './Category'
import RecAlbam from './RecAlbam'
import ThreeDotMenu from './ThreeDotMenu'
import DataContext from '../context/DataContext'
import { useParams,Link } from 'react-router-dom'

const AlbumRoom = () => {

  const {homeWidth,allSongs,allAlbums,allArtists,capital,mainUser,handleLikeAlbum,handleDislikeAlbum,updateList} = useContext(DataContext)

  const [DotMenu,setDotMenu] = useState(false)
  const id = useParams().id

  const album = allAlbums.find(n=> n._id === id)
  // console.log(allAlbums);

  const artist = allArtists.find(n=> n._id === album.artist)

  const songs = album.songs
  // console.log(songs);
  const duration = allSongs.filter(n=> songs.includes(n._id)).reduce((a,b)=> parseInt(a.duration) + parseInt(b.duration) )
  // console.log(duration);

  const [like,setLike] = useState(mainUser.likedAlbums.includes(id))

  function handleHeart(){
    if(!like){
      handleLikeAlbum(id)
    }
    else{
      handleDislikeAlbum(id)
    }
    setLike(!like)
  }

  return (
    <main className='w-full rounded-md mb-16 sm:mb-0'>

      <section  className='RoomsHeight bg-black p-4 flex items-end rounded-t-md'>

        <aside className=' w-2/5 sm:w-auto h-fit mr-4 shadow-2xl'>
          <img src={album.img} alt="" 
            style={{transform:'scale(1.0)',transition:'transform 0.4s ease'}}
            onMouseEnter={(e)=> { if(e.target) e.target.style.transform = 'scale(1.02)'}}
            onMouseLeave={(e)=> { if(e.target) e.target.style.transform = 'scale(1.00)'} }
            className=' aspect-square h-32 w-32 sm:h-48 sm:w-48 xl:h-60 xl:w-60 cursor-pointer duration-200' />
        </aside>

        <aside className='w-3/5 sm:w-auto'>
          <h1 className=' text-sm '>Album</h1>
          <h1 style={{fontSize:homeWidth > 1300 ? '70px' :homeWidth > 1100 ? '50px' :homeWidth > 500 ?'30px':'24px'}} className='font-bold whitespace-nowrap text-ellipsis  overflow-hidden'>{capital(album.title)}</h1>
          <h1 className=' text-sm font-semibold flex gap-1 whitespace-nowrap text-ellipsis  overflow-hidden'>
            <span className=' cursor-pointer hover:underline'>
              <Link to={`/artist/${artist._id}`}>
                {capital(artist.name)}
              </Link>
            </span> 
            <span>•</span>
            <span>{album.year}</span>
            <span>•</span>
            <span>{songs.length} songs</span>
            <span>•</span>
            <span>{duration} mins</span>jkkjknkn
          </h1>
        </aside>

      </section>

      <section className='w-full p-4 my-5 h-20 flex items-center'>

        <div onClick={()=>updateList(songs)} className=' Flex h-14 w-14 mr-7 hover:scale-105 cursor-pointer bg-green-500 rounded-full outline-none shadow-none'>
          <BsFillPlayFill className='h-9 w-9 text-black'/>
        </div>

        {like ? <BsFillHeartFill onClick={handleHeart} className=' h-8 w-8 mr-7 cursor-pointer text-green-500 '/> : <BsHeart onClick={handleHeart}  className=' h-8 w-8 mr-7 cursor-pointer Textgrey hover:text-white '/> }

        <span className=' relative'>
          <BsThreeDots 
          onClick={()=>setDotMenu(!DotMenu)}
          className=' h-7 w-7 cursor-pointer Textgrey hover:text-white'/>
          {
            DotMenu && <ThreeDotMenu albumId = {id}/>
          }

        </span>

      </section>

      <RecAlbam songIds = {songs} cat='album' />
      
      {/* <Category /> */}
    </main>
  )
}

export default AlbumRoom