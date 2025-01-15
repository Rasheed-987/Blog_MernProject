import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your React frontend's URL
}));
const mongodb_URL = process.env.mongodb_URL;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(mongodb_URL)
    .then(() => {
        console.log("Connected to database", mongoose.connection.db.databaseName);
    })
    .catch((err) => {
        console.log(`Error connecting to database: ${err}`);
    });

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Ensures each article has a unique name
    },
    title: {
        type: String,
        required: true // The title of the article
    },
    content: {
        type: [String], // An array of strings to hold multiple content sections
        required: true
    },
    upvote: {
        type: Number,
        default: 0 // Optional field for upvotes, defaulting to 0
    },
    comments: [
        {
            postedBy: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }
    ]
});

const Blog = mongoose.model('Blog', schema);

// Get an article by name
app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    console.log('Querying for article:', name);
    
    try {
        const article = await Blog.findOne({ name });
        if (article) {
            res.status(200).json(article);
        } else {
            res.status(404).send('Article not found');
        }
    } catch (err) {
       
    }
});

// Add a comment to an article

app.post('/api/articles/:name/comments', async (req, res) => {
    console.log('Received request on /api/articles/:name/comments');
    const { name } = req.params;
    const { postedBy, text } = req.body;
    console.log(postedBy,text)
    console.log(name)
    // Check if required fields are provided

    if (!postedBy || !text) {
        return res.status(400).send('PostedBy and text are required');
    }
    const article = await Blog.findOne({ name });
    console.log(`Found article: ${article ? article.name : 'None'}`);

    if (article) {
        article.comments.push({ postedBy, text });
        
        // Await the save operation
        await article.save();
        // res.status(201).json(article.comments);
        res.json(article)
    } else {
        res.status(404).send('Article not found');
    }
});
// Upvote an article
app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    
    try {
        const article = await Blog.findOne({ name });
        console.log(`Found article: ${article ? article.name : 'None'}`);
        
        if (article) {
            article.upvote += 1;    
            // Await the save operation
            await article.save();
            
            // Send the updated upvote count
        
            res.json(article)
        } else {
            res.status(404).send('Article not found');
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => {
    console.log('Port is running on 3000');
});
