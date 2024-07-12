"use client";

import { useEffect, useState } from "react";

interface ParkingData {
  _id: string;
  name: string;
  location: {
    buildingId?: string;
    floorId?: string;
    zoneId?: string;
  };
  status: string;
  packageId: string;
  exitNumber: string;
  deleted: boolean;
  createdAt: string;
  __v: number;
  customers: string;
}

const ParkingAdminPage = () => {
  const [parkingData, setParkingData] = useState<ParkingData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchParkingData = () => {
    setLoading(true);
    fetch("http://localhost:3000/parking/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setParkingData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchParkingData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Parking Data</h1>
      <button onClick={fetchParkingData}>Recheck</button>
      <pre>{JSON.stringify(parkingData, null, 2)}</pre>
    </div>
  );
};

export default ParkingAdminPage;
