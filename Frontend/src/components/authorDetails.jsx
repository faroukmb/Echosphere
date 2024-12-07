import React from 'react'
import mainimage from "../assets/teck.jpg";
const AuthorDetails = () => {
  return (
    <div className='flex items-center '>
        <img className='h-10 w-10 mr-2' src={mainimage} alt="" />
        <p className='font-semibold'>By : sebastian haller <br /> just Now</p>
    </div>
  )
}

export default AuthorDetails