import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddComment from '../AddComment/AddComment';
import './PostDetails.css';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');
    const roles = JSON.parse(localStorage.getItem('roles')) || [];

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/posts/${id}`, { withCredentials: true });
                setPost(response.data);
                setComments(response.data.comments || []);
            } catch (error) {
                console.error('Error fetching post:', error);
                setError('Failed to fetch post');
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this post?");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8080/posts/${id}`, { withCredentials: true });
                navigate('/posts');
            } catch (error) {
                console.error('Error deleting post:', error);
                setError('Failed to delete post');
            }
        }
    };

    const handleDeleteComment = async (commentId) => {
        const confirmed = window.confirm("Are you sure you want to delete this comment?");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8080/comments/delete-comment/${commentId}`, { withCredentials: true });
                setComments(comments.filter(comment => comment.id !== commentId));
            } catch (error) {
                console.error('Error deleting comment:', error);
                setError('Failed to delete comment');
            }
        }
    };

    const handleNewComment = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className="post-details-container">
            <div className="post-container">
                <h2 className="post-title">{post.title || 'No Title'}</h2>
                <p className="post-content">{post.content || 'No Content'}</p>
            </div>
            <div className="comments-section">
                <h3 className="comments-heading">Comments</h3>
                <div className="comments-container">
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.id} className="comment-card">
                                <p className="comment-author">{comment.user?.username || 'Unknown User'}</p>
                                <p className="comment-content">{comment.content || 'No Content'}</p>
                                {roles.includes('ADMIN') && (
                                    <button onClick={() => handleDeleteComment(comment.id)} className="delete-comment-button">
                                        Delete Comment
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
            </div>
            {roles.includes('ADMIN') && (
                <button onClick={handleDelete} className="delete-button">
                    Delete Post
                </button>
            )}
            <AddComment postId={id} currentUserId={userId} onNewComment={handleNewComment} />
            {error && <p className="error-message">{error}</p>}
            <Link to="/posts" className="back-link">Back to Posts</Link>
        </div>
    );
};

export default PostDetails;
