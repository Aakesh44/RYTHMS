import React, { useContext, useEffect, useState } from 'react'
import leo from '../images/leo.jpg'

import {BsHeart,BsFillHeartFill,BsThreeDots,BsFillPlayFill} from 'react-icons/bs'
import {BiTime,BiSolidPlaylist} from 'react-icons/bi'
import {MdOutlineCreateNewFolder} from 'react-icons/md'
import QueueMenu from './QueueMenu'
import DataContext from '../context/DataContext'
import { Link } from 'react-router-dom'

const RecAlbam = ({songIds,cat,title,myPlaylist,playlistid}) => {

    const {homeWidth,allSongs,allArtists,allPlaylists,mainUser,handleLikeSong,handleDisLikeSong,handlePullToPlaylist,handlePushToPlaylist,handleCreatePlaylist} = useContext(DataContext)
    // console.log(songIds);

    const songList = songIds.map(Id => allSongs.find(n=>n._id === Id))

    // console.log(songList);

    const [hover,setHover] = useState(null)

    const handleArtist=(id)=>{
        const artist = allArtists.find(n=> n._id === id)
        return artist.name
    }

    const [menu,setMenu] = useState(null)
    const [show,setShow] = useState(false)

    const [like,setLike] = useState(null)

    function barHover(id){
        setLike(mainUser.likedSongs.includes(id))
        // console.log(like);
    }

    function handleHeart(id){

        if(!like){
          handleLikeSong(id)
        }
        else{
          handleDisLikeSong(id)
        }
        setLike(!like)
    }

    const [addToPlaylist,setAddToPlaylist] = useState(false)

    const myPlaylists = allPlaylists.filter(playlist => playlist.artist === mainUser._id)

  return (
    <main className='w-full px-8  mt-8'>

        <header 
        style={{display:title && 'none' ,gridTemplateColumns:cat==='album' ? '5fr 1fr': homeWidth > 800 ? '3fr  1fr 0.5fr' :homeWidth > 550 ? '3fr 2fr 1fr':'3fr 1fr'}}
        className=' grid items-center Textgrey  text-sm font-semibold  h-10 border-b border-gray-500 bg-blu e-200'>
            <span className='flex gap-4 text-sm items-center p-2  w-fit'>
                <h1 className='w-5'>#</h1>
                <h1>Title</h1>
            </span>
            <h1 style={{display: cat==='album' ? 'none': homeWidth < 800 ?'none':'block'}} className=''>Release Date </h1>
            <span style={{minWidth:'110px'}} className='flex justify-center w-full'><BiTime className='w-5 h-5 ml-auto mr-12'/></span>
        </header>
        <header style={{display:!title && 'none'}}>
            <h1 className=' text-base sm:text-lg font-semibold Textgrey'>Popular Tracks by</h1>
            <h1 className=' text-3xl sm:text-4xl font-semibold mb-8'>{title}</h1>
        </header>
    
        {songList.map((song,ind)=>(
            <div key={song._id}>
                <section 

                onMouseEnter={()=>{setHover(ind);barHover(song._id)}}
                onMouseLeave={()=>setHover(null)}

                style={{gridTemplateColumns:cat==='album' ? '5fr 1fr': homeWidth > 800 ? '3fr  1fr 0.5fr' :homeWidth > 550 ? '3fr 1fr 1fr':'3fr 1fr',
                backgroundColor:hover === ind && '#363636af'
            }} 
                className='w-full h-16 grid items-center Textgrey hover:text-white'>

                <div   className='w-full h-14 overflow-hidden p-2 flex items-center justify-start gap-4 '>
                    <h1 className=' w-5'>{ind+1}</h1>
                    <Link to={`/track/${song._id}`} style={{backgroundImage:`url(${song?.img})`}} className='h-10 w-10 aspect-square bg-cover bg-center bg-no-repeat relative'>
                        {hover === ind && <span style={{backgroundColor:'#3f3e3e2f'}} className=' absolute w-10 h-10 inset-0 Flex cursor-pointer'><BsFillPlayFill className='h-6 w-6 Textwhite'/></span>}
                    </Link>
                    <div className='w-full overflow-hidden'>
                        <Link to={`/track/${song._id}`} className='w-fit font-semibold Textwhite cursor-pointer hover:underline overflow-hidden whitespace-nowrap'>{song.title}</Link>

                        <h1 
                            style={{textOverflow:'ellipsis',maxWidth:homeWidth > 1000 ? '500px':homeWidth > 700 ? '300px':'200px',overflow:'hidden',whiteSpace:'nowrap',fontWeight:'500',fontSize:'14px',lineHeight:'20px'}} 
                            className='flex '>
                            
                            {song.artist.map((n,i)=>( <Link to={`/artist/${song.artist[i]}`} key={i} className='mr-2 hover:underline cursor-pointer'>{`${handleArtist(song.artist[i])} `} </Link>) )}
                            
                        </h1>

                    </div>
                </div>

                <aside style={{display: cat==='album' ? 'none':homeWidth < 800 ? 'none' : 'block'}} className=' text-sm font-semibold'>
                    <h1>{song.release}</h1>
                </aside>
            
                <aside className='w-full h-full flex justify-end items-center pr-3 gap-5'>
                    {
                        like ? 

                        <BsFillHeartFill onClick={()=>handleHeart(song._id)}
                        style={{visibility:hover === ind ? 'visible' : 'hidden'}}
                         className=' text-green-500 cursor-pointer'/>:
                         <BsHeart 
                         onClick={()=>handleHeart(song._id)}
                         style={{visibility:hover === ind ? 'visible' : 'hidden'}}
                          className=' Textgrey hover:text-white cursor-pointer'/>
                    }

                    <h1 className='text-sm  font-semibold'>{song.duration}</h1>
                    <span className=' relative'>
                        <BsThreeDots 
                        onClick={()=>{setMenu(ind);setShow(!show)}}
                        style={{visibility:hover === ind ? 'visible' : 'hidden'}} 
                        className=' Textgrey hover:text-white cursor-pointer'/>
                        {
                            (menu === ind && show && !myPlaylist)  ? 
                                <QueueMenu songId={song._id}/> :
                            (menu === ind && show) && 

                            <div style={{minWidth:'210px',maxHeight:'180px',gridTemplateRows:'repeat(4,1fr)',right:'150px',left:'-210px'}} className='Playlistsort Textgrey' >
                                <h1 
                                onMouseEnter={()=>setAddToPlaylist(true)}
                                onMouseLeave={()=>setAddToPlaylist(false)}
                                className='cursor-pointer  Flex border-b border-b-gray-600 text-gray-200 hover:text-white'>
                                    Add to playlist
                                    {addToPlaylist && 
                                        <span style={{backgroundColor:'#282828',gridTemplateRows:`repeat(${myPlaylists?.length+1},1fr)`,top:'5px',right:'99%',height:`${myPlaylists?.length*3}rem`}} className=' cursor-default grid p-2 absolute w-48 h-32 top-0 right-full shadow-2xl Textwhite'>
                                            <h1 onClick={handleCreatePlaylist} className='flex items-center justify-between cursor-pointer'>create playlist <MdOutlineCreateNewFolder className='h-5 w-5'/></h1>
                                            {myPlaylists.map(n => (
                                                <h1 onClick={()=>handlePushToPlaylist(n._id,song._id)} className=' Textgrey hover:text-white flex items-center justify-between'>{n.title}<BiSolidPlaylist className='h-5 w-5'/></h1>
                                            ))}        
                                        </span>
                                    }
                                </h1>

                                <h1 onClick={()=>handlePullToPlaylist(playlistid,song._id)} className=' cursor-pointer  Flex border-b border-b-gray-600 text-gray-200 hover:text-white'>Remove from this playlist</h1>
                                <h1 className=' cursor-pointer  Flex text-gray-200 hover:text-white'>Add to queue</h1>
                                <h1 className=' cursor-pointer border-t border-t-gray-600 Flex text-gray-200 hover:text-white'>Share</h1>
                            </div>
                        }
                        
                    </span>
                </aside>


                </section>
            </div>
    ))}



    </main>
  )
}

export default RecAlbam