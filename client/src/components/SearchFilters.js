import React, { useContext, useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import DataContext from '../context/DataContext'
const SearchFilters = () => {


  const {searchQuery,setSearchFilter} = useContext(DataContext)

  const options = [
    {id:0,value:'All'},
    {id:1,value:'Playlists'},
    {id:2,value:'Albums'},
    {id:3,value:'Songs'},
    {id:4,value:'Podcasts & Shows'},
    {id:5,value:'Genres & Moods'},
    {id:6,value:'Profiles'},
    {id:7,value:'Artists'},
  ]
  const [click,setClick] = useState(0)

  const navigate = useNavigate()
  const location = useLocation()

  const handleFilter = (id) =>{
    const value = id === 1 ? 'playlist' :id === 2 ? 'album' : id === 3 ? 'song' : id === 4 ? 'show' : id === 5 ? 'genre' :id === 6 ? 'profile' : id === 7 ? 'artist' : ''
    setSearchFilter(value)
    navigate(`/search/${searchQuery}/${value}`)
  }




  return (
    <main className=' sm:sticky top-16 z-10 h-14 flex items-center bg-black overflow-x-scroll overflow-y-hidden searchScrollBar'>
      {options.map((option,ind )=> 
        <span 
        key={option.id}
        onClick={()=>{setClick(option.id);handleFilter(option.id)}}
        style={{paddingBottom:'6px',backgroundColor:click === ind ? '#ffff' :'#252525',color:click === ind ? 'black' :'#ffff'}}
        className='w-fit h-fit py-1 px-2 text-sm font-semibold mx-2 rounded-2xl whitespace-nowrap cursor-pointer'>
          {option.value}
        </span>     
      )}
    </main>
  )
}

export default SearchFilters