import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comments from '../Components/Comments';
import articles from './article-content';
import Error404 from './Error404';
import AddComments from '../Components/AddComments';

const Articles = () => {
    const params = useParams();
    const { articleId } = params;

    const [articleInfo, setArticleInfo] = useState({ upvote: 0, comments: [] });

    // Fetch article data whenever articleId changes
    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/articles/${articleId}`);
                setArticleInfo(response.data);
            } catch (err) {
                console.error("Error fetching article data:", err);
            }
        };
        fetchArticleData();
    }, [articleId]);

    // Find the article based on the articleId
    const article = articles.find((article) => article.name === articleId);

    // Increment upvotes and fetch updated article info
    const Addupvote = async (event) => {
        event.preventDefault();
        try {
            // Increment upvotes
            let response= await axios.put(`http://localhost:3000/api/articles/${articleId}/upvote`);
            setArticleInfo(response.data);
        } catch (err) {
            console.error("Error updating upvotes:", err);
        }
    };

    // If the article is not found, show Error404
    if (!article) {
        return <Error404 />;
    }

    return (
        <div>
            <button onClick={Addupvote} className="bg-neutral-600">
                AddUpvote
            </button>
            <h2>Upvotes are {articleInfo.upvote}</h2>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            <Comments comments={articleInfo.comments} />
          <AddComments articleName={articleId} 
           onArticleUpdated={updatedArticle=>setArticleInfo(updatedArticle)}
          />
        </div>
    );
};

export default Articles;
