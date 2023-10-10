import React, { useContext, useEffect, useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {BsHeart,BsFillHeartFill,BsThreeDots,BsSearch,BsPencilFill,BsFillPlayFill} from 'react-icons/bs'
import RecAlbam from './RecAlbam'
import ThreeDotMenu from './ThreeDotMenu'
import DataContext from '../context/DataContext'
import { Link, useParams } from 'react-router-dom'
const PlaylistRoom = () => {

const {homeWidth,allPlaylists,allProfiles,allArtists,allSongs,capital,mainUser,handleLikePlaylist,handleDislikePlaylist,handleDeletePlaylist,handleEditPlaylist,handlePushToPlaylist,updateList} = useContext(DataContext)
const [DotMenu,setDotMenu] = useState(false)
const [editPage,setEditPage] =useState(false)
const [editImg,setEditImg] = useState(false)

const id = useParams().id

const playlist = allPlaylists.find(n=> n._id === id)
// console.log(playlist);

const artist = allProfiles.find(n=> n._id === playlist.artist)
// console.log(playlist.artist);

const [myPlaylist,setMyPlaylist] = useState(artist?._id === mainUser._id)
// console.log(artist._id)
// console.log(mainUser._id)
// console.log(myPlaylist);

useEffect(()=>{
  setMyPlaylist(artist?._id === mainUser._id)
},[artist?._id,mainUser._id])

const duration = allSongs.filter(n=> playlist.songs.includes(n._id)).reduce((a,b)=> a+ parseInt(b.duration) ,0)

const [like,setLike] = useState(mainUser.likedPlaylists?.includes(id))

function handleHeart(){
  if(!like){
    handleLikePlaylist(id)
  }
  else{
    handleDislikePlaylist(id)
  }
  setLike(!like)
}

const [newTitle,setNewTitle] = useState(playlist?.title)

const [searchOpen,setSearchOpen] =useState(true)
useEffect(()=>{
  if(searchOpen === false){
    setSearchOpen(true)
  }
},[id])

const [searchQuery,setSearchQuery] = useState('')
const [searchSongs,setSearchSongs] = useState([])

const handleArtist=(id)=>{
  const artist = allArtists.find(n=> n._id === id)
  return artist.name
}

const handleSearchSongs = () =>{
  setSearchSongs(allSongs.filter(song=>song.title.split(" ").join("").toLowerCase().trim().includes(searchQuery.toLowerCase().trim()) ).slice(0,15))
}

useEffect(()=>{
  handleSearchSongs()
},[searchQuery])

const [hover,setHover] =useState(null)

const createdAt = playlist?.createAt;

const dateObject = new Date(createdAt);

const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

const formattedDate = dateObject.toLocaleDateString('en-US', options);

// console.log(formattedDate);
return (
    <main className='w-full rounded-md mb-16 sm:mb-0'>

      <section className='RoomsHeight bg-black p-4 flex items-end rounded-t-md overflow-hidden'>

        <aside onMouseEnter={()=>setEditImg(!editImg)} onMouseLeave={()=>setEditImg(!editImg)} className=' w-fit h-fit relative mr-4 shadow-2xl'>
          <img src={playlist?.img} alt="" 
            style={{transform:'scale(1.0)',transition:'transform 0.4s ease',minHeight:'128px',minWidth:'128px'}}
            onMouseEnter={(e)=> { if(e.target && !myPlaylist) e.target.style.transform = 'scale(1.02)'}}
            onMouseLeave={(e)=> { if(e.target && !myPlaylist) e.target.style.transform = 'scale(1.00)'}}
            className=' aspect-square h-32 w-32 sm:h-48 sm:w-48 xl:h-60 xl:w-60 cursor-pointer duration-200' />
          {
              (editImg && myPlaylist) && <span className='h-48 w-48 xl:h-60 xl:w-60 inset-0 Flex flex-col gap-4 imgBg absolute cursor-pointer'><BsPencilFill className='h-7 w-7 '/><h1>Choose photo</h1></span>
          }
        </aside>

        <aside className=''>
          <h1 className=' text-sm '>Playlist</h1>
          <h1 onClick={()=>{myPlaylist && setEditPage(!editPage)}} style={{fontSize:homeWidth > 1300 ? '70px' :homeWidth > 1100 ? '50px':homeWidth > 500 ?'30px':'24px',cursor:myPlaylist && 'pointer'}} className='font-bold '>{capital(playlist?.title)}</h1>
          <h1 className=' text-xs sm:text-sm font-semibold flex gap-2 overflow-hidden max-h-10'>
            <Link to={`/profile/${artist?._id}`} className=' cursor-pointer hover:underline whitespace-nowrap'>{capital(artist?.name)}</Link> 
            {playlist?.songs.length > 0 &&
            <p className='flex gap-1 sm:gap-2 overflow-hidden whitespace-nowrap overflow-ellipsis'>
              <span>•</span>
              <span className=' whitespace-nowrap'>{playlist?.likes} likes</span>
              <span>•</span>
              <span className=' whitespace-nowrap'>{playlist?.songs.length} songs</span>
              <span>•</span>
              <span className=' whitespace-nowrap'>{duration} mins</span>
              <span>•</span>
              <span>{formattedDate}</span>
              </p>}
          </h1>
        </aside>

      </section>

      <section className='w-full p-4 my-5 h-20 flex items-center'>
        
        {playlist?.songs.length > 0 && 
          <div onClick={()=>updateList(playlist?.songs)} className=' Flex h-14 w-14 mr-7 hover:scale-105 cursor-pointer bg-green-500 rounded-full outline-none shadow-none'>
            <BsFillPlayFill className='h-9 w-9 text-black'/>
          </div>
        }

        { !myPlaylist && <> {like ? <BsFillHeartFill onClick={handleHeart} className=' h-8 w-8 mr-7 cursor-pointer text-green-500 '/> : <BsHeart onClick={handleHeart}  className=' h-8 w-8 mr-7 cursor-pointer Textgrey hover:text-white '/>} </>  }

        <span className=' relative'>
          <BsThreeDots 
          onClick={()=>setDotMenu(!DotMenu)}
          className=' h-7 w-7 cursor-pointer Textgrey hover:text-white'/>
          {
            (DotMenu && !myPlaylist )   ?      <ThreeDotMenu playlistId={id}/>:
             (DotMenu && myPlaylist) && 
            <div style={{minWidth:'210px',maxHeight:'140px',gridTemplateRows:'repeat(3,1fr)'}} className='Playlistsort' >

              <h1 onClick={()=>handleDeletePlaylist(id)} className=' cursor-pointer  Flex border-b border-b-gray-600'>delete the playlist</h1>
              <h1 onClick={()=>{setEditPage(!editPage);setDotMenu(false)}} className=' cursor-pointer border-b border-b-gray-600 Flex'>Edit details</h1>
              <h1 className=' cursor-pointer Flex'>Share</h1>
            </div>
          }

        </span>

      </section>

      {playlist?.songs.length > 0 &&  <RecAlbam songIds = {playlist?.songs} cat='playlist' myPlaylist={myPlaylist} playlistid = {playlist?._id}/> }

      {(searchOpen && myPlaylist) &&
        <main>
          <section className=' h-28 w-full flex justify-between items-center p-4'>
            <div style={{width:'25rem'}} className=' flex flex-col gap-5 justify-around h-full'>
              <h1 className=' text-xl font-bold'>Let's find something for your playlist</h1>

              <div className=' flex h-10 p-2 w-full gap-1 bg-slate-800'>
                <BsSearch className='h-6 w-6 cursor-text'/>
                <input type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}  placeholder='Search for songs' className='w-full h-7 outline-none text-gray-300 bg-transparent font-semibold placeholder:text-sm'/>
                <AiOutlineClose className='h-6 w-6 cursor-pointer'/>
              </div>

            </div>
            <AiOutlineClose onClick={()=>setSearchOpen(false)} className=' mx-5 h-6 w-6 cursor-pointer'/>
          </section>


          <section className=' w-full h-fit p-4 '>

            { searchSongs.length > 0 ? searchSongs.map((song,ind)=>(
              <div key={ind} className=' h-14 p-2 flex' onMouseEnter={()=>setHover(ind)} onMouseLeave={()=>setHover(null)} style={{backgroundColor:hover === ind && '#383836af'}}>
                <img src={song.img} alt="" className='h-full aspect-square bg-black'/>
                <aside className=' h-full flex flex-col justify-between w-32  ml-5'>
                  <h1 style={{textOverflow:'ellipsis'}} className=' text-sm font-semibold whitespace-nowrap overflow-hidden'>{song.title}</h1>
                  <h1 style={{textOverflow:'ellipsis'}} className=' text-xs font-semibold whitespace-nowrap overflow-hidden'>{handleArtist(song.artist[0])}</h1>
                </aside>

                <button onClick={()=>handlePushToPlaylist(playlist._id,song._id)} className=' ml-auto mx-5  px-4 border border-white rounded-full'>
                  Add
                </button>

              </div>  
            )):
              <div className=' w-full h-96 flex flex-col justify-center items-center'>
                <h1 className=' text-xl font-semibold'>{`No results found for "${searchQuery}"`}</h1>
                <h1 className=' text-base text-gray-500'>Please make sure your words are spelled correctly, or use fewer or different keywords.</h1>
              </div>
            }


          </section>
        </main>
      }
      { editPage && 
        <main className='blurk fixed inset-0 z-10 Flex'>
        <section style={{width:'550px',height:'330px'}} className='edit rounded-md p-5 flex flex-col justify-between'>
            
            <header className=' flex justify-between items-center text-lg'>
              <h1>Edit details</h1>
              <AiOutlineClose onClick={()=>{setEditPage(!editPage)}} className=' cursor-pointer'/>
            </header>

            <section className=' w-full flex items-center justify-between gap-4'>
              <div onMouseEnter={()=>setEditImg(!editImg)} onMouseLeave={()=>setEditImg(!editImg)} className=' w-44 h-44 rounded-full relative'>

                <img src={playlist.img} alt="" className=' w-full h-full ' />
                {
                  editImg && <span className='w-44 h-44 inset-0 Flex flex-col gap-4 imgBg absolute cursor-pointer'><BsPencilFill className='h-7 w-7 '/><h1>Choose photo</h1></span>
                }
                
              </div>

              <div className=' flex flex-col '>
                <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} className=' bg-gray-800 w-64 py-2 px-2'/>
                <button onClick={()=>{handleEditPlaylist(playlist._id,newTitle);setEditPage(false)}} className=' ml-auto py-3 px-8 rounded-full bg-white text-black font-semibold mt-2'>Save</button>
              </div>

            </section>
            <div className=' text-xs'>
                <h1>By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</h1>
              </div>
        </section>
        </main>
      }

    </main>
  )
}

export default PlaylistRoom