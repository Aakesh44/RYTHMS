import React,{useContext,useState,useRef} from 'react'
import { AiOutlineHeart} from "react-icons/ai";
import { BiShuffle,BiSkipPrevious,BiSkipNext,BiRepeat} from "react-icons/bi";
import { HiPlay,HiPause} from "react-icons/hi";
import song1 from '../images/song1.mp3'
import DataContext from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
const MobileController = () => {

  const {userData,curSongIds,setCurSongIds,curIndex,setCurIndex,curSongI,allArtists} = useContext(DataContext)


  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat,setIsRepeat] = useState(false)


  const playPrevious = () =>{
    setCurIndex((prev)=> prev === 0 ? curSongIds.length-1 : prev-1)
    // setCurSong(curSongIds[curIndex])
    console.log(curIndex);
    // console.log(curSong);
  }

  const playNext = () =>{
    setCurIndex((prev)=> prev === curSongIds.length-1 ? 0 : prev + 1)
    // setCurSong(curSongIds[curIndex])
    console.log(curIndex);
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
      console.log(curSongIds);
    }

    setIsShuffle(!isShuffle)

  }

  const toggleRepeat = () =>{

  }

  const minisongRef = useRef(null)
  // console.log(minisongRef.current);

  const handleSong = () =>{

    const audio = minisongRef.current
    try {
      if(audio.paused){
        audio.play()
      }
      else{
        audio.pause()
      }
  
      audio.volume = 1
    } catch (error) {
      console.log(error);
    }

  }

  const navigate = useNavigate()

  const handleRoute = () =>{
    navigate(`track/${curSongI?._id}`)
  }
  return (

    <main className='sm:hidden w-full flex items-center h-16 bg-amber-500 overflow-hidden fixed left-0 right-0 bottom-0'>

        <div onClick={handleRoute} className='w-2/12 aspect-square p-1 bg-blue-500'>
            <img src={curSongI?.img} alt="" className='h-full aspect-square'/>
            {/* <p className=' text-black text-sm'>{curSongI?.title}</p> */}
        </div>

        <section className=' w-8/12 bg-fuchsia-600 h-full flex items-center justify-around'>
            <BiShuffle      onClick={toggleShuffle} className='h-6 w-6'/>
            <BiSkipPrevious onClick={playPrevious}  className='h-9 w-9'/>

            <div >
              {minisongRef.current?.paused ?

                <span onClick={handleSong}><HiPlay className='h-10 w-10 Textwhite' /></span>
                :
                <span onClick={handleSong}><HiPause className='h-10 w-10 Textwhite' /></span>
                
              }  

              <audio ref={minisongRef} >
                <source src={song1} type='audio/mpeg'></source>
              </audio>          
            </div>
            

            <BiSkipNext     onClick={playNext}      className='h-9 w-9'/>
            <BiRepeat       onClick={toggleRepeat}  className='h-6 w-6'/>
        </section>



        <div className='w-2/12 aspect-square Flex '> <AiOutlineHeart className=' h-7 w-7'/> </div>

    </main>

  )
}

export default MobileController