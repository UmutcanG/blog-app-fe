import React, { useEffect, useState, useMemo } from 'react';
import { getUsers, deleteUser } from '../../services/api'; 
import { useNavigate } from 'react-router-dom';
import './Users.css'; 

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const roles = useMemo(() => JSON.parse(localStorage.getItem('roles')) || [], []);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!roles.includes("ADMIN")) {
                navigate('/welcome');
                return;
            }

            try {
                const response = await getUsers();

                const filteredUsers = (Array.isArray(response.data) ? response.data : []).filter(user => !user.roles.includes('ADMIN'));
                setUsers(filteredUsers);
            } catch (error) {
                console.error('Error fetching users', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate, roles]);

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(userId);
                setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
                console.error('Error deleting user', error);
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Users</h2>
            <div className="users-container">
                {users.map(user => (
                    <div key={user.id} className="user-card">
                        <span>{user.username}</span>
                        {roles.includes('ADMIN') && (
                            <button onClick={() => handleDelete(user.id)} className="delete-button">
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
