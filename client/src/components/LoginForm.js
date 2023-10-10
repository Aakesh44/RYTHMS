import React, { useContext, useState } from "react";
import {FcGoogle} from 'react-icons/fc'
import {FaFacebook,FaSpotify} from 'react-icons/fa'
import {AiFillApple} from 'react-icons/ai'
import axios from "axios";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";
const LoginForm =()=>{

const {handleUser,setMainUser} = useContext(DataContext)

 const [email,setEmail] = useState("")
 const [password,setpassword] = useState("")
 const [error,setError] = useState(false)
 const [loading,setLoading] = useState(false)


 const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        const response = await axios.post(
            "https://rythms-three.vercel.app/log-in",
            {
                email: email,
                password: password
            },
            config
        );
        // console.log(response);
        // setUserData(response.data)
        setError(false)
        
        localStorage.setItem('userinfo',JSON.stringify(response.data))
        setLoading(false)
        handleUser()
        setMainUser(response.data)
    } catch (error) {
        console.log(error.message);
        setError(true)
    }
 }
    return(
        <main className="fixed inset-0 bg-black z-10 Flex">
            <main className=" w-full h-full relative Bgblack overflow-y-scroll">

                <Link to='/' className="  h-20 w-fit text-2xl font-semibold px-10 gap-2 flex items-center mb-16">
                    <FaSpotify className=" h-8 w-8"/>
                    Spotify
                </Link>

                <section style={{width:'350px',maxWidth:'350px'}} className="  mx-auto flex flex-col">
                    <h1 style={{lineHeight:'1',fontSize:'40px'}} className="  font-semibold mx-auto mb-12">Log in to Spotify</h1>

                    <section className=" bg-black w-10/12 mx-auto mb-10">

                        <button className=" w-full  grid items-center py-3 mb-2 border border-gray-500 rounded-full font-semibold" style={{gridTemplateColumns:'1fr 3fr'}}>
                            <FcGoogle className="w-6 h-6 mx-6"/> 
                            <h1>Continue with Google</h1>
                        </button>

                        <button className=" w-full  grid items-center py-3 mb-2 border border-gray-500 rounded-full font-semibold" style={{gridTemplateColumns:'1fr 3fr'}}>
                            <FaFacebook className="w-6 h-6 mx-6 "/>
                            <h1>Continue with Facebook</h1> 
                        </button>

                        <button className=" w-full  grid items-center py-3 mb-2 border border-gray-500 rounded-full font-semibold" style={{gridTemplateColumns:'1fr 3fr'}}>
                            <AiFillApple className="w-6 h-6 mx-6"/> 
                            <h1>Continue with Apple</h1>
                        </button>

                        <button className=" w-full  flex justify-center items-center py-3 mb-2 border border-gray-500 rounded-full font-semibold">
                            Continue with phone number
                        </button>
                    </section>

                    <span style={{height:'0.1px',width:'400px'}} className=" bg-gray-700 mb-10"></span>

                    <div style={{visibility:!error && 'hidden'}} className=" bg-red-600 h-10 mb-10 flex items-center text-base font-semibold px-5">
                        <h1>Invalid email or password</h1>
                    </div>
                    <div style={{visibility:!loading && 'hidden'}} className=" bg-amber-500 h-10 mb-10 flex items-center text-base font-semibold px-5">
                        <h1>Loading ...</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full bg-black px-5 text-base font-semibold">

                        <div>
                            <h1>Email</h1>
                            <input 
                            type="text" 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className="h-12 w-full my-2 bg-transparent border border-gray-400 px-2 outline-none rounded hover:border-white focus:border-2"/>

                        </div>
                        <div className="mt-5">
                            <h1>Password</h1>
                            <input 
                            type="password" 
                            value={password}
                            onChange={(e)=>setpassword(e.target.value)}
                            className="h-12 w-full my-2 bg-transparent border border-gray-400 px-2 outline-none rounded hover:border-white focus:border-2"/>

                        </div>

                        <input type="submit" value="Log In" className="my-10 bg-green-500 w-full py-3 rounded-full text-black font-semibold hover:scale-105"/>

                        <span className=" w-full flex justify-center underline"><h1 className=" Textwhite cursor-pointer mb-8">Forgot your password?</h1></span>
                    </form>

                    <span style={{height:'0.1px',width:'400px'}} className=" bg-gray-700 mb-10"></span>
                    
                    <div className=" w-full flex justify-center items-center Textgrey font-semibold mb-20">
                        <h1>Don't have an account? <Link to='/sign-up' className=" text-sm underline Textwhite">Sign up for Spotify</Link></h1>
                    </div>
                </section>
            </main>

        </main>
    )
}

export default LoginForm