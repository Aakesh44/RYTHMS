import React, { useContext } from 'react'
import DataContext from '../context/DataContext'

const ThreeDotMenu = ({playlistId,albumId}) => {

  const {handleLikePlaylist,handleLikeAlbum} = useContext(DataContext)

  const options =[
    { id: 1, value: 'Add to Your Library' },
    { id: 2, value: 'Add to queue' },
    { id: 3, value: 'Report'},
    { id: 4, value: 'Exclude from your taste profile' },
    { id: 5, value: 'Share' },
    { id: 6, value: 'About recommendation' },
    { id: 7, value: 'Open in desktop app' }
  ]

  function handleheart(option) {
    if(option === 'Add to Your Library' && playlistId){
      handleLikePlaylist(playlistId)
    }
    else if(option === 'Add to Your Library' && albumId){
      handleLikeAlbum(albumId)
    }
  }
  return (
    <section style={{minWidth:'210px',minHeight:'260px',gridTemplateRows:'repeat(7,1fr)'}} className='Playlistsort'>
      <li style={{display:'none'}}></li>
      
      {options.map((option)=>(
        <div key={option.id} onClick={()=>handleheart(option.value)}>
          <h1 className=' text-xs'>{option.value}</h1>
        </div>
      ))}
    
    </section>
  )
}

export default ThreeDotMenu