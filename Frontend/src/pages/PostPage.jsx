import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { context } from '../context/context';
import toast from 'react-hot-toast';
const PostPage = () => {
    const {id} = useParams();
    const [postData,setPostData]=useState({}) 
    const {posts} =useContext(context)
    const {backendurl,navigate,token,username} =useContext(context)
    const deletePost = async ()=>{
      try {
        const res = await axios.post(backendurl + "/api/post/delete",{id},{headers:{token}});
        if (res.data.success){
          toast.success("Post Deleted");
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    const getpost = async ()=>{
        try {
           const res =await axios.post(backendurl+"/api/post/single",{id});
           if(res.data.success){
            setPostData(res.data.post);
            console.log(res.data);
            
           }
           else{
            console.log("no data");
            
           }
        } catch (error) {
          console.log(error);
          
        }
      
      }
  
    
    
    useEffect(()=>{
       getpost();
  },[posts,id])
  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto my-8 p-6 border rounded-lg shadow-lg">
      <h2
        className="text-4xl font-bold text-center mb-4"
        style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
      >
        {postData.title}
      </h2>

      <p className="text-gray-500 text-sm mb-1">
        {new Date(postData.updatedAt).toLocaleString()}
      </p>
      <p className="font-medium text-gray-700">by @{postData.authorname}</p>
      {token && username === postData.authorname && (
        <div className="flex items-center">
          <button
            className="bg-red-600 px-4 py-2 rounded-md mr-2"
            onClick={() => {
              deletePost();
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              navigate(`/edit/${id}`);
            }}
            className="mt-6 px-4 py-2 bg-yellow-400 font-semibold rounded hover:bg-yellow-300 mb-6"
          >
            Edit this post
          </button>
        </div>
      )}

      <div className="flex justify-center w-full mb-6">
        <img
          src={postData.cover}
          className="object-cover h-72 w-full rounded-md"
          alt="Post cover"
        />
      </div>

      <div
        className="w-full leading-relaxed text-lg text-gray-800"
        style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
      >
        {postData.content}
      </div>
    </div>
  );
}

export default PostPage