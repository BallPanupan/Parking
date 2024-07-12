"use client";

import { useEffect, useState } from "react";

const CreateParkingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: {
      buildingId: "",
      floorId: "",
      zoneId: "",
    },
    status: "Available",
    packageId: "",
    exitNumber: "",
  });

  const [buildingOptions, setBuildingOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [zoneOptions, setZoneOptions] = useState([]);
  const [packageOptions, setPackageOptions] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [createResult, setCreateResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/parking/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create parking entry");
      }

      const data = await response.json();
      setCreateResult(data); // Store the result in state
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocationOptions = async () => {
    try {
      const response = await fetch("http://localhost:3000/locations");
      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }
      const data = await response.json();
      setBuildingOptions(data.data.filter((item) => item.type === "building"));
      setFloorOptions(data.data.filter((item) => item.type === "floor"));
      setZoneOptions(data.data.filter((item) => item.type === "zone"));
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const fetchPackageOptions = async () => {
    try {
      const response = await fetch("http://localhost:3000/parkingPackage/");
      if (!response.ok) {
        throw new Error("Failed to fetch parking packages");
      }
      const data = await response.json();
      setPackageOptions(data.data);
    } catch (error) {
      console.error("Error fetching parking packages:", error);
    }
  };

  useEffect(() => {
    fetchLocationOptions();
    fetchPackageOptions();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
      },
    }));
  };

  const handlePackageChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPackageId = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      packageId: selectedPackageId,
    }));

    // Find the selected package details
    const packageDetail = packageOptions.find(
      (pkg) => pkg._id === selectedPackageId
    );

    setSelectedPackage(packageDetail);
  };

  return (
    <div>
      <h1>Create Parking</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Building ID:
          <select
            name="buildingId"
            value={formData.location.buildingId}
            onChange={handleLocationChange}
            required
          >
            <option value="">Select Building ID</option>
            {buildingOptions.map((building) => (
              <option key={building._id} value={building._id}>
                {building.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Floor ID:
          <select
            name="floorId"
            value={formData.location.floorId}
            onChange={handleLocationChange}
            required
          >
            <option value="">Select Floor ID</option>
            {floorOptions.map((floor) => (
              <option key={floor._id} value={floor._id}>
                {floor.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Zone ID:
          <select
            name="zoneId"
            value={formData.location.zoneId}
            onChange={handleLocationChange}
            required
          >
            <option value="">Select Zone ID</option>
            {zoneOptions.map((zone) => (
              <option key={zone._id} value={zone._id}>
                {zone.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Package ID:
          <select
            name="packageId"
            value={formData.packageId}
            onChange={handlePackageChange}
            required
          >
            <option value="">Select Package ID</option>
            {packageOptions.map((pkg) => (
              <option key={pkg._id} value={pkg._id}>
                {pkg.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Package Details:
          {selectedPackage && (
            <pre>{JSON.stringify(selectedPackage, null, 2)}</pre>
          )}
        </label>
        <br />
        <label>
          Exit Number:
          <input
            type="text"
            name="exitNumber"
            value={formData.exitNumber}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Create Parking</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {createResult && (
        <div>
          <h2>Created Parking Entry</h2>
          <pre>{JSON.stringify(createResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CreateParkingForm;
