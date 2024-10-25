import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Dropdown,
  Form,
  FormControl,
  Badge,
  Button,
  Table,
} from "react-bootstrap";
import {
  FaHome,
  FaChartBar,
  FaCogs,
  FaUser,
  FaBars,
  FaBell,
  FaUserCircle,
  FaSearch,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

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

  // Fetch assets data on load
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

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState({ name: "John Doe", loggedIn: true }); // Example user data

  const handleLogout = () => {
    setUser({ ...user, loggedIn: false });
    alert("Logged out successfully");
  };

  return (
    <Router>
      <div className="dashboard">
        <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
          <Container fluid>
            <Button
              variant="outline-light"
              className="me-2 toggle-button"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              <FaBars />
            </Button>
            <Navbar.Brand href="#">Advanced Dashboard</Navbar.Brand>
            <Form className="d-flex mx-auto">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light">
                <FaSearch />
              </Button>
            </Form>
            <Nav className="ms-auto">
              {user.loggedIn ? (
                <>
                  <Nav.Link className="text-light">{user.name}</Nav.Link>
                  <Nav.Link className="text-light" onClick={handleLogout}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login" className="text-light">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Container>
        </Navbar>

        <Container fluid className="main-container">
          <Row>
            {isSidebarOpen && (
              <Col md={2} className="sidebar bg-dark">
                <Nav className="flex-column">
                  <Nav.Link as={Link} to="/assets" className="sidebar-link">
                    <FaHome className="me-2" /> Assets
                  </Nav.Link>
                  <Nav.Link as={Link} to="/settings" className="sidebar-link">
                    <FaCogs className="me-2" /> Settings
                  </Nav.Link>
                </Nav>
              </Col>
            )}
            <Col
              md={isSidebarOpen ? 10 : 12}
              className={`main-content ${
                isSidebarOpen ? "expanded" : "collapsed"
              }`}
            >
              <Routes>
                <Route path="/assets" element={<Assets />} />
                {/* Add login and other routes as needed */}
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
