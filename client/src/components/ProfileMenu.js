import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DataContext from '../context/DataContext'

const ProfileMenu = ({setShowMenu}) => {
  const {mainUser} =useContext(DataContext)

  const options =[
    { id: 1, value: 'Profile' },
    { id: 7, value: 'Log out' },
    { id: 2, value: 'Account' },
    { id: 3, value: 'Upgrade to premium'},
    { id: 4, value: 'Support' },
    { id: 5, value: 'Download' },
    { id: 6, value: 'Settings' },
  ]

  const navigate = useNavigate

  const hanldeLogout = (e) =>{
    e.stopPropagation();
    localStorage.removeItem('userinfo')
    window.location.reload()
  }

      return (
        <section 
        style={{

            minWidth:'180px',
            minHeight:'300px',
            left:'-160px',
            // right:'200px',
            gridTemplateRows:'repeat(7,1fr)'
        }} 
        className='Playlistsort z-50'>
            <h1 style={{display:'none'}}></h1>
            
            {options.map((option)=>(
              <Link to={option.value === 'Profile' ? `/profile/${mainUser._id}`:option.value === 'Log out' && '/'} key={option.id}
               onClick={(e)=> {option.value === 'Log out' && hanldeLogout(e);setShowMenu(false)}}
              className='flex items-center mx-5' >
                <h1 className=' text-xs'>{option.value}</h1>

              </Link>
            ))}
    
        </section>
      )
}

export default ProfileMenu