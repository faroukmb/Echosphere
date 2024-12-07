import  { useContext } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { context } from '../context/context';
import toast from 'react-hot-toast';
const Create = () => {
   const [title, setTitle] = useState("");
   const [summary, setSummary] = useState("");
   const [content, setContent] = useState("");
   const [image, setImage] = useState(null);
   const {backendurl,navigate,token} =useContext(context)  
   const createpost = async(e)=>{
    e.preventDefault();
    try {
          const formData = new FormData();
          formData.append("title",title);
          formData.append("summary",summary);
          formData.append("content",content);
          image && formData.append("image",image);
          const res = await axios.post(backendurl+"/api/post/create",formData, {headers: {token}});
          if(res.data.success){
            console.log(res.data);
            toast.success("Post Added Successfully")
            setTitle("");
            setSummary("");
            setContent("");
            setImage(false);
             navigate("/");

          }
          else{
            toast.error(res.data.message);
            
          }

    } catch (error) {
      console.log(error);
      
    }
  
   }

      
  
  return (
    <div>
      <form onSubmit={createpost} className="flex flex-col items-center mt-11">
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
        
        <textarea className='border border-black w-1/2 mb-3 h-52' name='content' placeholder='Tap your content here' value={content} onChange={(e)=>{setContent(e.target.value)}} />
        <input type="file" name='image' onChange={(e)=>{setImage(e.target.files[0])}}  />
        <button className='p-3 bg-yellow-400 mt-3 rounded-md'>Create post</button>
      </form>
    </div>
  );
}
export default Create