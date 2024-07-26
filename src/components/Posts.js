import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Posts.css'; 

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/posts', { withCredentials: true });
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to fetch posts');
            }
        };

        fetchPosts();
    }, []);

    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="posts-container">
            <h2 className="posts-heading">Posts</h2>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post.id} className="post-card">
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-content">{post.content}</p>
                        <div className="post-actions">
                            <Link to={`/posts/${post.id}`} className="view-details-link">View Details</Link>
                        </div>
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

export default Posts;
