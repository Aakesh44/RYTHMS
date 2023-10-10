import React, { useContext } from "react";
import {AiOutlineClose} from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";

const MenuMobile =({setMenuOpen,menuOpen})=>{

    const {userData,mainUser} = useContext(DataContext)
const navigate = useNavigate()

const hanldeLogout = (e) =>{
    e.stopPropagation();
    localStorage.removeItem('userinfo')
    navigate('/')
    window.location.reload()
}
return(
    <main  className="bg-black  Textwhite  fixed top-0 right-0 left-0 bottom-0 z-50" data-aos="fade-left">

        <span className="p-3 w-full flex items-center justify-end">
            <AiOutlineClose onClick={()=>setMenuOpen(!menuOpen)} className="h-7 w-7"/>
        </span>

        {!userData && 
            <section className=" p-2 m-10 text-2xl font-semibold Textwhite">
                <Link to='/log-in' onClick={()=>setMenuOpen(false)}> <h1 className="my-5">Log in</h1> </Link>
                <Link to='/sign-up' onClick={()=>setMenuOpen(false)}> <h1 className="my-5">Sign up</h1> </Link>
            </section>
        }

        {userData && 
            <section className=" p-2 m-10 text-2xl font-semibold Textwhite">
                <Link to={`/profile/${mainUser._id}`} onClick={()=>setMenuOpen(false)} className="my-5">Profile</Link>
                <h1 className="my-5 cursor-pointer" onClick={(e)=>hanldeLogout(e)}>Log out</h1>
            </section>
        }

        <section className=" p-2 m-10 text-xxl font-semibold Textwhite">
            <h1 className="my-3">Premium</h1>
            <h1 className="my-3">Help</h1>
            <h1 className="my-3">Download</h1>
            <h1 className="my-3">Privacy</h1>
            <h1 className="my-3">Terms</h1>
        </section>
    </main>
)
}
export default MenuMobile