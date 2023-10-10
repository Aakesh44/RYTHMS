import React from 'react'
import { Link } from 'react-router-dom'

const TitleBar = () => {
  return (
    <main className=' w-full h-16 flex items-center justify-between px-5 '>
      <h1 className=' text-2xl font-bold cursor-pointer hover:underline'>Title</h1>
      <h1 className=' hidden sm:block Textgrey text-sm font-semibold cursor-pointer hover:underline'>
        <Link to='/section/id'>
          Show all
        </Link>
      </h1>
    </main>
  )
}

export default TitleBar