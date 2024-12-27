import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';  // Import path module
import { fileURLToPath } from 'url';  // Import this function to handle ES modules

// Routes
import bookRoute from './route/book.route.js';
import userRoute from './route/user.route.js';

dotenv.config();
const app = express();
const _dirname=path.resolve()
// Get current directory using fileURLToPath and import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  // Now we can use __dirname

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (including PDFs) from the "public/pdfs" folder
app.use('/pdfs', express.static(path.join(__dirname, '../frontend/public', 'pdfs')));
 // Serving the PDFs folder

const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

// Connect to MongoDB
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("MongoDB connection error:", error);
});

// Set up routes
app.use('/book', bookRoute);
app.use('/user', userRoute);
app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
