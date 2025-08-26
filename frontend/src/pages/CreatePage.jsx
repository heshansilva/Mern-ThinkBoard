import { AppWindowIcon, ArrowLeftIcon } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios.js';

const CreatePage = () => {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false);

  const navigator = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault(); //stop the page from refreshing

   //If title or content are empty → show a toast message (“All fields are required”).
    if(!title.trim() || !content.trim()){ 
       toast.error("All fields are required");
      return;
  }

  //Start loading
  setLoading(true);
  try {
    await api.post("/notes", {
      title,
      content
    })
    toast.success("Note created successfully");
    navigator("/"); //redirect to home page
  } catch (error) {
    console.log("error creating note:", error);
    if(error.response.status === 429) {
      toast.error("Slow down! You're creating notes too quickly.",{
        duration: 4000,
        position: "top-center",
        icon: "☠️"
      });
    } else {
      toast.error("Failed to create note");
    }
  }
  finally {
    setLoading(false);
}
  }


  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5'/>
            back to Note
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>

              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Note Title" 
                      className="input input-bordered" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                    />
                  </div>
             
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className='card-actions justify-end'>
                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading ? "creating": "Create Note"}
                  </button>
                </div>
              </form>

              
            </div>

          </div>

        </div>
      <h1>Create a New Post</h1>
      </div>

    </div>
  )
}

export default CreatePage
