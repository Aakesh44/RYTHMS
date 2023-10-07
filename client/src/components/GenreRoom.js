import React from 'react'
import Sections from './Sections'

const GenreRoom = ({homeWidth}) => {
  return (
    <main className=' w-full h-full'>

        <h1 className='text-3xl'>Title</h1>

        <Sections homeWidth={homeWidth}/>
    </main>
  )
}

export default GenreRoom