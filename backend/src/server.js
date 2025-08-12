import express from 'express';  // ES module syntax
import notesRoutes from './routes/notesRoutes.js'; // Importing the notes routes
import { connectDb } from './config/db.js'; // Importing the database connection function
import dotenv from 'dotenv'; // hide your MongoDB username and password using environment variables (.env)

dotenv.config();// Loading environment variables from .env file

// Initialize the express application

const app = express();

connectDb();// Connecting to MongoDB
const PORT = process.env.PORT || 5001;


app.use("/api/notes", notesRoutes);



app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

//mongodb+srv://achinthaheshan2:KM3XSdTIJUW8BBlS@cluster0.gy4kddd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0