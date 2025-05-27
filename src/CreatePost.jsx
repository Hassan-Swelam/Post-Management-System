import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3000/posts',
            { title, content },
            { headers: { Authorization: `Bearer ${token}` } });
        navigate('/dashboard');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Post</h1>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            /><br />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            /><br />
            <button type="submit">Add</button>
        </form>
    );
};

export default CreatePost;