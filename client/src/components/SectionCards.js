import React,{ useContext, useState} from 'react'
import leo from '../images/leo.jpg'
import PlayButton from './PlayButton'
import { Link } from 'react-router-dom'
import DataContext from '../context/DataContext'
import SignInMust from './SignInMust'

const SectionCards = ({item,cat,}) => {

  const {allArtists,mainUser,handleSign,signinmust} = useContext(DataContext)
  const [PlayButtonShow,setPlayButtonShow] = useState(false)

  // console.log(allArtists);console.log(item.artist);
  let artist
  if(cat === 'topsongs' || cat === 'tamilsongs' || cat === 'rahman'){
    artist = allArtists.find(n => n._id === item.artist[0] )
  } 

  // console.log(Object.keys(mainUser).length === 0);


  // console.log(signinmust);
  return (
    
    <>
          <Link onClick={handleSign}
            to={ (Object.keys(mainUser).length > 0) &&(
              (cat === 'topsongs' || cat === 'tamilsongs' || cat === 'rahman') ? `/track/${item._id}`:
              cat === 'playlist' || cat === 'publicPlaylist' ? `/playlist/${item._id}`:
              cat === 'albums' ? `/album/${item._id}`:
              cat === 'artist' ? `/artist/${item._id}`:
              cat === 'profiles' || cat === 'followers' || cat === 'following' ? `/profile/${item._id}`:'/'
  )}
            style={{maxWidth:'170px'}}
            className='FeedCard relative w-full aspect-square  rounded-md  p-3 cursor-pointer'
            onMouseEnter={()=>setPlayButtonShow(true)}
            onMouseLeave={()=>setPlayButtonShow(false)}>

                <div style={{backgroundImage:`url(${item.img})`,height:'140px'}} className=' w-full bg-cover bg-no-repeat bg-center relative Flex'>
                  {/* <img src={item.img} alt="" style={{}} className='h-full aspect-square rounded-md'/> */}

                  {
                    PlayButtonShow && <PlayButton show={PlayButtonShow}/>
                  }
                  
                </div>
                <div className=' w-full flex flex-col'>
                  <h1 style={{textOverflow:'ellipsis'}} className='mt-2 whitespace-nowrap overflow-hidden text-white font-bold'>{ cat === 'artist' || cat === 'profiles' || cat === 'followers' || cat === 'following'  ? item.name : item.title}</h1> 
                  <h1 className='mt-2 text-sm w-fit Textgrey font-semibold  cursor-pointer'>
                    { cat === 'artist' ? 'Artist' :
                      cat === 'albums' ? 'Album' :
                      cat === 'playlist' || cat === 'publicPlaylist' ? 'Playlist':
                      cat === 'profiles' || cat === 'followers' || cat === 'following' ? 'Profile' :
                      cat === 'topsongs' || cat === 'tamilsongs' || cat === 'rahman' ? artist.name :'Playlist'} 
                    </h1>
                </div>
          </Link>
          {signinmust && <SignInMust />}
    </>

  )
}

export default SectionCards