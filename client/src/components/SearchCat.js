import React from 'react'
import { useContext } from 'react'
import DataContext from '../context/DataContext'
import SectionCards from './SectionCards'
import FeedCards from './FeedCards'

const SearchCat = ({cat}) => {

    const {homeWidth,searchQuery,allAlbums,allPlaylists,allProfiles,allArtists,} = useContext(DataContext)
    const query = searchQuery.split('%20').join('')

    const itemsToDisplay = [
      {width:350,count:2},
      {width:600,count:3},
      {width:800,count:4},
      {width:1000,count:5},
      {width:1200,count:6},
      {width:1400,count:7},
    ]

    let count = 0
  
    itemsToDisplay.forEach((n,i)=> homeWidth >= n.width ? count = n.count :null)

    let  topItems = null

    if(cat === 'playlist'){
      topItems = allPlaylists.filter(item => item.title.toLowerCase().split(" ").join("").trim().includes(query.toLowerCase())).slice(0,count)
    }
    else if(cat === 'albums'){
      topItems = allAlbums.filter(item => item.title.toLowerCase().split(" ").join("").trim().includes(query.toLowerCase())).slice(0,count)
    }  
    else if(cat === 'profiles'){
      topItems = allProfiles.filter(user => user.name.toLowerCase().split(" ").join("").trim().includes(query.toLowerCase())).slice(0,count)
    }  
    else if(cat === 'artist'){
      topItems = allArtists.filter(artist => artist.name.toLowerCase().split(" ").join("").trim().includes(query.toLowerCase())).slice(0,count)
    }

    // console.log(topItems);

  return (
    <>
      {topItems.length !== 0 && 
          <main className='Category hidden mt-10' >
            <main className=' w-full h-16 flex items-center justify-start px-5 '>
                <h1 className=' text-2xl font-bold cursor-pointer hover:underline'>           
                    {cat}
                </h1>

            </main>
            <section style={{gridTemplateColumns:`repeat(${count},1fr)`}} className='hidden sm:grid items-center'>
                
                {topItems?.map((item,ind)=>(
                    <SectionCards item={item} cat={cat} key={ind}/>
                ))
                }

            </section>
            <section className='Mobile'>
          
            {topItems?.map((item,ind)=>(
              <FeedCards item={item} cat={cat} key={ind}/>
            ))}
        
            </section> 
          </main>
      }
    </>

  )
}

export default SearchCat