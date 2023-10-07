import React,{useState,useEffect, useRef, useContext} from 'react'
import {GoArrowRight,GoArrowLeft,  GoHeartFill, GoHomeFill, GoPlus, GoTriangleDown,GoTriangleUp } from "react-icons/go";
import { AiOutlineLayout,AiFillPushpin,AiOutlineClose} from "react-icons/ai";
import { FiSearch ,FiGrid} from "react-icons/fi";

import { Link,useLocation } from 'react-router-dom';

import PopUp from './PopUp'
import Playlistsort from './Playlistsort'
import AsideCollections from './AsideCollections';
import DataContext from '../context/DataContext';
import SignInMust from './SignInMust';

const Aside = ({setAsideSize}) => {
  
  const {homeSearch,setHomeSearch,mainUser,allAlbums,allPlaylists,handleSign,signinmust,handleCreatePlaylist} = useContext(DataContext)

  const location = useLocation()
  // console.log(location.pathname);

  const [MainBar,setMainbar]=useState(true)
  const [halfAside,setHalfAside]=useState(false)

  const [isResizing, setIsResizing] = useState(false);
  const [initWidth, setInitWidth] = useState(290);
  const [contentWidth, setContentWidth] = useState(100);

  // const minContentWidth = 100; 
  // const maxContentWidth = 1000;


  const startResizing = (e) => {
    e.preventDefault(); 
    if(halfAside){
      setIsResizing(true);
      setInitWidth(e.clientX);
    }
    else{return}
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;

    const widthChange = e.clientX - initWidth;
    const newContentWidth = contentWidth + widthChange;
    requestAnimationFrame(()=>{
      setContentWidth(newContentWidth);
    })
    setInitWidth(e.clientX);
  };

  const stopResizing = () => {
    if (isResizing) {
      setIsResizing(false);
    }

  };

  const [asideWidth,setAsideWidth] = useState(0)
  const aside = useRef(null)

  useEffect(() => {

    const asideCurr = aside.current

    if(asideCurr){
      const resize = new ResizeObserver(entries=>{
        for(const entry of entries){
          if(entry.target === asideCurr){
            setAsideWidth(Math.floor(entry.contentRect.width))
            setAsideSize(asideWidth)
          }
        }
      })

      resize.observe(asideCurr)
    

    
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', stopResizing);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopResizing);
    }

    setHomeSearch(location.pathname)

    return () => {
      resize.unobserve(asideCurr)
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopResizing);
    };

  }
  }, [isResizing,asideWidth,location.pathname,setHomeSearch]);


const [hoverIcon,setHoverIcon] =useState(null)
  
const handleiconhover = (text) =>{
  setHoverIcon(text)
}
const handleiconleave = ()=>{
  setHoverIcon(null)
}


const [playlistsort,setplaylistsort] =useState(false)

const [playlistCur,setPlaylistCur] = useState('Recents')
// console.log(mainUser.likedAlbums);

