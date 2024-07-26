import React, { useState } from 'react';
import axios from 'axios';
import './AddComment.css';

const AddComment = ({ postId, currentUserId, onNewComment }) => {
    const [content, setContent] = useState('');

    const handleAddComment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/comments/add-comment?postId=${postId}&authorId=${currentUserId}`, {
                content
            }, {
                withCredentials: true
            });
            setContent('');
            onNewComment(response.data);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <form onSubmit={handleAddComment} className="add-comment-form">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your comment here..."
                required
                className="comment-textarea"
            />
            <button type="submit" className="submit-comment-button">Add Comment</button>
        </form>
    );
};

export default AddComment;
