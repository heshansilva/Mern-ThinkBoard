import {useEffect, useState} from 'react'
import Navbar from '../component/navbar.jsx';
import RateLimitedUI from '../component/rateLimitedUi.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [isRatelimited, setIsRatelimited] = useState(false); // Example state to simulate rate limiting
  const [notes, setNotes] = useState([]); // Example state for notes
  const [loading, setLoading] = useState(true); // Example state for loading 

  useEffect(() => {
    const fetchNotesData = async () => {
      try {
        const res = await axios.get('http://localhost:5003/api/notes'); // Adjust the API endpoint as needed
        const data = res.data;
        setNotes(data);
        setIsRatelimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error);
        if (error.response?.status === 429) {
          setIsRatelimited(true);
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
      {isRatelimited && <RateLimitedUI />}
    </div>
  );
};

export default HomePage;
