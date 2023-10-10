import React ,{ useState,useEffect,useRef, useContext}from 'react'

import {Route,Routes} from 'react-router-dom'

import Navbar from './Navbar'
import '../css/Home.css'
import Sections from './Sections'
import Footer from './Footer'
import Browse from './Browse'
import SongRoom from './SongRoom'
import SearchRoom from './SearchRoom'
import CategoryRoom from './CategoryRoom'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import DataContext from '../context/DataContext'
import ProfileRoom from './ProfileRoom'
import ArtistRoom from './ArtistRoom'
import PlaylistRoom from './PlaylistRoom'
import AlbumRoom from './AlbumRoom'
import Settings from './Settings'
import GenreRoom from './GenreRoom'
import CollectionRoom from './CollectionRoom'
import ProfileViews from './ProfileViews'
import MobileLibrary from './MobileLibrary'
import MobileController from './MobileController'

const Home = ({navSize,nowSize}) => {

  const {homeWidth,setHomeWidth} = useContext(DataContext)


  const home = useRef(null)

  const [scrollBg, setScrollBg] = useState('transparent');

  useEffect(()=>{

    const homeCurr = home.current

   if(homeCurr){

    const resize = new ResizeObserver(entries =>{
      for(let entry of entries){
        if(entry.target === homeCurr){
          setHomeWidth( Math.floor(entry.contentRect.width))
        }
      }
    })

    resize.observe(homeCurr)

    const homeScroll = home.current

    const handleScroll = () => {
      const scrollThreshold = 300;

      if (homeScroll.scrollTop >= scrollThreshold) {
        setScrollBg('black');
      } else {
        setScrollBg('transparent');
      }

    };


    homeScroll.addEventListener('scroll', handleScroll);

    return ()=>{
      resize.unobserve(homeCurr)
      homeScroll.removeEventListener('scroll', handleScroll);
    }
   }

  },[homeWidth,setHomeWidth])


  return (
    <main ref={home} className='Home relative p-2'>

      <Navbar homeWidth={homeWidth} navSize={navSize} nowSize={nowSize} navBg={scrollBg}/>

      {/* {allSongs.map((song,ind)=>(
        <div className='mt-20' key={ind}>
            <h1>{song.title}</h1>
        </div>
      ))} */}
      
      {/* <Sections homeWidth = {homeWidth}/> */}

    {/*  */}

      {/* <Browse homeWidth={homeWidth}/>/ */}


      {/* <SongRoom/> */}

      {/* <SearchRoom homeWidth={homeWidth}/> */}
      <Routes>

        <Route path='/' element={<CategoryRoom  />} />

        <Route path='/search'>

            <Route index element={<Browse />} />
            <Route path=':query/:filter' element={<SearchRoom />} />
            <Route path=':query' element={<SearchRoom/>} />
            
        </Route>
        
        <Route path='/section/:id' element={<Sections />} />

        <Route path='/genre/:id'   element={<Sections  /> } />

        <Route path='/track/:id'   element={<SongRoom />} />

        <Route path='/album/:id'   element={<AlbumRoom />} />

        <Route path='/playlist/:id'element={<PlaylistRoom />} />

        <Route path='/artist/:id'  element={<ArtistRoom />} />

        <Route path='/profile/:id' element={<ProfileRoom/>}/>

        <Route path='/profile/:id/:option' element={<ProfileViews/>}/> 

        <Route path='/genre/:id' element={<GenreRoom/>}/>

        <Route path='/collection/tracks' element={<CollectionRoom/>} />

        <Route path='/library' element={<MobileLibrary/>}/>
        
        <Route path='/sign-up' element={<SignUpForm/>} />

        <Route path='/log-in' element={<LoginForm/>} />

        <Route path='/setting' element={<Settings/>} />

      </Routes>

      <MobileController/>
      <Footer />
    </main>
  )
}

export default Home