import express from 'express';  // ES module syntax 
import notesRoutes from './routes/notesRoutes.js'; // Importing the notes routes
import { connectDb } from './config/db.js'; // Importing the database connection function
import dotenv from 'dotenv'; // hide your MongoDB username and password using environment variables (.env)
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();// Loading environment variables from .env file

// Initialize the express application
const app = express();

// Connect to MongoDB
connectDb();

const PORT = process.env.PORT || 5003;

// Middleware to parse JSON requests and " use " method to add middleware
app.use(express.json()); /// this Middleware used to when request body is JSON before the response
app.use(rateLimiter); // Applying rate limiting middleware

//our simple middleware
// app.use((req, res, next) => { 
//   console.log(`Request Method: ${req.method}, Request URL: ${req.url}`); // Logging the request method and URL
//   next();
// });

// Routes
app.use("/api/notes", notesRoutes);

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// Error handling for server. this is extra part 
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ Port ${PORT} is busy, trying port ${PORT + 1}`);
    app.listen(PORT + 1, () => {
      console.log(`🚀 Server running on http://localhost:${PORT + 1}`);
    });
  } else {
    console.error('Server error:', err);
  }
});

//mongodb+srv://achinthaheshan2:KM3XSdTIJUW8BBlS@cluster0.gy4kddd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0