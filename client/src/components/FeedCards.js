import React,{useContext, useState} from 'react'
import '../css/FeedCard.css'
import song from '../images/song.jpg'
import PlayButton from './PlayButton'
import DataContext from '../context/DataContext'
import SignInMust from './SignInMust'
import { Link } from 'react-router-dom'


const FeedCards = ({item,cat}) => {

  const {handleSign,signinmust,mainUser} = useContext(DataContext)
  return (
      <>

      <Link
        to={ (Object.keys(mainUser).length > 0) &&(
          (cat === 'topsongs' || cat === 'tamilsongs' || cat === 'rahman') ? `/track/${item._id}`:
          cat === 'playlist' || cat === 'publicPlaylist' ? `/playlist/${item._id}`:
          cat === 'albums' ? `/album/${item._id}`:
          cat === 'artist' ? `/artist/${item._id}`:
          cat === 'profiles' || cat === 'followers' || cat === 'following' ? `/profile/${item._id}`:'/'
        )}
       className='FeedCard Mobilecards relative sm:hidden' onClick={handleSign}>

        <div className='w-full aspect-square Flex'>
          <img src={item.img} alt="" className='rounded-md w-11/12 aspect-square'/>
        </div>
        <h1 className='mx-2 whitespace-nowrap overflow-hidden text-white text-ellipsis font-bold'>{ cat === 'artist' || cat === 'profiles' || cat === 'followers' || cat === 'following'  ? item.name : item.title}</h1> 

      </Link>

      {signinmust && <SignInMust />}
      </>

  )
}

export default FeedCards