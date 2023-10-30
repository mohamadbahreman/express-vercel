import express from "express";
import { PORT , mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

// Middleware for parsing req body
app.use(express.json());


//middleware for handling cors policy
//option 1 : allow all origins with default cors(*)
app.use(cors());

// option 2 : allow custom origins
// app.use(
//     cors({
//         origin : 'https://localhost:3000' ,
//         methods : ['GET' , 'POST' , 'PUT' , 'DELETE'] ,
//         allowedHeaders : ['Content-Type'] ,
// }));

app.get('/' , (req , res) => {
    console.log(req);
    return res.status(234).send('welcome to mern stack tutrial');
});

app.use('/books' , booksRoute);


// connection to the data base 
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('we connected to data base');
        app.listen(PORT ,  () => {
            console.log("app is running")
        });
        
    })
    .catch((error) => {
        console.log(error);
    })