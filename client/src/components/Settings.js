import React from 'react'
import {BiSearch} from 'react-icons/bi'

const Settings = () => {
  return (
    <main style={{marginTop:'9vh',maxWidth:'500px'}} className='w-full p-4 mx-auto'>
        
        <div className=' flex justify-between items-center text-2xl font-bold'>
            <h1>Seetings</h1>
            <BiSearch className='h-6 w-6'/>
        </div>

        <div className='mt-6 text-lg font-semibold'>
            <h1>Language</h1>
            <section className=' flex justify-between mt-3 Textgrey'>
                <h1 className=' text-sm'>Choose language - Changes will be applied after restarting the app</h1>
                <select name="lang" id="" className='w-44 bg-gray-600 text-sm py-1'>
                    <option value="English">English</option>
                    <option value="English">English</option>
                    <option value="English">English</option>
                </select>
            </section>
        </div>

        <div className=' mt-10 text-lg font-semibold'>

            <h1>Your Library</h1>
            <section className=' flex  text-sm Textgrey mt-5'>
                <h1>Use compact library layout</h1>

            </section>
        </div>
        <div className=' mt-10 text-lg font-semibold'>

            <h1>Your Library</h1>
            <section className='flex text-sm Textgrey mt-5'>
                <h1>Use compact library layout</h1>
                
            </section>
        </div>
    </main>
  )
}

export default Settings