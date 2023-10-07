import React, { useContext } from 'react'
import '../css/Footer.css'
import {AiOutlineInstagram,AiOutlineTwitter,AiOutlineFacebook} from 'react-icons/ai'
import DataContext from '../context/DataContext'
const Footer = () => {

  const {homeWidth} = useContext(DataContext)
  return (
    <main className='hidden sm:block Footer w-full '>

      <section className='section1 '>
        <aside className='aside1' 
          style={{gridTemplateColumns: homeWidth > 850 ? 'repeat(3,1fr)': homeWidth > 700 ?'repeat(2,1fr)' :'repeat(1,1fr)'  }}>

            <div>
              <h1>Company</h1>
              <h1>About</h1>
              <h1>Jobs</h1>
              <h1>For the Record</h1>
            </div>

            <div>
              <h1>Communities</h1>
              <h1>For Artists</h1>
              <h1>Developers</h1>
              <h1>Advertising</h1>
              <h1>Investors</h1>
              <h1>Vendors</h1>
            </div>

            <div>
              <h1>Useful links</h1>
              <h1>Support</h1>
              <h1>Free Mobile App</h1>
            </div>

        </aside>
        <aside className='aside2'>
            <div>

              <span>
                <AiOutlineInstagram className='h-5 w-5'/>
              </span>
              <span>
                <AiOutlineTwitter className='h-5 w-5'/>
              </span>
              <span>
                <AiOutlineFacebook className='h-5 w-5'/>
              </span>

            </div>
        </aside>
      </section>

      <section className='section2'>
        <aside>
          <h1>Legal</h1>
          <h1>Privacy Center</h1>
          <h1>Privacy Policy</h1>
          <h1>Cookies</h1>
          <h1>About Ads</h1>
          <h1>Accessibility</h1>
        </aside>
        
        <h1>© 2023 Spotify AB</h1>
      </section>
    </main>
  )
}

export default Footer