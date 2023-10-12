import React, { useContext, useEffect, useRef, useState } from 'react'
import '../css/ControllBar.css'
import logo from '../images/logo.png'

import { AiOutlineHeart,AiOutlineCamera,AiOutlinePlaySquare, AiFillSound } from "react-icons/ai";
import { BiShuffle,BiSkipPrevious,BiSkipNext,BiRepeat,BiDevices,BiSolidVolumeMute} from "react-icons/bi";
import { TbMicrophone2 } from "react-icons/tb";
import { HiPlay,HiPause} from "react-icons/hi";
import { HiOutlineQueueList} from "react-icons/hi2";
import { Link } from 'react-router-dom';
import DataContext from '../context/DataContext';


const ControlBar = () => {

  const {userData,curSongIds,setCurSongIds,curIndex,setCurIndex,curSongI,allArtists,allSongs,nowPlayView,setNowPlayView} = useContext(DataContext)


  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat,setIsRepeat] = useState(false)


  const playPrevious = () =>{
    setCurIndex((prev)=> prev === 0 ? curSongIds.length-1 : prev-1)
    // setCurSong(curSongIds[curIndex])
    // console.log(curIndex);
    // console.log(curSong);
  }

  const playNext = () =>{
    setCurIndex((prev)=> prev === curSongIds.length-1 ? 0 : prev + 1)
    // setCurSong(curSongIds[curIndex])
    // console.log(curIndex);
    // console.log(curSong);s
  }

  const toggleShuffle = () =>{

    if(!isShuffle){
      let shuffedArr = [...curSongIds]
      for (let i = curSongIds.length -1; i>0 ; i--) {
        const j = Math.floor( Math.random() * (i+1) )

        const temp = shuffedArr[i]
        shuffedArr[i] = shuffedArr[j]
        shuffedArr[j] = temp
      }
      
      setCurSongIds(shuffedArr) 
      setCurIndex(0)
      // console.log(curSongIds);
    }

    setIsShuffle(!isShuffle)

  }

  const toggleRepeat = () =>{
    setIsRepeat(!isRepeat)
  }




  const artist = allArtists.find(n=> curSongI?.artist[0] === n._id)
  // console.log(artist);
  // console.log());

  const [hoverIcon,setHoverIcon] =useState(null)

  const handleiconhover = (text) =>{
    setHoverIcon(text)
  }

  const handleiconleave = ()=>{
    setHoverIcon(null)
  }


  const [soundProgress,setsoundProgess] = useState(100)
  const [soundClr,setsoundClr] = useState('White')
  const [soundball,setSoundBall] =useState(false)
  const [play,setPlay] =useState(true)
  const [sound,setsound] = useState(true)

  const handlesoundBar = (e) =>{
    const bar = e.currentTarget 
    const clickPosition = e.clientX - bar.getBoundingClientRect().left 
    const totalWidth = bar.offsetWidth 
    const newProgress = (clickPosition / totalWidth) *100

    setsoundProgess(newProgress)
  }

  const songRef = useRef()
  const volumeRef = useRef()
  const curRef = useRef()
  const durRef = useRef()

  const handleSong = () =>{
    if(songRef.current.paused){
      songRef.current.play()
    }
    else{
      songRef.current.pause()
    }
  }
  const [timeProgress,setTimeProgess] = useState(1)
  const [timeClr,setTimeClr] = useState('White')
  const [timeball,setTimeball] =useState(false)

  const handleTime = () =>{
    setTimeProgess(`${(songRef.current.currentTime/songRef.current.duration)*100}`)
  }
  const handleTimeBar = (e) =>{
    const bar = e.currentTarget 
    const clickPosition = e.clientX - bar.getBoundingClientRect().left 
    const totalWidth = bar.offsetWidth 
    const newProgress = (clickPosition / totalWidth) * songRef.current.duration

    songRef.current.currentTime = newProgress
    setTimeProgess(newProgress)
  }

  const handleDuration = () =>{

    if(!songRef.current || isNaN(songRef.current.duration)) {
      curRef.current.textContent= '00:00'
      durRef.current.textContent = '00:00'
    }
    else{
      const curMin = Math.floor(songRef.current?.currentTime/60)
      const curSec = Math.floor(songRef.current?.currentTime % 60)
      const durMin = Math.floor(songRef.current?.duration/60);
      const durSec = Math.floor(songRef.current?.duration % 60);
  
      curRef.current.textContent = `${curMin}:${curSec < 10 ? 0 : ''}${curSec}`
      durRef.current.textContent = `${durMin}:${durSec < 10 ? 0 : ''}${durSec}`
    }

    if(songRef.current.currentTime/60 == songRef.current.currentTime/60 && songRef.current.currentTime % 60 == songRef.current.duration % 60){
      // songRef.current.pause()

      if(isRepeat){
        setCurIndex(prev=>prev)
        songRef.current.play()
      }
      else{
        playNext()
        setPlay(true)
      }
    }
  }

  const handleSound = () =>{
    
    if(sound){
      songRef.current.volume = 0
    }
    else{
      songRef.current.volume =(soundProgress/1000).toFixed(2)
    }
    setsound(!sound)

  }

  const handleVolume = () =>{
    songRef.current.volume =(soundProgress/1000).toFixed(2)
    if(songRef.current.volume === 0){
      setsound(false)
    }else{
      setsound(true)
    }
    // console.log(soundProgress);
    // console.log((soundProgress / 100).toFixed(2))
  }


  async function LoadAudio(link) {
    if(songRef.current && link){

      songRef.current.src = link 
      await songRef.current.load()
      // if(songRef.current.paused) songRef.current.play()

    }
  }

 useEffect(()=>{
  // setCurAudio(curSongI?.link)

  if(curSongI?.link) {
    LoadAudio(curSongI?.link)
  }
 

 },[curSongI?.link])

 const handlePlay =()=>{
  if(songRef.current.paused && play){
    songRef.current.play().catch((e)=>{
      console.log(e);
    })
  }
 }

  return (
    <main style={{gridTemplateColumns:userData ? '1fr 1.5fr 1fr' : '1fr'}} className='ControllBar select-none hidden md:flex'>


    {userData ?
    
    <>

      <section className='section1 Black  flex mx-3 '>
      
      {(curSongI?.link) ? 
        <article className='Flex  h-full mr-auto gap-3'>

          <div style={{backgroundImage:`url(${curSongI?.img})`}} className='h-16 w-16 bg-cover bg-no-repeat overflow-hidden bg-white rounded-md'></div>
          
          <div className=' w-32 overflow-hidden'>
            <h1 className=' Textwhite font-semibold hover:underline cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis'>
              {curSongI?.title}
              </h1>
            <h1 className=' Textgrey text-xs hover:underline cursor-pointer'>{artist?.name}</h1>
          </div>


        <aside className='heart  w-fit Flex gap-3'>
          <span 
            className=' relative'
            onMouseEnter={()=>handleiconhover('Save to your library')}
            onMouseLeave={handleiconleave}>
            <AiOutlineHeart  className='icons'/>
            {hoverIcon ==='Save to your library' &&
              <h1 className=' h-fit min-w-fit Textwhite text-sm absolute -top-12 Bgblack p-1 px-2 transition rounded-md font-semibold left-1/2 transform -translate-x-1/2 whitespace-nowrap'>{hoverIcon}</h1>
            } 
          </span>

          <span 
            className=' relative'
            onMouseEnter={()=>handleiconhover('Picture in picture')}
            onMouseLeave={handleiconleave}>
            <AiOutlineCamera  className='icons'/>
            {hoverIcon === 'Picture in picture' &&
              <h1 className=' h-fit min-w-fit Textwhite text-sm absolute -top-12 Bgblack p-1 px-2 transition rounded-md font-semibold left-1/2 transform -translate-x-1/2 whitespace-nowrap'>{hoverIcon}</h1>
            } 
          </span>

        </aside>
        </article>:

        <article className='Flex h-full mr-auto Textwhite'>
          <div style={{backgroundImage:`url(${logo})`}} className='h-16 w-16 bg-cover bg-no-repeat overflow-hidden bg-transparent rounded-md'></div>

          <h1 className='text-sm mx-5 font-semibold truncate'>Enjoy your music now in RYTHMS</h1>
        </article>
      }

      </section>

      <section className='controllsection2 Black '>

      <aside className='Flex h-3/5 gap-3  w-full'>
        <span 
          className=' relative'
          onMouseEnter={()=>handleiconhover('Enable suffle')}
          onMouseLeave={handleiconleave}
          onClick={()=>toggleShuffle()}>
          <BiShuffle style={{color:isShuffle && '#3fe379'}}   className='shuffle icons'/>
          {hoverIcon === 'Enable suffle' &&
            <h1 className=' h-fit min-w-fit Textwhite text-sm absolute -top-12 Bgblack p-1 px-2 transition rounded-md font-semibold left-1/2 transform -translate-x-1/2 whitespace-nowrap'>{hoverIcon}</h1>
          } 
        </span>
        
        <span 
          className=' relative'
          onMouseEnter={()=>handleiconhover('Previous')}
          onMouseLeave={handleiconleave}
          onClick={playPrevious}>
          <BiSkipPrevious  className='sec2icons'/>
          {hoverIcon === 'Previous' &&
            <h1 className=' h-fit min-w-fit Textwhite text-sm absolute -top-12 Bgblack p-1 px-2 transition rounded-md font-semibold left-1/2 transform -translate-x-1/2 whitespace-nowrap'>{hoverIcon}</h1>
          } 
        </span>

        <span 
          className=' relative'
          onClick={curSongI && handleSong}
          // onTimeUpdate={}
          onMouseEnter={()=>handleiconhover( songRef.current?.paused ? 'Play' : 'Pause')}
          onMouseLeave={handleiconleave}>
          {songRef.current?.paused ? 
            <HiPlay onClick={()=>setPlay(!play)} className='h-12 w-12 Textwhite' />
          :<HiPause onClick={()=>setPlay(!play)} className='h-12 w-12 Textwhite' />}
          
          {(hoverIcon === 'Pause' || hoverIcon === 'Play')  &&
            <h1 className=' h-fit min-w-fit Textwhite text-sm absolute -top-12 Bgblack p-1 px-2 transition rounded-md font-semibold left-1/2 transform -translate-x-1/2 whitespace-nowrap'>{hoverIcon}</h1>
          } 

          <audio ref={songRef} onCanPlayThrough={handlePlay} onError={(e)=>console.log('error :',e)} onTimeUpdate={()=>{handleTime();handleDuration()}} id='curSong'>
          </audio>
            {/* {curSongAudio && <source src={curSongAudio} type='audio/mpeg'></source> } */}

        </span>

        <span 
          className=' relative'
          onMouseEnter={()=>handleiconhover('Next')}
          onMouseLeave={handleiconleave}
          onClick={playNext}>
          <BiSkipNext  className='sec2icons'/>
          {hoverIcon === 'Next' &&
            <h1 className=' h-fit min-w-fit Textwhite text-sm absolute -top-12 Bgblack p-1 px-2 transition rounded-md font-semibold left-1/2 transform -translate-x-1/2 whitespace-nowrap'>{hoverIcon}</h1>
          } 
        </span>
        <span 
          className=' relative'
          onClick={toggleRepeat}
          onMouseEnter={()=>handleiconhover('Enable repeat')}
          onMouseLeave={handleiconleave}>
          <BiRepeat  className={` ${isRepeat ? 'text-green-400' : 'text-gray-200'}`}/>
          {hoverIcon === 'Enable repeat' &&
            <h1 className=' h-fit min-w-fit Textwhite text-sm absolute -top-12 Bgblack p-1 px-2 transition rounded-md font-semibold left-1/2 transform -translate-x-1/2 whitespace-nowrap'>{hoverIcon}</h1>
          } 
        </span>
      </aside>

      <aside className='h-2/5 Flex gap-3 w-full text-xs font-semibold text-gray-400'>
          <h1 ref={curRef}></h1>
          <div className='timebar'  onClick={handleTimeBar} onMouseEnter={()=>{setTimeClr('#1db954');setTimeball(!timeball)}}onMouseLeave={()=>{setTimeClr('White');setTimeball(!timeball)}}>
            <span className='timetrack' style={{width:`${timeProgress}%`,backgroundColor:`${timeClr}`}}>
              {timeball &&
                <div className='timeball'></div>
              }
            </span>
          </div>
          <h1 ref={durRef}></h1>
      </aside>

      </section>
      <section className='controllsection3 Black  Flex mx-3'>

      <aside className='controllsection3aside flex items-center justify-center lg:justify-between'>

        <span 
          className=' relative hidden lg:block'
          onClick={()=>setNowPlayView(!nowPlayView)}
          onMouseEnter={()=>handleiconhover('Now playing view')}
          onMouseLeave={handleiconleave}>
          <AiOutlinePlaySquare  className='icons h-3 w-3 lg:h-5 lg:w-5'/>
          {hoverIcon === 'Now playing view' &&
            <h1 className=' h-fit min-w-fit Textwhite text-sm absolute -top-12 Bgblack p-1 px-2 transition rounded-md font-semibold left-1/2 transform -translate-x-1/2 whitespace-nowrap'>{hoverIcon}</h1>
          } 
        </span>
        <span 
          className=' relative hidden lg:block'
          onMouseEnter={()=>handleiconhover('Lyrics')}
          onMouseLeave={handleiconleave}>
          <TbMicrophone2  className='icons h-3 w-3 lg:h-5 lg:w-5'/>
          {hoverIcon === 'Lyrics' &&
            <h1 className=' h-fit min-w-fit Textwhite text-sm absolute -top-12 Bgblack p-1 px-2 transition rounded-md font-semibold left-1/2 transform -translate-x-1/2 whitespace-nowrap'>{hoverIcon}</h1>
          } 
        </span>
        <span 
          className=' relative hidden lg:block'
          onMouseEnter={()=>handleiconhover('Queue')}
          onMouseLeave={handleiconleave}>
          <HiOutlineQueueList  className='icons h-3 w-3 lg:h-5 lg:w-5'/>
          {hoverIcon === 'Queue' &&
            <h1 className=' h-fit min-w-fit Textwhite text-sm absolute -top-12 Bgblack p-1 px-2 transition rounded-md font-semibold left-1/2 transform -translate-x-1/2 whitespace-nowrap'>{hoverIcon}</h1>
          } 
        </span>
        <span 
          className=' relative hidden lg:block'
          onMouseEnter={()=>handleiconhover('Connect to a device')}
          onMouseLeave={handleiconleave}>
          <BiDevices  className='icons h-3 w-3 lg:h-5 lg:w-5'/>
          {hoverIcon === 'Connect to a device' &&
            <h1 className=' h-fit min-w-fit Textwhite text-sm absolute -top-12 Bgblack p-1 px-2 transition rounded-md font-semibold left-1/2 transform -translate-x-1/2 whitespace-nowrap'>{hoverIcon}</h1>
          } 
        </span>
        <span 
          className=' relative mr-1'
          onMouseEnter={()=>handleiconhover('Mute')}
          onMouseLeave={handleiconleave}>
          {sound ?
            <AiFillSound       className='icons' onClick={handleSound}/>
          : <BiSolidVolumeMute className='icons' onClick={handleSound} />
          }
          {hoverIcon === 'Mute' &&
            <h1 className=' h-fit min-w-fit Textwhite text-sm absolute -top-12 Bgblack p-1 px-2 transition rounded-md font-semibold left-1/2 transform -translate-x-1/2 whitespace-nowrap'>{hoverIcon}</h1>
          } 
        </span>

        <div className='soundbar' onClick={(e)=>{handlesoundBar(e);handleVolume()}} onMouseEnter={()=>{setsoundClr('#1db954');setSoundBall(!soundball)}} onMouseLeave={()=>{setsoundClr('White');setSoundBall(!soundball)}}>
          <span className='soundtrack transition' style={{width:`${soundProgress}%`,backgroundColor:`${soundClr}`}}>
            {soundball &&
                <div className='soundball hidden'></div>
            }
          </span>
        </div>

        {/* <input type="range" onInput={handleVolume} ref={volumeRef} min='0' max="1" step="0.01" value="0.1" className=' w-32 h-1'/> */}

      </aside>

      </section>
    </>:

    <section style={{minWidth:'100%'}} className='w-full controllSignup Textwhite flex items-center px-10'>
    <div className=' w-10/12'>
      <h1 className=' text-lg'>PREVIEW OF SPOTIFY</h1>
      <h1 className=' text-base whitespace-nowrap'>Sign up to get unlimited songs and prodcasts with occasional ads. No credit card needed.</h1>
    </div>
    <Link to='sign-up' className=' w-fit bg-white text-black rounded-3xl p-2 whitespace-nowrap'>
      Signup free
    </Link>
    </section>
}




    </main>
  )
}

export default ControlBar