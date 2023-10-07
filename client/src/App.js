import './App.css';
import Aside from './components/Aside.js'
import Home from './components/Home.js'
import ControlBar from './components/ControlBar.js'
import NavMobile from './components/NavMobile.js';
import MenuMobile from './components/MenuMobile';
import MobileController from './components/MobileController';
import { useState,useEffect, useContext } from 'react';

import Aos from 'aos'
import 'aos/dist/aos.css'
import NowPlaying from './components/NowPlaying';

import  {DataProvider} from './context/DataContext'

function App() {
  useEffect(() => {
    // Initialize AOS
    Aos.init();
  }, []);
  
  const [menuOpen,setMenuOpen] = useState(false)

  const [navSize,setAsideSize] = useState(0)
  const [nowSize,setNowSize] =useState(0)

  // const {userData} = useContext(DataContext)

  return (
    <main className="App relative block" >
      
      <DataProvider>
          {/* <NavMobile setMenuOpen={setMenuOpen}/> */}

          <section className='flex items-center'>
            <Aside setAsideSize={setAsideSize}/>
            <Home navSize={navSize} nowSize={nowSize}/>
            <NowPlaying setNowSize={setNowSize}/>
          </section>

          <ControlBar/>

          {/* { userData && <MobileController/>} */}
          {
            menuOpen && <MenuMobile setMenuOpen={setMenuOpen}/>
          }

      </DataProvider>
    </main>
  );
}

export default App;
