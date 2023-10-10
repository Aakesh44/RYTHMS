import React, { useContext, useEffect, useRef, useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {BsHeart,BsThreeDots,BsMusicNote,BsFillPlayFill} from 'react-icons/bs'

import song from '../images/song.jpg'
import DataContext from '../context/DataContext'
const NowPlaying = ({setNowSize}) => {

  const {nowPlayView,setNowPlayView} = useContext(DataContext)

  // const [display,setDisplay] = useState(true)

  const [queueHover,setQueueHover] =useState(false)

  const [nowWidth,setNowWidth] =useState(288)
  const nowPlay = useRef(null)

  useEffect(()=>{
    const nowCurr = nowPlay.current

    if(nowCurr){
      const resize = new ResizeObserver(entries=>{
        for (const entry of entries) {
          if(entry.target === nowCurr){
            setNowWidth(Math.floor(entry.contentRect.width))
            setNowSize(nowWidth)
          }
        }
      })

      resize.observe(nowCurr)

      return ()=>{
        resize.unobserve(nowCurr)
      }
    }
  },[nowWidth])
  return (
    <main 
    ref={nowPlay}
    style={{minHeight:'88vh',}} 
    className={`w-72 p-4 bg-black h-full flex-col gap-4 hidden xl:${!nowPlayView ? 'hidden' : 'flex'}`}>
      
      <header className='flex items-center justify-between'>
        <h1 className=' text-lg font-semibold Textwhite'>Pookkal Pookkum</h1>
        <AiOutlineClose onClick={()=>setNowPlayView(!nowPlayView)} className='h-5 w-5 Textgrey cursor-pointer'/>
      </header>

      <section className=' aspect-square'>
        <img src={song} alt="" className='w-full h-full rounded-xl' />
      </section>

      <section className='  w-full flex items-center justify-between'>

        <aside className=' w-4/5'>
          <h1 style={{overflow:'hidden',textOverflow:'ellipsis',maxWidth:'98%',whiteSpace:"nowrap"}} className='mb-2 text-2xl font-bold Textwhite cursor-pointer hover:underline'>Enna Solla Pogirai</h1>
          <h1 style={{overflow:'hidden',textOverflow:'ellipsis',maxWidth:'98%',whiteSpace:"nowrap"}} className=' text-base font-semibold Textgrey cursor-pointer hover:text-white hover:underline'>Shanker mahadev</h1>
        </aside>

        <aside className='w-1/5  flex items-center justify-center gap-2 '>
          <BsHeart     className=' h-4 w-4 cursor-pointer Textgrey hover:text-white'/>
          <BsThreeDots className=' h-4 w-4 cursor-pointer Textgrey hover:text-white'/>
        </aside>

      </section>

      <section style={{backgroundColor:'#232222'}} className='w-full  h-32 mt-1 p-3 rounded-md flex flex-col items-center justify-between'>

        <header className='flex w-full items-center justify-between'>
          <h1 className=' Textwhite text-base font-bold'>Next in queue</h1>
          <h1 className=' Textgrey text-sm font-bold cursor-pointer hover:text-white hover:underline hover:scale-105'>Open queue</h1>
        </header>

        <aside 
        onMouseEnter={()=>setQueueHover(true)}
        onMouseLeave={()=>setQueueHover(false)}
        style={{gridTemplateColumns:'1fr 2fr 5fr',backgroundColor:queueHover && '#414040'}} 
        className=' grid items-center w-full p-2 rounded-md BgTest'>
          {
            queueHover ? <BsFillPlayFill className='Textwhite h-5 w-5'/> : <BsMusicNote className=' Textgrey'/>
          }

          <img src={song} alt="" className='h-11 w-11 rounded-sm'/>
          <div>
            <h1 style={{overflow:'hidden',textOverflow:'ellipsis',maxWidth:'98%',whiteSpace:"nowrap"}} className=' text-base font-semibold Textwhite cursor-pointer hover:underline'>En kadhal solla</h1>
            <h1 style={{overflow:'hidden',textOverflow:'ellipsis',maxWidth:'98%',whiteSpace:"nowrap"}} className=' text-sm font-semibold Textgrey cursor-pointer hover:text-white hover:underline'>Yuvan shankar Raja</h1>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default NowPlaying