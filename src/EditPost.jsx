import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const { id } = useParams(); 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`http://localhost:3000/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTitle(data.data.myPost.title);
            setContent(data.data.myPost.content);
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.patch(
            `http://localhost:3000/posts/${id}`,
            { title, content },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        navigate('/dashboard');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Post</h1>
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
            <button type="submit">Update</button>
        </form>
    );
};

export default EditPost;