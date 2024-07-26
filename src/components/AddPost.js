import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddPost.css'; 

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAddPost = async (e) => {
        e.preventDefault();
        try {
            const authorId = localStorage.getItem('authorId'); 

            const response = await axios.post('http://localhost:8080/posts/add-post',
                { title, content },
                {
                    params: { authorId: authorId }, 
                    withCredentials: true
                }
            );

            console.log('Post added successfully:', response.data); 
            navigate('/posts'); 
        } catch (error) {
            console.error('Error adding post:', error.response ? error.response.data : error.message);
            setError('Error adding post');
        }
    };

    return (
        <div className="add-post-container">
            <h2>Add New Post</h2>
            <form onSubmit={handleAddPost} className="add-post-form">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="form-textarea"
                    />
                </div>
                <button type="submit" className="submit-button">Add Post</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default AddPost;
