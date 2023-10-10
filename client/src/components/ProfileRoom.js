import React, { useContext, useState ,useEffect} from 'react'
import song from '../images/song.jpg'
import {BsThreeDots,BsPencilFill} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import Category from './Category'
import DataContext from '../context/DataContext'
import { useParams } from 'react-router-dom'

const ProfileRoom = () => {
  const {homeWidth,allProfiles,allPlaylists,capital,mainUser,handleProfileEdit,handleFollow,handleUnfollow,} = useContext(DataContext)

  const [dotMenu,setDotMenu] = useState(false)
  const [editPage,setEditPage] =useState(false)

  const id = useParams().id

  const profile = allProfiles.find(n=> n._id === id)
  // console.log(allProfiles);

  const [myProfile,setMyProfile] = useState(id === mainUser._id)
  
  useEffect(()=>{
    setMyProfile(id === mainUser._id)
  },[id,mainUser._id])

  const [editName,setEditName] = useState(mainUser.name)

  const [editImg,setEditImg] = useState(false)

  const publicPlaylistsCount = allPlaylists.filter(playlist => playlist.artist === id)?.length
  
  const hanldeConnection = (mainId,userId) =>{
    // console.log(profile.followers.includes(mainUser._id));
      if(profile.followers.includes(mainUser._id)){
        handleUnfollow(mainId,userId)
      }
      else{
        handleFollow(mainId,userId)
      }
  }

return (
  <main className='w-full rounded-md mb-16 sm:mb-0'>

    <section  className='RoomsHeight profileRoom p-4 flex items-end rounded-t-md'>

      <aside  className='profilecard relative w-fit h-fit mr-10' onMouseEnter={()=>setEditImg(!editImg)} onMouseLeave={()=>setEditImg(!editImg)}>
        <img src={profile.img || song} alt="" 
          style={{transform:'scale(1.0)',transition:'transform 0.4s ease',cursor:myProfile && 'pointer'}}
          className=' aspect-square h-full w-full rounded-full  duration-200' />
        {
            (editImg && myProfile) && <span  className=' h-full w-full rounded-full inset-0 Flex flex-col gap-4 imgBg absolute cursor-pointer'><BsPencilFill className='h-7 w-7 '/><h1>Choose photo</h1></span>
        }
      </aside>

      <aside className=''>
        <h1 className=' text-sm '>Profile</h1>
        <h1 onClick={()=>setEditPage(!editPage)} style={{fontSize:homeWidth > 600 ? '70px' :'30px',cursor:myProfile && 'pointer'}} className='font-bold my-5 cursor-default'>{capital(profile.name)}</h1>
        {publicPlaylistsCount> 0 && <h1>{publicPlaylistsCount} Public Playlist</h1> }
      </aside>

    </section>

    <div className=' h-14 flex items-center p-4 my-4'>

      {!myProfile && <button className=' text-base font-semibold w-fit px-4 p-1 border border-white rounded-full' onClick={()=>hanldeConnection(mainUser._id,id)}>{profile.followers.includes(mainUser._id) ? 'following' : 'follow'}</button> }
      <BsThreeDots className=' h-6 w-6 mx-10 cursor-pointer relative' onClick={()=>setDotMenu(!dotMenu)}/>
      {
        (dotMenu && myProfile) &&
        <button className=' w-fit editBtn  p-2 px-10' onClick={()=>setEditPage(!editPage)}>Edit Profile</button>
      }
    </div>

    {
      (editPage && myProfile) &&

      <main className='blurk fixed inset-0 z-10 Flex'>


        <section  className='EditPopUp edit rounded-md p-5 flex flex-col justify-between'>
            
            <header className=' flex justify-between items-center text-lg'>
              <h1>Profile details</h1>
              <AiOutlineClose onClick={()=>{setEditPage(!editPage);setDotMenu(false)}} className=' cursor-pointer'/>
            </header>

            <section className=' w-full flex items-center justify-center gap-4'>

              <div className=' flex flex-col '>
                <p className='text-sm'>Edit name</p>
                <input type="text" value={editName} onChange={(e)=>setEditName(e.target.value)} className=' bg-gray-800 w-64 py-2 px-2'/>
                <button className=' ml-auto py-3 px-8 rounded-full bg-white text-black font-semibold mt-2' onClick={()=>{handleProfileEdit(mainUser._id,editName);setEditPage(!editPage);setDotMenu(false)}}>Save</button>
              </div>

            </section>
            <div className=' text-xs'>
                <h1>By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</h1>
              </div>
        </section>



      </main>
    }

    {publicPlaylistsCount> 0 &&
      <Category cat={'publicPlaylist'} id={id}/>
    }

    {allProfiles.filter(n => profile.followers.includes(n._id))?.length > 0 &&
      <Category cat={'followers'} id={id}/>
    }
    {allProfiles.filter(n => n.followers.includes(profile._id))?.length > 0 &&
      <Category cat={'following'} id={id}/>
    }

    <section className='  mt-20'>
      {/* <RecAlbam homeWidth={homeWidth}/> */}
    </section>


  </main>
  )
}

export default ProfileRoom