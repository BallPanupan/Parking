"use client";
// src/app/admin/parking/update/page.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is installed

const UpdateParkingPage: React.FC = () => {
    const [buildings, setBuildings] = useState<any[]>([]);
    const [floors, setFloors] = useState<any[]>([]);
    const [zones, setZones] = useState<any[]>([]);
    const [packages, setPackages] = useState<any[]>([]);
    const [updateId, setUpdateId] = useState<string>(''); // State for storing update ID
    const [updateResult, setUpdateResult] = useState<any>(null); // State for storing update result
    const [selectedBuilding, setSelectedBuilding] = useState<string>('');
    const [selectedFloor, setSelectedFloor] = useState<string>('');
    const [selectedZone, setSelectedZone] = useState<string>('');
    const [selectedPackageId, setSelectedPackageId] = useState<string>(''); // State for selected package ID
    const [parkingName, setParkingName] = useState<string>('Park A10'); // Default parking name

    useEffect(() => {
        // Fetch packages data
        axios.get('http://localhost:3000/parkingPackage/')
            .then(response => {
                setPackages(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching packages:', error);
            });

        // Fetch locations data for buildings, floors, and zones
        axios.get('http://localhost:3000/locations')
            .then(response => {
                const locations = response.data.data;
                const buildingData = locations.filter((loc: any) => loc.type === 'building');
                const floorData = locations.filter((loc: any) => loc.type === 'floor');
                const zoneData = locations.filter((loc: any) => loc.type === 'zone');

                setBuildings(buildingData);
                setFloors(floorData);
                setZones(zoneData);
            })
            .catch(error => {
                console.error('Error fetching locations:', error);
            });
    }, []);

    const handleUpdate = () => {
        const updateData = {
            name: parkingName,
            location: {
                building: selectedBuilding,
                floor: selectedFloor,
                zone: selectedZone
            },
            status: "Active",
            packageId: selectedPackageId, // Changed to packageId
            exitNumber: "01"
        };

        axios.put(`http://localhost:3000/parking/${updateId}`, updateData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Update successful:', response.data);
            setUpdateResult(response.data); // Store update result in state
        })
        .catch(error => {
            console.error('Error updating parking:', error);
            // Handle error, e.g., show an error message
        });
    };

    return (
        <div>
            <h1>Update Parking Page</h1>

            {/* Input for update ID */}
            <div>
                <label>Update ID:</label>
                <input type="text" value={updateId} onChange={(e) => setUpdateId(e.target.value)} />
            </div>

            {/* Input for parking name */}
            <div>
                <label>Parking Name:</label>
                <input type="text" value={parkingName} onChange={(e) => setParkingName(e.target.value)} />
            </div>

            {/* Dropdowns for building, floor, zone, and package */}
            <div>
                <label>Building:</label>
                <select onChange={(e) => setSelectedBuilding(e.target.value)}>
                    {buildings.map(building => (
                        <option key={building._id} value={building._id}>{building.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>Floor:</label>
                <select onChange={(e) => setSelectedFloor(e.target.value)}>
                    {floors.map(floor => (
                        <option key={floor._id} value={floor._id}>{floor.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>Zone:</label>
                <select onChange={(e) => setSelectedZone(e.target.value)}>
                    {zones.map(zone => (
                        <option key={zone._id} value={zone._id}>{zone.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>Package:</label>
                <select onChange={(e) => setSelectedPackageId(e.target.value)}>
                    {packages.map(pkg => (
                        <option key={pkg._id} value={pkg._id}>{pkg.name}</option>
                    ))}
                </select>
            </div>

            {/* Update button */}
            <button onClick={handleUpdate}>Update Parking</button>

            {/* Display update result */}
            {updateResult && (
                <div>
                    <h2>Update Result:</h2>
                    <pre>{JSON.stringify(updateResult, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default UpdateParkingPage;
