import React from 'react'
import Category from './Category'

const CategoryRoom = () => {
  return (
    <div className='MarginTop  mb-16 sm:mb-0' >

        <Category cat={'topsongs'} /> 

        <Category cat={'albums'}/>        

        <Category cat={'playlist'}/>

        <Category cat={'tamilsongs'}/>

        <Category cat={'rahman'}/>

        <Category cat={'artist'}/>
        
    </div>
  )
}

export default CategoryRoom