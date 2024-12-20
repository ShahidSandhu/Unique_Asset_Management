// src/Assets.js
import React, { useState, useEffect } from "react";
import { Table, Button, Form, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [value, setValue] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [makeId, setMakeId] = useState("");
  const [modelId, setModelId] = useState("");
  const [statusId, setStatusId] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Fetch assets and dropdown options on mount
  useEffect(() => {
    fetchAssets();
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const [
        categoriesRes,
        vendorsRes,
        makesRes,
        modelsRes,
        statusesRes,
        departmentsRes,
      ] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/categories/"),
        axios.get("http://127.0.0.1:8000/api/vendors/"),
        axios.get("http://127.0.0.1:8000/api/makes/"),
        axios.get("http://127.0.0.1:8000/api/models/"),
        axios.get("http://127.0.0.1:8000/api/statuses/"),
        axios.get("http://127.0.0.1:8000/api/departments/"),
      ]);
      setCategories(categoriesRes.data);
      setVendors(vendorsRes.data);
      setMakes(makesRes.data);
      setModels(modelsRes.data);
      setStatuses(statusesRes.data);
      setDepartments(departmentsRes.data);
    } catch (err) {
      setError("Error fetching dropdown data");
    }
  };

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
      category: categoryId,
      vendor: vendorId,
      make: makeId,
      model: modelId,
      status: statusId,
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
    setCategoryId(asset.category?.id || "");
    setVendorId(asset.vendor?.id || "");
    setMakeId(asset.make?.id || "");
    setModelId(asset.model?.id || "");
    setStatusId(asset.status?.id || "");
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
    setCategoryId("");
    setVendorId("");
    setMakeId("");
    setModelId("");
    setStatusId("");
    setEditingId(null);
  };

  return (
    <div>
      <h2>Assets Management</h2>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

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

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Vendor</Form.Label>
          <Form.Select
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
            required
          >
            <option value="">Select Vendor</option>
            {vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Make</Form.Label>
          <Form.Select
            value={makeId}
            onChange={(e) => setMakeId(e.target.value)}
            required
          >
            <option value="">Select Make</option>
            {makes.map((make) => (
              <option key={make.id} value={make.id}>
                {make.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Model</Form.Label>
          <Form.Select
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
            required
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={statusId}
            onChange={(e) => setStatusId(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.status}
              </option>
            ))}
          </Form.Select>
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
