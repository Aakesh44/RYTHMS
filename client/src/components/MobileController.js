import React,{useContext,useState,useRef,useEffect} from 'react'
import { AiOutlineHeart} from "react-icons/ai";
import { BiShuffle,BiSkipPrevious,BiSkipNext,BiRepeat} from "react-icons/bi";
import { HiPlay,HiPause} from "react-icons/hi";
import DataContext from '../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../images/logo.png'
const MobileController = () => {

  const {curSongIds,setCurSongIds,curIndex,setCurIndex,curSongI,mainUser} = useContext(DataContext)


  const [isShuffle, setIsShuffle] = useState(false)


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

  }

  const minisongRef = useRef(null)
  // console.log(minisongRef.current);

  const handleSong = () =>{

    const audio = minisongRef.current
    // console.log(audio.paused);

    if(audio.paused){
      audio.play()
    }
    else{
      audio.pause()
    }

    audio.volume = 1

  }

  const navigate = useNavigate()

  const handleRoute = () =>{
    navigate(`track/${curSongI?._id}`)
  }

async function LoadAudio(link) {
    if(minisongRef.current && link){

      minisongRef.current.src = link 
      await minisongRef.current.load()
    }
  }

 useEffect(()=>{

  if(curSongI?.link) LoadAudio(curSongI?.link)

 },[curSongI?.link])

 const handlePlay =()=>{
  if(minisongRef.current.paused && (!minisongRef.current?.paused) ){
    minisongRef.current.play().catch((e)=>{
      console.log(e);
    })
  }
 }

  return (

    <main className='sm:hidden w-full  h-16  bg-black -500 overflow-hidden fixed left-0 right-0 bottom-0'>

        {(Object.keys(mainUser).length > 0) ?
        <div className='w-full h-full flex items-center'>
        
          <div onClick={handleRoute} className='w-2/12 aspect-square p-1'>
              <img src={curSongI?.img || logo} alt="" className='h-full aspect-square'/>
          </div>

          <section className=' w-8/12 bg-black -600 h-full flex items-center justify-around'>
              <BiShuffle      onClick={toggleShuffle} className='h-6 w-6'/>
              <BiSkipPrevious onClick={playPrevious}  className='h-9 w-9'/>

              <div >

                <span onClick={handleSong}> {(minisongRef.current?.paused) ? <HiPlay className='h-10 w-10 Textwhite' />:<HiPause className='h-10 w-10 Textwhite' />}</span>
                                  
                <audio ref={minisongRef} onCanPlayThrough={handlePlay}>
                  {/* <source src={curSongI?.link} type='audio/mpeg'></source> */}
                </audio>          
              </div>
              

              <BiSkipNext     onClick={playNext}      className='h-9 w-9'/>
              <BiRepeat       onClick={toggleRepeat}  className='h-6 w-6'/>
          </section>



          <div className='w-2/12 aspect-square Flex '> <AiOutlineHeart className=' h-7 w-7'/> </div>
        </div>:
        <div className='w-full h-full flex items-center justify-evenly'>
          <Link to='log-in' className=' bg-white text-black text-sm font-semibold px-6 py-2 rounded-md active:scale-95'>
            Log in
          </Link>
          <Link to='sign-up' className=' bg-white text-black text-sm font-semibold px-6 py-2 rounded-md active:scale-95'>
            Sign up
          </Link>
        </div>}
    </main>

  )
}

export default MobileController