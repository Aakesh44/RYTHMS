import React from 'react'
import {BiSearch,BiMenu,BiLogoSpotify} from 'react-icons/bi'
import { Link } from 'react-router-dom'
const NavMobile = ({setMenuOpen}) => {

  return (
    <main className='sm:hidden bg-black h-16 flex items-center justify-between px-3'>
      <Link to='/'><BiLogoSpotify data-aos="fade-right" className='w-9 h-9 Textwhite'/></Link>
      <div className=' h-full min-w-fit Flex gap-3'>
          <Link to='/search'><BiSearch className='h-6 w-6 text-white'/></Link>
          <button className=' h-fit w-fit p-2 px-4 text-sm font-semibold bg-white rounded-full'>
            OPEN APP
          </button>
          <BiMenu onClick={()=>setMenuOpen(true)} className='h-8 w-8 text-white'/>
      </div>
    </main>
  )
}

export default NavMobile