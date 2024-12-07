import React, { useContext } from 'react'
import Post from '../components/Post';
import { useState ,useEffect } from 'react';
import { context } from '../context/context';
import axios from "axios"
const Home = () => {
   const {posts, setPosts} = useContext(context);
   const {backendurl}=useContext(context)
  const getposts = async ()=>{
     try {
       const res = await axios.get(backendurl+ "/api/post/all");
       if(res.data.success){
        setPosts(res.data.posts);
       }
     } catch (error) {
       console.log(error);
       
     }
  }
  

let sortedPosts = posts.sort(
  (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

  useEffect(()=>{
    getposts()

  },[])

  return (
    <div className="flex flex-col items-center justify-center ">
      {sortedPosts.length > 0 ?
        sortedPosts.map((post, index) => {
          return <Post key={index} id={post._id} author={post.authorId} authorname={post.authorname} summary={post.summary} content={post.content} title={post.title} cover={post.cover} />;
        }) :
        <h1 className='flex justify-center items-center my-64 font-semibold text-2xl'>No Post Found!</h1>
      }
    </div>
  );
}

export default Home