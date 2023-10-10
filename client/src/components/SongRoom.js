import React, { useContext, useState } from 'react'
import {BsHeart,BsFillHeartFill,BsThreeDots,BsFillPlayFill} from 'react-icons/bs'
import Lyrics from './Lyrics'
import RecAlbam from './RecAlbam'
import ThreeDotMenu from './ThreeDotMenu'
import DataContext from '../context/DataContext'
import { Link, useParams } from 'react-router-dom'

const SongRoom = () => {

  const {homeWidth,allSongs,allArtists,capital,mainUser,handleLikeSong,handleDisLikeSong,updateSong} = useContext(DataContext)
  const [DotMenu,setDotMenu] = useState(false)

  const  id = useParams().id
  // console.log(id);

  const song = allSongs.find(n=> n._id === id)
  // console.log(allSongs);

  const artists = allArtists.filter(n=> song?.artist.includes(n._id) ) 
  // console.log(artists);
  const artistSongs = allSongs.filter(song=>song.artist.includes(artists[0]._id)).map(n=>n._id)
  // console.log(artistSongs);
  // const songIds = artists[0].songs

  const [like,setLike] = useState(mainUser?.likedSongs?.includes(id))
// console.log(mainUser.likedSongs.includes(id));

function handleHeart(){
  if(!like){
    handleLikeSong(id)
  }
  else{
    handleDisLikeSong(id)
  }
  setLike(!like)
}

const [showLyrics,setShowLyrics] = useState(false)

  return (

    <main className='w-full rounded-md MarginTop mb-16 md:mb-0'>

      <section  className='RoomsHeight bg-black p-4 flex items-end rounded-t-md'>

        <aside className=' w-fit h-fit mr-4 shadow-2xl'>
          <img src={song?.img} alt="" 
            style={{transform:'scale(1.0)',transition:'transform 0.4s ease'}}
            onMouseEnter={(e)=> { if(e.target) e.target.style.transform = 'scale(1.02)'}}
            onMouseLeave={(e)=> { if(e.target) e.target.style.transform = 'scale(1.00)'} }
            className=' aspect-square h-32 w-32 sm:h-48 sm:w-48 xl:h-60 xl:w-60 cursor-pointer duration-200' />
        </aside>

        <aside className=' overflow-hidden'>
          <h1 className=' text-sm '>Song</h1>
          <h1 style={{fontSize:homeWidth > 1300 ? '70px' :homeWidth > 1100 ? '50px':homeWidth > 500 ?'30px':'24px'}} className='font-bold whitespace-nowrap text-ellipsis  overflow-hidden'>{capital(song?.title)}</h1>
          <h1 className=' text-sm font-semibold flex items-center gap-1'>
            <Link to={`/artist/${artists[0]?._id}`} className=' cursor-pointer hover:underline'>{capital(artists[0]?.name)}</Link> 
            <span>•</span>
            <span className=' cursor-pointer hover:underline'>album</span>
            <span>•</span>
            <span>{song?.release}</span>
            <span>•</span>
            <span>{song?.duration}</span>
          </h1>
        </aside>

      </section>

      <section className='w-full p-4 my-5 h-20 flex items-center'>

        <div onClick={()=>updateSong(song?._id)} className=' Flex h-14 w-14 mr-7 hover:scale-105 cursor-pointer bg-green-500 rounded-full outline-none shadow-none'>
          <BsFillPlayFill className='h-9 w-9 text-black'/>
        </div>

        {like ? <BsFillHeartFill onClick={handleHeart} className=' h-8 w-8 mr-7 cursor-pointer text-green-500 '/> : <BsHeart onClick={handleHeart}  className=' h-8 w-8 mr-7 cursor-pointer Textgrey hover:text-white '/> }
        

        <span className=' relative'>
          <BsThreeDots 
          onClick={()=>setDotMenu(!DotMenu)}
          className=' h-7 w-7 cursor-pointer Textgrey hover:text-white'/>
          {
            DotMenu && <ThreeDotMenu/>
          }

        </span>

      </section>

      <section style={{gridTemplateColumns:homeWidth > 1000 ? '1.4fr 1fr' : '1fr'}} className=' w-full p-4 grid'>

        <aside className='w-96 mb-6 sm:hidden'>
          <button className=' text-2xl mb-8 font-bold' onClick={()=>setShowLyrics(!showLyrics)}>Lyrics</button>
          { showLyrics && <Lyrics text={song?.lyrics}/> }
        </aside>

        <aside className='w-96 mb-6 hidden sm:block'>
          <button className=' text-2xl mb-8 font-bold' >Lyrics</button>
          <Lyrics text={song?.lyrics}/>
        </aside>

        <aside className='w-full'>

          {artists.map((artist,ind)=>(
            <Link to={`/artist/${artist?._id}`} key={ind} className='h-24 w-80 sm:w-96 mb-5 rounded-md bg-zinc-900 flex items-center px-4 gap-4'>
              <img src={artist.img} alt="" className='h-20 w-20 rounded-full'/>
              <div>
                <h1 className=' text-base font-semibold'>Artist</h1>
                <h1 className=' text-xl font-bold hover:underline cursor-pointer'><Link >{capital(artist?.name)}</Link></h1>
              </div>
            </Link>
          ))}

        </aside>
      </section>
            
      {/* {artists.map((artist,ind)=>( */}

        <RecAlbam songIds={artistSongs} title={artists[0]?.name}/>
      {/* ))} */}

      {/* <Category /> */}
    </main>
  )
}

export default SongRoom