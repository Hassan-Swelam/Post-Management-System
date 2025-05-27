import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:3000/posts', 
                { headers: { Authorization: `Bearer ${token}` }});
            setPosts(data.data.myPosts);
        };
        fetchPosts();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <nav>
                <button onClick={() => navigate('/dashboard')}>Posts</button>
                <button onClick={() => navigate('/user-details')}>User Details</button>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <h1>Dashboard</h1>
            <button onClick={() => navigate('/create-post')}>Create Post</button>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <button onClick={() => navigate(`/edit-post/${post._id}`)}>Edit</button>
                        <button onClick={async () => {
                            try {
                                const token = localStorage.getItem('token');
                                await axios.delete(`http://localhost:3000/posts/${post._id}`, {
                                    headers: { Authorization: `Bearer ${token}` },
                                });
                                setPosts(posts.filter((p) => p._id !== post._id));
                            } catch (error) {
                                console.error('Error deleting post:', error);
                            }
                        }}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Dashboard;