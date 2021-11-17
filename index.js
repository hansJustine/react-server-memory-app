
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

if (process.env.NODE_ENV !== 'production') dotenv.config();
const app = express();


app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const CONNECTION_URL = process.env.DB_URL || 'mongodb://localhost:27017/memory_app';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('mongo connection open!!!');
    })
    .catch(err => {
        console.log("ERROR!!!");
        console.log(err.message);
    })

app.use('/posts', postRoutes);


app.get('/', (req, res) => {
    res.send('Hello to Memories API');
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});