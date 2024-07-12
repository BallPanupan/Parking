"use client";
import React, { useState } from 'react';
import axios from 'axios'; // Assuming axios is installed

const CheckInPage: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [parkingId, setParkingId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckIn = async () => {
        if (!userId || !parkingId) {
            alert('Please enter both User ID and Parking ID.');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:3000/parking/', {
                userId,
                parkingId,
                action: 'IN'
            });
            console.log('Check-in successful:', response.data);
            // Optionally, handle success message or redirect
        } catch (error) {
            console.error('Error checking in:', error);
            // Handle error, e.g., show an error message
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'userId') {
            setUserId(value);
        } else if (name === 'parkingId') {
            setParkingId(value);
        }
    };

    return (
        <div className="container">
            <h1>Parking Check-In</h1>
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <label>
                    User ID:
                    <input
                        type="text"
                        name="userId"
                        value={userId}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Parking ID:
                    <input
                        type="text"
                        name="parkingId"
                        value={parkingId}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <button type="button" onClick={handleCheckIn} disabled={isLoading}>
                    {isLoading ? 'Checking In...' : 'Check In'}
                </button>
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
                    margin-top: 20px;
                }

                label {
                    margin-bottom: 10px;
                }

                input, button {
                    padding: 8px;
                    font-size: 16px;
                }

                button {
                    background-color: #0070f3;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 10px;
                }

                button:disabled {
                    background-color: #b3b3b3;
                    cursor: not-allowed;
                }

                button:hover {
                    background-color: #0058a3;
                }
            `}</style>
        </div>
    );
};

export default CheckInPage;
