import React from 'react'
import { GoCheck } from "react-icons/go";

const Playlistsort = ({playlistCur,setPlaylistCur}) => {

  const options =[
    { label: 'Recents', value: 'Recents' },
    { label: 'Recently Added', value: 'Recently Added' },
    { label: 'Alphabetical', value: 'Alphabetical' },
    { label: 'Creator', value: 'Creator' },
    { label: 'Custom Order', value: 'Custom Order' }
  ]
  return (
    <section className='Playlistsort '>

        <div>Sort by  </div>
        
        {options.map((option)=>(
          <div key={option.label} onClick={()=>setPlaylistCur(option.value)}>
            <h1 style={{color:option.value === playlistCur && 'rgb(74 222 128)'}}>{option.value}</h1>
            {playlistCur === option.value &&
              <GoCheck className='w-5 text-green-400 drop-shadow-md h-5'/>
            }
          </div>
        ))}

    </section>
  )
}

export default Playlistsort