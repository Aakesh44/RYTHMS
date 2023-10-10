import React, { useContext, useState } from 'react'
import '../css/Navbar.css'
import { BsChevronLeft, BsChevronRight,BsArrowDownCircle,BsSearch } from "react-icons/bs";
import {BiSearch,BiMenu,BiLogoSpotify,BiBookHeart} from 'react-icons/bi'
import { IoMdContact } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import ProfileMenu from './ProfileMenu';
import MenuMobile from './MenuMobile';
import SignInMust from './SignInMust';
const Navbar = ({homeWidth,navSize,nowSize,navBg}) => {

  const {homeSearch,searchQuery,setSearchQuery,searchFilter,userData,mainUser,handleSign,signinmust} = useContext(DataContext)

  const [hoverIcon,setHoverIcon] =useState(null)

  const handleiconhover = (text) =>{
    setHoverIcon(text)
  }
  const handleiconleave = ()=>{
    setHoverIcon(null)
  }
  const navigate = useNavigate()

  const handleQueryChange = (newQuery) =>{
    const query = newQuery
    setSearchQuery(query)
    navigate(`/search/${query}/${searchFilter}`)
  }

  const handleGoBack = () =>{
    navigate(-1)
  }

  const handleGoForward =()=>{
    navigate(1)
  }

  const [showMenu,setShowMenu] = useState(false)
  const [searchActive,setSearchActive] = useState(false)
  const [menuOpen,setMenuOpen] = useState(false)

  return (
    <>
      <main style={{left:`${navSize}px`,right:`${nowSize+18}px`,backgroundColor:'black'}} className='nav fixed left-80'>

        <section className='Flex mr-auto h-full gap-4 '>
          <span 
              className=' relative'
              onMouseEnter={()=>handleiconhover('Go back')}
              onMouseLeave={handleiconleave}
              onClick={handleGoBack}>
              <BsChevronLeft  className='h-5 w-5 cursor-pointer'/>
              {hoverIcon ==='Go back' &&
                <h1 className=' absolute whitespace-nowrap min-w-fit left-1/2 -translate-x-1/2 right-1/2 bg-black p-1 px-2 rounded-md top-8 text-sm font-semibold h-fit transform '>{hoverIcon}</h1>
              }
          </span>

          <span 
              className=' relative'
              onMouseEnter={()=>handleiconhover('Go forward')}
              onMouseLeave={handleiconleave}
              onClick={handleGoForward}>
              <BsChevronRight  className='h-5 w-5 cursor-pointer'/>
              {hoverIcon ==='Go forward' &&
                <h1 className=' absolute whitespace-nowrap min-w-fit left-1/2 -translate-x-1/2 right-1/2 bg-black p-1 px-2 rounded-md top-8 text-sm font-semibold h-fit transform '>{hoverIcon}</h1>
              } 
          </span>

          <div style={{display: !homeSearch.startsWith('/search') && 'none'}} className={`Search ${searchActive ? 'active' : ''}  Textgrey`}>
              <BsSearch className='h-4 w-4'/>
              <input 
              type="text" 
              value={searchQuery}
              onChange={(e)=>handleQueryChange(e.target.value?.trim())}
              onFocus={()=>setSearchActive(true)}
              onBlur={()=>setSearchActive(false)}
              style={{width: homeWidth > 700 ? '350px':'180px',textOverflow: 'ellipsis'}}  
              className=' bg-transparent outline-none placeholder:text-gray-500' 
              placeholder='What do you want to listen to?'/>
          </div>
        </section>

        

        <section  className='navsection2 gap-5 '>
          <button style={{display:homeSearch.startsWith('/search') && 'none'}} className='hidden lg:block w-max bg-white text-black text-sm font-bold px-4 py-2 rounded-full'>
            Explore Premium
          </button>

          <button style={{display: homeWidth > 470 ? 'flex':'none'}} className='hidden lg:flex Flex gap-1 text-sm font-bold'>
            <BsArrowDownCircle className='text-white h-4 w-4 '/>
            <h1>Install App</h1>
          </button>

        {!userData && 
        <>
          <Link to='sign-up' className=' w-max  text-white bg-black text-sm font-bold px-4 py-2 rounded-full'>
            Sign up
          </Link>
          <Link to='log-in' className=' w-max bg-white text-black text-sm font-bold px-4 py-2 rounded-full'>
            Log in 
          </Link>
        </>}


          {userData && 
            <span  className=' relative cursor-pointer'>
              <IoMdContact className='my-auto h-5 w-5' onClick={()=>setShowMenu(!showMenu)}/>
              {
                showMenu && <ProfileMenu setShowMenu={setShowMenu}/>
              }

            </span>
          }

        </section>
      </main>

      <main className='sm:hidden w-full bg-black relative h-16 flex items-center justify-between px-3'>
        <Link to='/'><BiLogoSpotify data-aos="fade-right" className='w-9 h-9 Textwhite'/></Link>
        <div className=' h-full min-w-fit Flex gap-3'>

            <Link style={{display: homeSearch.startsWith('/search') && 'none'}} to={(Object.keys(mainUser).length > 0) && '/search'} onClick={handleSign}><BiSearch className='h-6 w-6 text-white'/></Link>
            <Link style={{display: homeSearch.startsWith('/search') && 'none'}} to={(Object.keys(mainUser).length > 0) && '/library'} onClick={handleSign}><BiBookHeart className='h-6 w-6 text-white mx-3'/></Link>

            {!userData &&
              <button style={{display: homeSearch.startsWith('/search') && 'none'}} className=' h-fit w-fit p-2 px-4 text-sm font-semibold bg-white rounded-full text-black'>
                OPEN APP
              </button>
            }

            <div style={{display: !homeSearch.startsWith('/search') && 'none'}} className={`Search ${searchActive ? 'active' : ''}  Textgrey`}>
              <BsSearch className='h-4 w-4'/>
              <input 
              type="text" 
              value={searchQuery}
              onChange={(e)=>handleQueryChange(e.target.value.trim())}
              onFocus={()=>setSearchActive(true)}
              onBlur={()=>setSearchActive(false)}
              style={{width: homeWidth > 700 ? '350px':'180px',textOverflow: 'ellipsis'}}  
              className=' bg-transparent outline-none placeholder:text-gray-500' 
              placeholder='What do you want to listen to?'/>
            </div>

            <BiMenu onClick={()=>setMenuOpen(!menuOpen)} className='h-8 w-8 text-white'/>
        </div>

        {
            menuOpen && <MenuMobile setMenuOpen={setMenuOpen} menuOpen={menuOpen}/>
        }
      </main>
      {signinmust && <SignInMust />}
    </>
  )
}

export default Navbar