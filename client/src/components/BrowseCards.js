import React from 'react'
import song from '../images/song.jpg'
const BrowseCards = ({title,img,code}) => {
  return (
    <a href='#' style={{backgroundColor:code}} className=' bg-green-400 w-full aspect-video sm:aspect-square relative rounded-md cursor-pointer overflow-hidden'>
        <h1 className='mt-3 ml-3 text-lg sm:text-2xl font-bold'>{title}</h1>
        
        <div className=' h-20 sm:h-28 aspect-square absolute -bottom-4 -right-4 rotate-12 sm:rotate-45 shadow-md'>
          <img src={img} alt="" className=' h-28 w-28 '/>
        </div>
    </a>
  )
}

export default BrowseCards