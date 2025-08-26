import React from 'react'
import { Link } from 'react-router-dom'
import { PenSquare, TrashIcon } from 'lucide-react'
import { formatDate } from '../lib/utils.js' // Import the formatDate function
import api from '../lib/axios.js'
import toast from 'react-hot-toast'




// NoteCard component to display individual note details
const NoteCard = ({ Note }) => {

  const handleDelete = async (e,id) => {
    e.preventDefault(); // get rid of navigation behavior
    // Logic to delete the note
    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try {
         await api.delete(`/notes/${id}`);
         toast.success("Note deleted successfully");
         // Optionally, you can add logic to remove the note from the UI
         // For example, you could use a state management solution to update the UI
         window.location.reload(); // Simple way to refresh the list after deletion
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  }

  return (
    <Link
      to={`/notes/${Note._id}`}
      className='card bg-stone-950 shadow-md hover:shadow-lg transition-shadow duration-200 border-t-4 border-solid border-[#00FF9D]'
    >
      <div className="card-body"> 
        <h3 className='card-title text-base-content'>{Note.title}</h3> 
        <p className='text-base-content/70 line-clamp-3'>{Note.content}</p> 
        <div className='card-actions justify-between items-center mt-4'>
          <span className='text-sm text-base-content/60'>{formatDate(Note.createdAt)}</span>
          <div className='flex items-center gap-1'>
            <PenSquare className='size-4' />
            <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e, Note._id)}>
              <TrashIcon className='size-4' />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard