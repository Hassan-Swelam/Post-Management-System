import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:3000/users/me', 
                { headers: { Authorization: `Bearer ${token}` }});
            setUser(data.data.user);
        };
        fetchUserDetails();
    }, []);

    return (
        <>
            <h1>User Details</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </>
    );
};

export default UserDetails;