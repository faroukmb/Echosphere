import {useContext, useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom"
import { context } from "../context/context";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const {backendurl,token,navigate} = useContext(context);
  const [image,setImage] =useState(null)


  async function updatePost(ev) {
    ev.preventDefault();
    try {
    const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    image && data.append("image", image);
    data.append('id', id);
    const res = await axios.post(backendurl+ "/api/post/edit",data,{headers:{token}});
    if(res.data.success){
      toast.success(res.data.message);
      navigate("/")
    }
    else{
      console.log(res.data.message);
      
    }
    } catch (error) {
       console.log(error);
       navigate(`/post/${id}`);
    }
    
     
  }
  

  return (
    <div>
      <form className="flex flex-col items-center mt-11" onSubmit={updatePost}>
        <input
          type="title"
          name="title"
          placeholder={"Title"}
          value={title}
          className="border border-black w-1/2 px-1 py-3 rounded-md mb-3"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          name="summary"
          placeholder={"Summary"}
          value={summary}
          className="border border-black w-1/2 px-1 py-3 rounded-md mb-3"
          onChange={(e) => setSummary(e.target.value)}
        />

        <textarea
          className="border border-black w-1/2 mb-3  h-52"
          name="content"
          value={content}
          placeholder="Tap your new  content here"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <input
          type="file"
          name="image"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <button className="p-3 bg-yellow-400 mt-3 rounded-md">Edit Post</button>
      </form>
    </div>
  );}
  