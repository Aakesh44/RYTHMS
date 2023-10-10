import React, { useContext, useState } from 'react'
import leo from '../images/leo.jpg'
import { Link } from 'react-router-dom'
import {BsHeart,BsFillHeartFill,BsThreeDots,BsFillPlayFill} from 'react-icons/bs'
import DataContext from '../context/DataContext'
import QueueMenu from './QueueMenu'

const Recommended = ({searchSongs}) => {

    const {homeSearch,homeWidth,allArtists,mainUser,handleLikeSong,handleDisLikeSong}= useContext(DataContext)

     
    const handleArtist=(id)=>{
        const artist = allArtists.find(n=> n._id === id)
        return artist.name
    }


    const [hover,setHover] = useState(null)

    const [menu,setMenu]=useState(false)
    const [show,setShow] = useState(null)

    const [like,setLike] = useState(null)

    function barHover(id){
        setLike(mainUser?.likedSongs?.includes(id))
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

  return (
    <main className='w-full p-4 mb-4'>

    <header className='h-20'>
        <h1 className='text-3xl font-bold Textwhite'>Songs</h1>
        {/* <h1 className=' text-sm font-semibold Textgrey'>Based on this leo</h1> */}
    </header>
    
    {searchSongs.map((song,ind)=>(
        <div key={song._id}>
            <section 

            onMouseEnter={()=>{setHover(ind);barHover(song._id)}}
            onMouseLeave={()=>setHover(null)}

            style={{gridTemplateColumns:homeWidth > 600 ? '3fr 1fr 1fr' : '2fr 1fr',backgroundColor:hover === ind && '#363636af'}} 
            className='w-full h-16 grid items-center Textgrey hover:text-white'>

            <aside  className='w-full h-14  overflow-hidden p-2 flex items-center justify-start gap-4 '>
                <div className='h-10 w-10 aspect-square relative'>
                    <img src={song.img} alt="" className='h-10 aspect-square w-10 '/>
                    {hover === ind && <span style={{backgroundColor:'#3f3e3e2f'}} className=' absolute w-10 h-10 inset-0 Flex cursor-pointer'><BsFillPlayFill className='h-6 w-6 Textwhite'/></span>}
                </div>
                <div className='w-full'>
                    <Link to={`/track/${song._id}`} className='w-fit font-semibold Textwhite cursor-pointer hover:underline'>{song.title}</Link>

                    <h1 
                        style={{textOverflow:'ellipsis',maxWidth:homeWidth > 1000 ? '500px':homeWidth > 700 ? '300px':'200px',overflow:'hidden',whiteSpace:'nowrap'}} 
                        className='w-fit  text-sm font-semibold'>
                        {song.artist.map((n,i)=>( <Link to={`/artist/${song.artist[i]}`} key={i} className='mr-2 hover:underline cursor-pointer'>{`${handleArtist(song.artist[i])} `} </Link>) )}
                    </h1>

                </div>
            </aside>

            <aside style={{display: homeSearch.startsWith('/search') ? 'none' : homeWidth < 600 ? 'none':'block',}}>
                <h1 className=' text-base font-semibold '>7679332</h1>
            </aside>
        
            <aside className='w-full h-full flex justify-end items-center pr-3 gap-5'>
                {
                    like    ?
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
                    (menu === ind && show) && <QueueMenu/>
                }
                </span>
            </aside>


            </section>
        </div>
    ))}



    </main>
  )
}

export default Recommended