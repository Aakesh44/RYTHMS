import React,{useContext, useState} from 'react'
import {MdOutlineCreateNewFolder} from 'react-icons/md'
import DataContext from '../context/DataContext'

const QueueMenu = ({songId}) => {
  const {allPlaylists,mainUser,handleLikeSong,handlePushToPlaylist} = useContext(DataContext)

  const options =[
    { id: 1, value: 'Add to playlist ▶' },
    { id: 2, value: 'Save to your liked songs ▶' },
    { id: 3, value: 'Add to queue'},
    { id: 4, value: 'Go to song radio' },
    { id: 5, value: 'Go to artist' },
    { id: 6, value: 'Go to album' },
    { id: 7, value: 'Show credits' },
    { id: 8, value: 'Share' },
    { id: 9, value: 'Open in Desktop app' }
  ]
  const [addToPlaylist,setAddToPlaylist] = useState(false)

  function handleheart(option) {
    if(option === 'Save to your liked songs ▶'){
      handleLikeSong(songId)
    }
  }


  const playlists = allPlaylists.filter(playlist => playlist.artist === mainUser._id)
 return (
   <section 
    style={{

        minWidth:'210px',
        minHeight:'340px',
        left:'-180px',
        // right:'200px',
        gridTemplateRows:'repeat(9,1fr)'
    }} 
    className='Playlistsort'>
        <h1 style={{display:'none'}}></h1>

        {options.map((option)=>(
          <div 
          key={option.id} 
          onClick={()=>handleheart(option.value)} onMouseEnter={()=>{option.value === 'Add to playlist ▶' && setAddToPlaylist(true)}} onMouseLeave={()=>{option.value === 'Add to playlist ▶' && setAddToPlaylist(false)}} 
          className=' relative'>
            <h1 className=' text-xs' >{option.value}

            {(addToPlaylist && option.value === 'Add to playlist ▶') &&
              <span style={{backgroundColor:'#282828',gridTemplateRows:`repeat(${playlists?.length+1},1fr)`,top:'5px',right:'99%',minHeight:'3rem',height:`${4*playlists?.length}rem`}} className=' cursor-default grid p-2 absolute w-48 h-32 top-0 right-full shadow-2xl Textwhite'>
                  <h1 className='flex items-center justify-between cursor-pointer'>create playlist <MdOutlineCreateNewFolder className='h-5 w-5'/></h1>
                  {playlists?.map(n => (

                    <h1 onClick={()=>handlePushToPlaylist(n._id,songId)} className=' Textgrey hover:text-white flex items-center justify-start'>{n.title}</h1>

                  ))}   
              </span>
            }
            </h1>
          </div>
        ))}
    
    </section>
      )
}

export default QueueMenu