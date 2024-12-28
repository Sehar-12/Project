import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import bookRoute from './route/book.route.js';
import userRoute from './route/user.route.js';

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/pdfs', express.static(path.join(__dirname, 'frontend/public/pdfs')));

const PORT = process.env.PORT || 4002;
const URI = process.env.MongoDBURI;

if (!URI) {
    console.error("MongoDB URI is missing");
    process.exit(1);
}

mongoose.connect(URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

app.use('/book', bookRoute);
app.use('/user', userRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
