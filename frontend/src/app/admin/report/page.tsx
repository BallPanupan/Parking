"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is installed

const ReportPage: React.FC = () => {
    const [reportData, setReportData] = useState<any>(null);
    const [startDate, setStartDate] = useState<number | undefined>(undefined); // State for Start Date in milliseconds
    const [endDate, setEndDate] = useState<number | undefined>(undefined);     // State for End Date in milliseconds

    useEffect(() => {
        // Default dates for initial report fetch
        const initialStartDate = new Date("2024-01-01").getTime();
        const initialEndDate = new Date("2024-12-31").getTime();
        fetchReportData(initialStartDate, initialEndDate);
    }, []);

    const fetchReportData = async (startDate: number | undefined, endDate: number | undefined) => {
        try {
            const response = await axios.get(`http://localhost:3000/report/?startDate=${startDate}&endDate=${endDate}`);
            setReportData(response.data);
        } catch (error) {
            console.error('Error fetching report data:', error);
            // Handle error, e.g., show an error message
        }
    };

    const handleDateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (startDate !== undefined && endDate !== undefined) {
            fetchReportData(startDate, endDate);
        } else {
            console.error('Please select both Start Date and End Date.');
            // Handle error, e.g., show an error message
        }
    };

    // Function to convert date string to milliseconds (Unix timestamp)
    const dateToMilliseconds = (dateString: string): number | undefined => {
        const dateObject = new Date(dateString);
        if (isNaN(dateObject.getTime())) {
            return undefined; // Invalid date
        }
        return dateObject.getTime();
    };

    return (
        <div className="container">
            <h1>Report Page</h1>

            {/* Date Input Form */}
            <form onSubmit={handleDateSubmit}>
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate ? new Date(startDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setStartDate(dateToMilliseconds(e.target.value))}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate ? new Date(endDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setEndDate(dateToMilliseconds(e.target.value))}
                    />
                </label>
                <button type="submit">Fetch Report</button>
            </form>

            {/* Report Data */}
            {reportData && (
                <div className="report-container">
                    <h2>Report Data</h2>
                    <p><strong>Start Date:</strong> {reportData.startDate}</p>
                    <p><strong>End Date:</strong> {reportData.endDate}</p>

                    <table>
                        <thead>
                            <tr>
                                <th>Parking Name</th>
                                <th>Total Cost</th>
                                <th>Total Time (minutes)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.data.map((item: any, index: number) => (
                                <tr key={index}>
                                    <td>{item.parkingName}</td>
                                    <td>{item.totalCost.toFixed(2)}</td>
                                    <td>{item.totalTimeUsingMinute.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Loading State */}
            {!reportData && (
                <p>Loading report data...</p>
            )}

            {/* Empty Data */}
            {reportData && reportData.data.length === 0 && (
                <p>No data available for the selected dates.</p>
            )}

            {/* Error Handling */}
            {reportData && reportData.error && (
                <p>Error fetching report data: {reportData.error.message}</p>
            )}

            {/* CSS Styling */}
            <style jsx>{`
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .report-container {
                    margin-top: 20px;
                    border: 1px solid #ddd;
                    padding: 20px;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }

                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }

                th {
                    background-color: #f2f2f2;
                }

                form {
                    margin-top: 20px;
                }

                label {
                    display: block;
                    margin-bottom: 10px;
                }

                input[type="date"] {
                    width: 100%;
                    padding: 8px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                button {
                    margin-top: 10px;
                    padding: 10px 20px;
                    font-size: 16px;
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

export default ReportPage;
