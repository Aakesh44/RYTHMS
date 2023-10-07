import React from 'react'

import {BsPlayCircleFill} from 'react-icons/bs'


const PlayButton = ({show}) => {
  return (
    <main style={{bottom : show && '8px'}}  className=' absolute  Flex bottom-0 h-12 w-12 right-2 bg-black rounded-full outline-none shadow-none'>
        <BsPlayCircleFill  className='h-full w-full text-green-500 scale-105'/>
    </main>
  )
}

export default PlayButton