"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is installed

const UserPage: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users/');
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <div className="container">
            <h1>User Management</h1>
            <table>
                <thead>
                    <tr>
												<th>_id</th>
                        <th>Name</th>
                        <th>Car Number</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.carNumber}</td>
                            <td>{user.status}</td>
                            <td>{new Date(parseInt(user.createdAt)).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style jsx>{`
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }

                th {
                    background-color: #f2f2f2;
                }
            `}</style>
        </div>
    );
}

export default UserPage;
