import React, { useContext } from 'react'
import DataContext from '../context/DataContext'
import { Link } from 'react-router-dom'

const AsideCollections = ({id,cat,flex}) => {

  const {allAlbums,allPlaylists,allProfiles,allArtists,}= useContext(DataContext)

  let collectionTemp = null
  let artistName


  if(cat === 'album'){
    collectionTemp = allAlbums.find(n=> n._id === id)
    artistName = allArtists.find(artist => artist._id === collectionTemp?.artist)?.name
  }
  else if(cat === 'playlist'){
    collectionTemp = allPlaylists.find(n=> n._id === id)
    // console.log(collectionTemp);
    artistName = allProfiles.find(profile => profile._id === collectionTemp?.artist)?.name
    // console.log(artistName);
  }


  return (
    <>
    {
      collectionTemp && 

      <Link to={`/${cat}/${collectionTemp._id}`} className='flex Asidelikebox rounded-md cursor-pointer items-center justify-between px-3 w-full bg-blue-0 h-16 gap-2'>

      <aside className='Asidelikeboxicon h-12 w-12 Flex rounded-md bg-green-400 overflow-hidden'>
        <img src={collectionTemp.img} alt="" className='h-full aspect-square rounded-md hover:scale-105 transition-all' />
      </aside>
  
      <aside className=' mr-auto' style={
        {display:flex && 'flex'}
      }>
        <h1 style={{minWidth:'11rem',maxWidth:'11rem',textOverflow:'ellipsis'}} className=' font-semibold overflow-hidden whitespace-nowrap '>{collectionTemp.title}</h1>

        <span style={{minWidth:'11rem',maxWidth:'11rem',textOverflow:'ellipsis'}} className='flex whitespace-nowrap overflow-hidden items-center gap-1'>
          <h1 style={{minWidth:flex && '5rem'}} className=' text-sm font-semibold'>{cat}</h1>
          <span style={{display:flex && 'none'}}>•</span>
          <h1 className=' text-sm font-semibold'>{artistName}</h1>
        </span>
      </aside>
    </Link>
    }
    </>

  )
}

export default AsideCollections