const [playlistBtn,setPlaylistBtn] = useState(false)
const [albumBtn,setAlbumBtn] = useState(false)
const handleNormal = () =>{
  setAlbumBtn(false)
  setPlaylistBtn(false)
}
  return (
    <main style={{height:'88vh'}} ref={aside} className='hidden sm:flex h-full'>

     
    <main style={{
      minWidth:MainBar && halfAside ? '590px': MainBar ? '290px' :'80px',
      maxWidth:MainBar && halfAside ? '1020px': MainBar ? '290px' : '80px',
      width: `${contentWidth}px`,transition:isResizing ? 'none' :'width 0.2s ease' }} 

      className='Aside Textwhite bg-slate-50  Flexcol gap-1 p-2 pr-0'>

      {MainBar ? 
      <>

        <section className='Flexcol w-full mb-auto h-1/5  Bgblack rounded-md p-2'>

        <Link to='/' className='w-full h-16'>
          <div style={{color:homeSearch === '/' && 'white'}} className='AsideHover flex items-center w-full bg-blue-0 h-16'>
              <GoHomeFill className='AsideMainIcons'/>
              <h1 className=' text-md '>Home</h1>    
          </div>
        </Link>

          <Link  to={(Object.keys(mainUser).length > 0) && '/search'} onClick={handleSign} style={{color:homeSearch.startsWith('/search') && 'white'}} className='AsideHover flex items-center w-full bg-red-0 h-16'>
              <FiSearch className=' AsideMainIcons'/>
              <h1 className=' text-md '>Search</h1>            
          </Link>
          {signinmust && <SignInMust />}
        </section>

        <section className='h-4/5 w-full  Bgblack p-2 pt-0 rounded-md'>

          <div 
            style={{gridTemplateColumns: halfAside ? '1fr 1fr' : '3fr 1fr 1fr'}} 
            className='AsideSec2div1  w-full bg-red-80 0 h-14'>
              <span 
              onMouseOver={()=>handleiconhover('Collapse Your Library')}  
              onMouseLeave={handleiconleave} 
              onClick={()=>setMainbar(!MainBar)}
              className='AsideHover flex relative w-fit'>
                <AiOutlineLayout  className=' AsideMainIcons'/>
                <h1 className=' text-md '>Your Library</h1> 
                {hoverIcon === 'Collapse Your Library' &&
                  <PopUp text={hoverIcon}/>
                }
              </span>

              {!halfAside ?
                <>
                  <span className= ' hover:text-white relative overflow-visible' 
                  onMouseOver={()=>handleiconhover('Create playlist or folder')}  
                  onMouseLeave={handleiconleave}
                  onClick={handleCreatePlaylist}>
                    <GoPlus  className='AsideHover relative  h-6 w-6 ' onClick={handleSign} />
                    {hoverIcon === 'Create playlist or folder' &&
                      <PopUp  text={hoverIcon}/>
                    }
                  </span>

                  <span className=' hidden lg:block hover:text-white relative' 
                  onMouseOver={()=>handleiconhover('Enlarge your Library')}  
                  onMouseLeave={handleiconleave} 
                  onClick={()=>{setHalfAside(!halfAside);setplaylistsort(false)}}>
                    <GoArrowRight  className='AsideHover relative h-6 w-6 '/>
                      {hoverIcon === 'Enlarge your Library' &&
                        <PopUp text={'Enlarge your Library'}/>
                      }
                  </span>

 
                </>:
                <>
                  <div className=' Flex h-full ml-auto'>
                    <span className='relative' 
                    onMouseOver={()=>handleiconhover('Create playlist or folder')}  
                    onMouseLeave={handleiconleave}
                    onClick={handleCreatePlaylist} >
                      <GoPlus      className='h-6 w-6 mr-4 cursor-pointer'/>
                      {hoverIcon === 'Create playlist or folder' &&
                        <PopUp text={hoverIcon}/>
                      }
                    </span>
                    <span className='relative' 
                    onMouseOver={()=>handleiconhover('Switch to grid view')}  
                    onMouseLeave={handleiconleave} >
                      <FiGrid      className='h-5 w-5 mr-4 cursor-pointer'/>
                      {hoverIcon === 'Switch to grid view' &&
                        <PopUp text={hoverIcon}/>
                      }
                    </span>
                    <span className='relative' 
                    onMouseOver={()=>handleiconhover('Reduce your library')}  
                    onMouseLeave={handleiconleave} >
                      <GoArrowLeft onClick={()=>setHalfAside(!halfAside)}     className='h-6 w-6 mr-4 cursor-pointer'/>
                      {hoverIcon === 'Reduce your library' &&
                        <PopUp text={hoverIcon}/>
                      }
                    </span>                  
                  </div>
                </>
              }
          
          </div>

          <div className='flex items-center w-full bg-blue-0 h-12'>
            <aside className='flex items-center w-full gap-5'>
              { (playlistBtn || albumBtn )&&
                <span style={{backgroundColor:'rgb(46, 45, 45)'}} onClick={handleNormal} className=' h-6 w-6 Flex bg-slate-700 rounded-full cursor-pointer'>
                  <AiOutlineClose className=''/>
                </span>
              }
              {
                !albumBtn && <button onClick={()=>setPlaylistBtn(!playlistBtn)} style={{backgroundColor:playlistBtn ? 'white' : 'rgb(46, 45, 45)',color:playlistBtn ? 'black' : 'white'}} className=' text-sm font-semibold  py-1 px-4 rounded-full'>Playlists</button>
              }
              {
                !playlistBtn && <button onClick={()=>setAlbumBtn(!albumBtn)} style={{backgroundColor:albumBtn ? 'white' : 'rgb(46, 45, 45)',color:albumBtn ? 'black' : 'white'}}className=' text-sm font-semibold  py-1 px-4 rounded-full'>Albums</button>
              }

            </aside>

            {halfAside &&
              <aside className='Flex ml-auto'>
                <span 
                onMouseOver={()=>handleiconhover('Search playlists')}  
                onMouseLeave={handleiconleave}  className='AsidePlaylistSearchSpan relative h-7 w-7 Flex  ml-4' >
                  <FiSearch className='AsidePlaylistSearchIcon'/>
                  {hoverIcon === 'Search playlists' && 
                        <PopUp text={hoverIcon}/>
                  }
                </span>
                <span onClick={()=>setplaylistsort(!playlistsort)} className='AsideHover relative focus:text-white  flex h-6 items-center gap-1 ml-4'>
                  <button className='AsideHover  Textwhite relative gap-1 text-sm font-semibold'>
                    {playlistCur} 
                  </button>
                  {playlistsort ? <GoTriangleUp className='h-5 w-5 mt-auto' /> : <GoTriangleDown className='h-5 w-5 mt-auto' />}
              
                  {playlistsort && 
                    <Playlistsort playlistCur={playlistCur} setPlaylistCur={setPlaylistCur}/>
                  }

                </span>
              </aside>
            }

          </div>
          {!halfAside ?
            <div className='flex items-center justify-between px-3 w-full bg-red-0 h-10'>
              <span className='AsidePlaylistSearchSpan bg-yellow-8 00 relative h-7 w-1/2 Flex px-2'>
                <FiSearch 
                onMouseOver={()=>handleiconhover('Search in Playlists')}  
                onMouseLeave={handleiconleave} className='AsidePlaylistSearchIcon mr-auto'/>
                {hoverIcon === 'Search in Playlists' &&
                  <PopUp text={'Search in Playlists'}/>
                }
              </span>

              <span onClick={()=>setplaylistsort(!playlistsort)} className='AsideHover relative flex h-6 items-center gap-1'>
                <button className='  Textwhite gap-1 text-sm font-semibold'>
                  {playlistCur}
                </button>

                {playlistsort ? <GoTriangleUp className='h-5 text-white w-5 mt-auto' /> : <GoTriangleDown className='h-5 Textwhite w-5 mt-auto' />}
              
                {playlistsort && 
                  <Playlistsort playlistCur={playlistCur} setPlaylistCur={setPlaylistCur}/>
                }
                
              </span>
            </div>:<div style={{height:'0.1mm'}} className=' w-full bg-gray-600 mb-1'></div>

            // <div className='HalfAsideText'>
            //   <h1>Title</h1>
            //   <h1>Date Added</h1>
            //   <h1>Played</h1>
            // </div>
          }

          <section className=' w-full h-5/6 overflow-y-scroll'>

            {
              (mainUser.likedSongs?.length > 0 && !albumBtn) &&
              <Link to='/collection/tracks' className='flex Asidelikebox  rounded-md cursor-pointer items-center justify-between px-3 w-full bg-blue-0 h-16 gap-2'>
                <aside className='Asidelikeboxicon h-12 w-12 Flex rounded-md bg-green-400'>
                  <GoHeartFill/>
                </aside>

                <aside className=' mr-auto'>
                  <h1 className=' font-semibold'>Liked Songs</h1>
                  <span className='flex items-center gap-1'>
                    <AiFillPushpin className='text-green-500'/>
                    <h1 className=' text-sm font-semibold'>{mainUser.likedSongs?.length} song</h1>
                  </span>
                </aside>
              </Link>
            }

            {!playlistBtn && mainUser.likedAlbums?.map((n,i)=>(
              <AsideCollections id={n} cat={'album'} flex={halfAside} key={i}/>
            ))}

            { !albumBtn && mainUser.likedPlaylists?.map((n,i)=>(
              <AsideCollections id={n} cat={'playlist'} flex={halfAside} key={i} />
            ))}
            
          </section>



        </section>

      </>:
  
        <section className='flex flex-col gap-1  items-center h-full w-20 rounded-md mr-auto'>

          <div className='Bgblack h-1/5 w-full p-2 flex flex-col  rounded-md'>
            <Link to='/' className='h-16 w-full Flex'>
              <GoHomeFill style={{color:homeSearch === '/' && 'white'}} className='AsideminiIcons my-3'/>
            </Link>
            <Link to={(Object.keys(mainUser).length > 0) && '/search'} onClick={handleSign} className='h-16 w-full Flex'>
              <FiSearch style={{color:homeSearch.startsWith('/search') && 'white'}} className='AsideminiIcons my-3'/>
            </Link>
          </div>

          <div className='Bgblack h-4/5 overflow-y-scroll bg-scroll sideScroll  w-full flex flex-col items-center p-1 rounded-md'>
            <AiOutlineLayout onClick={()=>setMainbar(!MainBar)} style={{minHeight:'25px',minWidth:'25px'}} className='AsideminiIcons mt-3'/>
            
            {mainUser.likedSongs?.length > 0 &&
                <Link to={(Object.keys(mainUser).length > 0) && '/collection/tracks'} onClick={handleSign} style={{minHeight:'48px',minWidth:'48px'}} className='Asidelikeboxicon mt-3 cursor-pointer h-12 w-12 Flex rounded-md bg-green-400'>
                <GoHeartFill/>
              </Link>
            }


            {mainUser.likedAlbums?.map((id,i)=>(
              <Link to={`/album/${id}`}>
                <img src={allAlbums.find(n => n._id === id)?.img} alt="" key={i} className='mt-3 cursor-pointer h-12 w-12 Flex rounded-md'/>
              </Link>
            ))}

            {mainUser.likedPlaylists?.map((id,i)=>(
              <Link to={`/playlist/${id}`}>
                <img src={allPlaylists.find(n => n._id === id)?.img} alt="" key={i} className='mt-3 cursor-pointer h-12 w-12 Flex rounded-md'/>
              </Link>
            ))}

          </div>



        </section>
    
        
    }
      

    </main>

    <span 
      // ref={aside}
      onMouseDown={startResizing} 
      // onMouseMove={widthfun}
      // onMouseUp={widthlast}
      className='AsideResizeBar'>
        
    </span>
    </main>

  )
}

export default Aside