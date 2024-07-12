"use client";
// pages/admin/create-user.tsx

import React, { useState } from 'react';
import axios from 'axios'; // Assuming axios is installed

const CreateUserPage: React.FC = () => {
    const [name, setName] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [status, setStatus] = useState('Active');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/', {
                name,
                carNumber,
                status
            });
            console.log('User created successfully:', response.data);
            // Optionally, redirect to a success page or handle success message
        } catch (error) {
            console.error('Error creating user:', error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <div className="container">
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Car Number:
                    <input
                        type="text"
                        value={carNumber}
                        onChange={(e) => setCarNumber(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Status:
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </label>
                <button type="submit">Create User</button>
            </form>
            <style jsx>{`
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }

                form {
                    display: flex;
                    flex-direction: column;
                }

                label {
                    margin-bottom: 10px;
                }

                input, select, button {
                    margin-top: 5px;
                    padding: 8px;
                    font-size: 16px;
                }

                button {
                    background-color: #0070f3;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #0058a3;
                }
            `}</style>
        </div>
    );
}

export default CreateUserPage;
