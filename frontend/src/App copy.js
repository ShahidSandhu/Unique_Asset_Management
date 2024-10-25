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
} from "react-bootstrap";
import {
  FaHome,
  FaChartBar,
  FaCogs,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaBell,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";



function Assets() {
  return <h2>Assets Content</h2>;
}

function Settings() {
  return <h2>Settings Content</h2>;
}

function Profile() {
  return <h2>Profile Content</h2>;
}

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3); // Sample notification count
  const user = { name: "John Doe" };
  
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
    <Router>
      <div className="dashboard">
        {/* Top Navbar */}
        <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
          <Container fluid>
            {/* Sidebar Toggle Button */}
            <Button
              variant="outline-light"
              className="me-2 toggle-button"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              <FaBars />
            </Button>
            <Navbar.Brand href="#">Advanced Dashboard</Navbar.Brand>
            {/* Search Bar */}
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
            {/* Right Side of Navbar */}
            <Nav className="ms-auto">
              {/* Notifications Icon */}
              <Nav.Link
                href="#notifications"
                className="text-light position-relative"
              >
                <FaBell />
                {notifications > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {notifications}
                  </Badge>
                )}
              </Nav.Link>
              {/* User Profile Dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-basic"
                  className="d-flex align-items-center"
                >
                  <FaUserCircle size="1.5em" className="me-2" />
                  <span>{user.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="#settings">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#logout">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Container>
        </Navbar>
        {/* Sidebar and Main Content */}
        <Container fluid className="main-container">
          <Row>
            {/* Sidebar */}
            {isSidebarOpen && (
              <Col md={2} className="sidebar bg-dark">
                <Nav className="flex-column">
                  <Nav.Link as={Link} to="/home" className="sidebar-link">
                    <FaHome className="me-2" /> Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dashboard" className="sidebar-link">
                    <FaChartBar className="me-2" /> Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/settings" className="sidebar-link">
                    <FaCogs className="me-2" /> Settings
                  </Nav.Link>
                  <Nav.Link as={Link} to="/profile" className="sidebar-link">
                    <FaUser className="me-2" /> Profile
                  </Nav.Link>
                </Nav>
              </Col>
            )}
            {/* Main Content */}
            <Col
              md={isSidebarOpen ? 10 : 12}
              className={`main-content ${
                isSidebarOpen ? "expanded" : "collapsed"
              }`}
            >
              <Routes>
                <Route path="/assets" element={<Assets />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
