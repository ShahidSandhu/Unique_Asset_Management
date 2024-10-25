// src/Assets.js
import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [value, setValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch assets on mount
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
    const assetData = { name, description, serial_number: serialNumber, value };
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
    <div>
      <h2>Assets Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}

      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Serial Number</Form.Label>
          <Form.Control
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Value</Form.Label>
          <Form.Control
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {editingId ? "Update Asset" : "Add Asset"}
        </Button>
        <Button variant="secondary" onClick={resetForm} className="ms-2">
          Reset
        </Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Serial Number</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.name}</td>
              <td>{asset.description}</td>
              <td>{asset.serial_number}</td>
              <td>{asset.value}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(asset)}
                  className="me-2"
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(asset.id)}
                >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Assets;
