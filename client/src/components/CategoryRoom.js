import React from 'react'
import Category from './Category'
import MobileController from './MobileController'
const CategoryRoom = () => {
  return (
    <div className='MarginTop b' >

        <Category cat={'topsongs'} /> 

        <Category cat={'albums'}/>        

        <Category cat={'playlist'}/>

        <Category cat={'tamilsongs'}/>

        <Category cat={'rahman'}/>

        <Category cat={'artist'}/>

        <MobileController />
        
    </div>
  )
}

export default CategoryRoom