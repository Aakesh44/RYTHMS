import React, { useContext } from 'react'
import song from '../images/song.jpg'
import { Link } from 'react-router-dom'
import DataContext from '../context/DataContext'

const SignInMust = () => {
    const {handleSignPopUpClose,setSignInMust} = useContext(DataContext)


  return (
    <main className='sig cursor-default fixed inset-0 z-30 Flex'>

        <section className=' w-10/12 sm:w-1/2 h-1/2 flex sigdiv rounded-md items-center p-10'>
            <img src={song} alt="" className='h-56 w-56 hidden lg:block' />

            <div className=' h-fit gap-5 flex  flex-col justify-around items-center w-full lg:w-3/5 ml-auto text-sm lg:text-lg xl:text-2xl font-semibold'>
                <h1 className='w-10/12 mx-auto text-white'>Start listening with a free spotify account</h1>
                <Link to='/sign-up' onClick={()=>setSignInMust(false)} className='mx-auto w-fit p-2 px-4 bg-green-500 text-base text-black rounded-full'>
                    sign up free
                </Link>
                <button className='mx-auto hidden xl:block w-fit p-2 px-4 border border-black text-base text-black rounded-full'>
                    Download app
                </button>
                <h1 className=' text-sm Textwhite whitespace-nowrap'>
                    Already have an account? <Link to='/log-in' className=' underline' onClick={()=>setSignInMust(false)}>Log in</Link>
                </h1>

                <h1 className='text-xs cursor-pointer Textwhite' onClick={handleSignPopUpClose}>close</h1>
            </div>
        </section>      
    </main>
  )
}

export default SignInMust