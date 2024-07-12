"use client";

import { useState } from "react";

const FindParkingPage = () => {
  const [parkingId, setParkingId] = useState("");
  const [parkingData, setParkingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleFetchParkingData = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/parking/${parkingId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setParkingData(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Find Parking Data</h1>
      <form onSubmit={handleFetchParkingData}>
        <label>
          Parking ID:
          <input
            type="text"
            value={parkingId}
            onChange={(e) => setParkingId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Find</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {parkingData && (
        <div>
          <h2>Parking Data</h2>
          <pre>{JSON.stringify(parkingData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FindParkingPage;
