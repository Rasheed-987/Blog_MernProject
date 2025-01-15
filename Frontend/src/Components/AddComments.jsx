import axios from 'axios';
import React, { useState } from 'react';

const AddComments = ({ articleName, onArticleUpdated }) => {
    const [commentName, setCommentName] = useState('');
    const [commentText, setCommentText] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevents default form submission behavior

        try {
            // Make API request to add a comment
            const response = await axios.post(`http://localhost:3000/api/articles/${articleName}/comments`, {
                postedBy: commentName,
                text: commentText,
            });
            const updatedArticle = response.data;

            // Notify the parent about the updated article
            onArticleUpdated(updatedArticle);

            // Reset form fields
            setCommentName('');
            setCommentText('');
        } catch (err) {
            console.error('Error adding comment:', err);
        }
    };

    return (
        <div className="p-4 bg-gray-100 rounded-md">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="postedBy"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Posted By:
                    </label>
                    <input
                        type="text"
                        id="postedBy"
                        name="postedBy"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="text"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Comment:
                    </label>
                    <textarea
                        id="text"
                        name="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        rows="4"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-800 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddComments;
