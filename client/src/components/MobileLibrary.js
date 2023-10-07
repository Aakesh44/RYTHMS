import React, { useContext,useState } from 'react'
import DataContext from '../context/DataContext'
import { Link } from 'react-router-dom'
import {AiFillPushpin,AiOutlineClose} from 'react-icons/ai'
import {GoHeartFill} from 'react-icons/go'
import AsideCollections from './AsideCollections'

const MobileLibrary = () => {
    const {mainUser} = useContext(DataContext)
    const [playlistBtn,setPlaylistBtn] = useState(false)
    const [albumBtn,setAlbumBtn] = useState(false)
    const handleNormal = () =>{
        setAlbumBtn(false)
        setPlaylistBtn(false)
    }
  return (
    <main className='w-full'>
        <h1 className=' text-xl font-bold p-3 w-full bg-black'>Your Library</h1>
        <div className=' h-10 flex items-center gap-5 px-3'>
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
        </div>

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
                <AsideCollections id={n} cat={'album'} key={i}/>
            ))}

            { !albumBtn && mainUser.likedPlaylists?.map((n,i)=>(
                <AsideCollections id={n} cat={'playlist'}  key={i} />
            ))}

        </section>
    </main>
  )
}

export default MobileLibrary