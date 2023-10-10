import React, { useContext, useEffect, useState } from 'react'
import {FcGoogle} from 'react-icons/fc'
import {FaFacebook,FaSpotify} from 'react-icons/fa'
import {AiFillExclamationCircle,AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import DataContext from '../context/DataContext'

const SignUpForm = () => {

  const {handleUser,setMainUser} = useContext(DataContext)

  const [existError,setExistError] = useState(null)

  const [email,setEmail] = useState('')
  const [password,setPassWord] = useState('')
  const [name,setName] = useState("")

  const [year,setYear] = useState(null)
  const [month,setMonth] = useState('01')  ;
  const [date,setDate] = useState(null)
  const [dob,setDob] = useState(null)

  const handleDob = () =>{
    if(year && month && date){
      const dobStr = `${year}-${month}-${date}`
      // console.log('kk');
      setDob(dobStr)
    }
  }

  useEffect(()=>{
    handleDob()
  },[year,month,date])

  const [gender,setGender] = useState('male')

  const handleGender = (event) =>{
    setGender(event.target.id)
  }
  const [adPermission,setAdPermission] = useState(false)
  const [dataPermisson,setDataPermisson] = useState(false)

  const [showPassword,setShowPassword] = useState(false)

  const Schema = yup.object().shape({
    email:yup.string().email('Enter valid email').required('Email is required'),
    password:yup.string().required('Password is required').min(4,'min length 4').max(8,'max length 8'),
    username:yup.string().required('Username is required'),
    year:yup.string().required('Year is required'),
    month:yup.string().required('Month is required'),
    date:yup.string().required('Date is required'),
    // .test('isValidDate','Enter valid date',(value)=>{const dateval = parseInt(value,10) ; return dateval >=1 && dateval <= 31}),
    gender:yup.string().required('Gender is required')
  })
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver:yupResolver(Schema),
    mode:'onTouched'
  })
  
 

  const handleSubmitForm =async () =>{
    // console.log('errors :',errors);
    // console.log(typeof(dob));
    // console.log('dob :',dob,'year :',year,'month :',month,'date :',date,);

    try {
      
      const config = {
        headers: {
            "Content-Type": "application/json"
        }
      }
    
      const response = await axios.post(
          "https://rythms-three.vercel.app/sign-up",
          {
              email:email,
              password: password,
              name:name,
              dob:dob,
              gender:gender
          },
          config
      );
      // console.log(response);
        // navigate('/')
        setExistError(null)
      localStorage.setItem('userinfo',JSON.stringify(response.data))
      handleUser()
      setMainUser(response.data)
      }
      
      catch(err){
        if (err.response.data.error) {
          setExistError(err.response.data.error)
          console.log(err.response);
        }
        else{
          console.log(err.message);
        }
      }

  }
  const togglePassword = () =>{
    setShowPassword(!showPassword)
  }

  return (
    <main  className=' fixed inset-0 bg-white z-10 flex justify-center  p-8 overflow-y-scroll'>
      
      <section style={{width:'500px',height:'1000px',maxWidth:'420px'}} className='  text-black'>

        <header className=' w-full  h-28 flex flex-col justify-between'>
          <h1 className='w-full flex items-center justify-center gap-1 text-lg font-bold'>
            <span><FaSpotify className=' h-7 w-7'/></span>
            Spotify
          </h1>

          <h1 
          style={{fontSize:'26px'}}
          className=' text-3xl font-bold'>Sign up for free to start listening.</h1>
        </header>

        <section className=' h-36  flex flex-col justify-center gap-4'>

          <button className=' bg-sky-700 Textwhite w-5/6 flex items-center justify-center gap-5 mx-auto text-base font-semibold py-3 rounded-full hover:scale-105'>
            <FaFacebook className=' h-6 w-6'/>
            <h1>Sign up with Facebook</h1>
          </button>
          <button
          //  onClick={handleSubmitForm} 
           className=' bg-white border-2 border-stone-600 w-5/6 flex items-center justify-center gap-5 mx-auto text-base font-semibold py-3 rounded-full hover:scale-105'>
            <FcGoogle className=' h-6 w-6'/>
            <h1>Sign up with Google</h1>
          </button>
        </section>

        <div className=' bg-white p-1 flex items-center justify-center gap-2'>
          <span style={{height:'0.1px'}} className='w-2/5 bg-gray-300'></span>
          <span className='mx-3'>or</span>
          <span style={{height:'0.1px'}} className='w-2/5 bg-gray-300'></span>
        </div>

        <form 
        onSubmit={handleSubmit(handleSubmitForm)}
        className='w-full bg-white bg-cya n-500 p-2'>

          <div className=' flex flex-col gap-2 mb-5'>
            <label className=' text-sm font-bold'>What's your email?</label>
            <input  
            type="text" name="email" id="email" 
            {...register('email')}
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={{borderWidth:'2px',borderColor:errors.email ? 'red' : 'black'}}
            className=' h-12 border px-3 text-base font-semibold rounded outline-none placeholder:text-gray-500 placeholder:font-semibold'
            placeholder='Enter your email.'/>

            {errors.email &&
              <span className='flex items-center text-sm font-semibold text-red-700'> 
                <AiFillExclamationCircle className=' h-5 w-5'/>
                {errors.email.message}
              </span>
            }
            {existError &&
              <span className='flex items-center text-sm font-semibold text-red-700'> 
                <AiFillExclamationCircle className=' h-5 w-5'/>
                {existError}
              </span>
            }
          </div>

          <div className=' flex flex-col gap-2 mb-5'>
            <label className=' text-sm font-bold'>Create a password</label>

            <div className='w-full h-12 border rounded flex items-center justify-between' 
            style={{borderWidth:'2px',borderColor:errors.password ? 'red' : 'black'}}
            >
              <input  
              type= {showPassword ? 'text':"password" }
              name="password" id="password" 
              {...register('password')}
              value={password}
              onChange={(e)=>setPassWord(e.target.value)}
              className=' h-full w-11/12 px-3  text-base font-semibold rounded outline-none placeholder:text-gray-500 placeholder:font-semibold'
              placeholder='Create a password.'/>

              <span onClick={togglePassword} className=' text-gray-500'>
                {showPassword ? <AiOutlineEye className=' h-7 w-7 mx-2 cursor-pointer'/> : <AiOutlineEyeInvisible className=' h-7 w-7 mx-2 cursor-pointer'/>}
              </span>

            </div>

            {errors.password &&
              <span className='flex items-center text-sm font-semibold text-red-600'> 
                <AiFillExclamationCircle className=' h-5 w-5'/>
                {errors.password.message}
              </span>
            }
          </div>

          <div className=' flex flex-col gap-2 mb-5'>
            <label className=' text-sm font-bold'>What should we call you?</label>
            <input  
            type="text" name="username" id="username" 
            {...register('username')}
            value={name} onChange={(e)=>setName(e.target.value)}
            style={{borderWidth:'2px',borderColor:errors.username ? 'red' : 'black'}}
            className=' h-12 border px-3 border-red-600 text-base font-semibold rounded outline-none placeholder:text-gray-500 placeholder:font-semibold'
            placeholder='Enter a profile name.'/>

            {errors.username &&
              <span className='flex items-center text-sm font-semibold text-red-700'> 
                <AiFillExclamationCircle className=' h-5 w-5'/>
                {errors.username.message}
              </span>
            }
          </div>

          <div className=' flex flex-col gap-2 mb-5'>
            <label className=' text-sm font-bold'>What's your date of birth?</label>

            <main style={{gridTemplateColumns:''}} className='  flex'>
              <section className=' bg-re d-300 w-2/6 text-sm font-semibold'>
                <h1>Year</h1>
                <input 
                type="text" 
                style={{borderColor:errors.year ? 'red' : 'black'}}
                className='w-full h-12 border-2  text-lg font-semibold outline-none mt-2 rounded placeholder:Textgrey placeholder:text-base '
                placeholder='YYYY'
                name='year' id='year'
                {...register('year')}
                onChange={(e)=>{setYear(e.target.value)}}/>
              </section>
              <section className=' bg-re d-300 w-3/6 text-sm font-semibold mx-5'>
                <h1>Month</h1>
                <select 
                type="text" 
                id='months' name='months'
                {...register('month')}
                onChange={(e)=>{setMonth(e.target.value)}}
                style={{borderColor:errors.month ? 'red' : 'black'}}
                className='w-full h-12 border-2 text-base font-semibold outline-none mt-2 rounded placeholder:Textgrey placeholder:text-base '>
                  <option value="" disabled>Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">Septemper</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </section>
              <section className=' bg-re d-300 w-1/6 text-sm font-semibold'>
                <h1>Day</h1>
                <input 
                type="text"
                style={{borderColor:errors.date ? 'red' : 'black'}}
                className='w-full h-12 border-2 border-red-600 text-lg font-semibold outline-none mt-2 rounded placeholder:Textgrey placeholder:text-base '
                placeholder='DD'
                name='date' id='date'
                {...register('date')}
                onChange={(e)=>{setDate(e.target.value)}}/> 
              </section>
            </main>

            {errors.year&&
              <span className='flex items-center text-sm font-semibold text-red-700'> 
                <AiFillExclamationCircle className=' h-5 w-5'/>
                {errors.year.message}
              </span>
            }
            {errors.month&&
              <span className='flex items-center text-sm font-semibold text-red-700'> 
                <AiFillExclamationCircle className=' h-5 w-5'/>
                {errors.month.message}
              </span>
            }
            {errors.date&&
              <span className='flex items-center text-sm font-semibold text-red-700'> 
                <AiFillExclamationCircle className=' h-5 w-5'/>
                {errors.date.message}
              </span>
            }
          </div>

          <div className=' flex flex-col gap-2 mb-5'>
            <label className=' text-sm font-bold'>What's your gender?</label>
            
            <div style={{gridTemplateColumns:'repeat(4,1fr)',}} className='  grid text-sm font-semibold'>

              <span className='flex items-center gap-2 '>
                <input type="radio" name="gender" id="Male"   onChange={handleGender} 
                {...register('gender')}
                 />
                <label htmlFor="Male">Male</label>
              </span>

              <span className='flex items-center gap-2'>
                <input type="radio" name="gender" id="Female"   onChange={handleGender}   
                {...register('gender')}
                />           
                <label htmlFor="Female">Female</label>
              </span>

              <span className='flex items-center gap-2'>
                <input type="radio" name="gender" id="Non-binary"   onChange={handleGender}   
                {...register('gender')}
                />       
                <label htmlFor="Non-binary">Non-biary</label>
              </span>

              <span className='flex items-center gap-2'>
                <input type="radio" name="gender" id="Other"   onChange={handleGender}   
                {...register('gender')}
                />            
                <label htmlFor="Other">Other</label>
              </span>
            </div>

            <>
              <span className=' flex items-center gap-2 text-sm font-semibold'>
                <input type="radio" name="gender" id="Prefer not to say"  onChange={handleGender}   
                {...register('gender')}
                />
                <label htmlFor="Prefer not to say" className=' whitespace-nowrap'>Prefer not to say</label>
              </span>
            </>

            {errors.gender &&
              <span className='flex items-center text-sm font-semibold text-red-700'> 
                <AiFillExclamationCircle className=' h-5 w-5'/>
                {errors.gender.message}
              </span>
            }
          </div>

          <div className='flex items-center gap-2 text-xs font-semibold mb-8'>
            <input type="checkbox" name="data1" id="data1" className='h-4 w-4' onClick={()=>setAdPermission(!adPermission)}/>
            <label htmlFor='data1'>I would prefer not to receive marketing messages from Spotify</label>
          </div>

          <div className='flex gap-2 items-center text-xs font-semibold mb-8'>
          <input type="checkbox" name="data2" id="data2" className=' mb-auto' onClick={()=>setDataPermisson(!dataPermisson)} style={{minHeight:'16px',minWidth:'16px'}}/>
            <label htmlFor='data2' className=' mb-auto'>Share my registration data with Spotify's content providers for marketing purposes.</label>
          </div>

          <div style={{fontSize:'10px'}} className='font-medium flex justify-center mb-4'>
            <h1>By clicking on sign-up, you agree to Spotify's <span className=' text-green-500 underline cursor-pointer'>Terms and Conditions of Use. </span></h1>
          </div>

          <div style={{fontSize:'10px'}} className='flex justify-center mb-5'>
            <h1>To learn more about how Spotify collects, uses, shares and protects your personal data, please see <span className=' text-green-500 underline cursor-pointer'>Spotify's Privacy Policy.</span></h1>
          </div>

          <div className=' flex justify-center mb-5'>
            <input type="submit" value="Sign up" className=' text-lg font-bold bg-green-500 py-3 px-12 mx-auto rounded-full cursor-pointer hover:scale-105'/>
          </div>

          <div className='flex justify-center text-base font-semibold mb-32'>
            <h1>Have an account? <Link to='/log-in' className=' text-green-500 underline cursor-pointer'>Log in.</Link></h1>
          </div>
        </form>


      </section>

    </main>
  )
}

export default SignUpForm