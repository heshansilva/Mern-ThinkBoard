import {useEffect, useState} from 'react'
import Navbar from '../component/navbar.jsx';
import RateLimitedUI from '../component/rateLimitedUi.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoteCard from '../component/NoteCard.jsx';

const HomePage = () => {
  const [isRatelimited, setIsRatelimited] = useState(false); // Example state to simulate rate limiting
  const [notes, setNotes] = useState([]); // Example state for notes
  const [loading, setLoading] = useState(true); // Example state for loading 

  useEffect(() => {
    const fetchNotesData = async () => {
      try {
        const res = await axios.get('http://localhost:5003/api/notes'); // Adjust the API endpoint as needed
        const data = res.data; //update our notes state
        setNotes(data);
        setIsRatelimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error);
        if (error.response?.status === 429) {
          setIsRatelimited(true); //if we have any error update the rate limiting state
        } else {
          toast.error('Failed to load notes. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotesData();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/*// Display rate limiting UI if applicable*/}
      {isRatelimited && <RateLimitedUI />} 

      {/* Loading and error states */}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {/*show notes*/}
        {notes.length > 0 && !isRatelimited && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} Note={note} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default HomePage;
