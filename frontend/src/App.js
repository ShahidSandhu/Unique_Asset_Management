import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [value, setValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/assets/");
      setAssets(response.data);
    } catch (err) {
      setError("Error fetching assets");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assetData = {
      name,
      description,
      serial_number: serialNumber,
      value,
    };

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (editingId) {
        await axios.put(
          `http://127.0.0.1:8000/api/assets/${editingId}/`,
          assetData
        );
        setSuccessMessage("Asset updated successfully");
      } else {
        await axios.post("http://127.0.0.1:8000/api/assets/", assetData);
        setSuccessMessage("Asset added successfully");
      }
      resetForm();
      fetchAssets();
    } catch (err) {
      setError("Error submitting asset");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (asset) => {
    setName(asset.name);
    setDescription(asset.description);
    setSerialNumber(asset.serial_number);
    setValue(asset.value);
    setEditingId(asset.id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await axios.delete(`http://127.0.0.1:8000/api/assets/${id}/`);
      setSuccessMessage("Asset deleted successfully");
      fetchAssets();
    } catch (err) {
      setError("Error deleting asset");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setSerialNumber("");
    setValue("");
    setEditingId(null);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <a href="#assets">Manage Assets</a>
          </li>
          <li>
            <a href="#analytics">Analytics</a>
          </li>
          <li>
            <a href="#settings">Settings</a>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="content-header">
          <h1>Asset Management</h1>
        </div>

        <div className="form-section">
          <form className="asset-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Asset Name"
                required
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Asset Description"
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="Serial Number"
                required
              />
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Asset Value"
                required
              />
            </div>
            <div className="form-actions">
              <button className="submit-btn" type="submit" disabled={loading}>
                {editingId ? "Update Asset" : "Add Asset"}
              </button>
              {editingId && (
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="content-body">
          <h2>Assets</h2>

          {loading && <p>Loading...</p>}
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}

          <div className="asset-grid">
            {assets.map((asset) => (
              <div key={asset.id} className="asset-card">
                <div className="asset-card-body">
                  <h3>{asset.name}</h3>
                  <p>{asset.description}</p>
                  <p>
                    <strong>Serial:</strong> {asset.serial_number}
                  </p>
                  <p>
                    <strong>Value:</strong> ${asset.value}
                  </p>
                </div>
                <div className="asset-card-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(asset)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(asset.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
