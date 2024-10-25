import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
import AuthContext, { AuthProvider } from "./AuthContext";
import Login from "./Login";
import Assets from "./Assets";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Collapse,
} from "react-bootstrap";
import {
  FaBars,
  FaHome,
  FaChartBar,
  FaCogs,
  FaUser,
  FaCaretDown,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Profile from "./Profile";
import EditProfile from "./EditProfile";

// Collapsible Left Sidebar Item Component
const SidebarItem = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Nav.Link
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        {title} <FaCaretDown className="ms-1" />
      </Nav.Link>
      <Collapse in={open}>
        <div className="ms-3">{children}</div>
      </Collapse>
    </>
  );
};

function AppContent() {
  const { user, logout } = useContext(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
        <Container fluid>
          <Button
            variant="outline-light"
            className="me-2 toggle-button"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </Button>
          <Navbar.Brand href="#">Dashboard</Navbar.Brand>
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* Sidebar and Main Content */}
      <Container fluid>
        <Row>
          {/* Left Sidebar with Nested Links */}
          {isSidebarOpen && (
            <Col md={2} className="sidebar bg-dark text-light">
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/home" className="sidebar-link">
                  <FaHome className="me-2" /> Home
                </Nav.Link>

                {/* Collapsible Sidebar Section for Assets */}
                <SidebarItem
                  title={
                    <>
                      <FaChartBar className="me-2" /> Assets
                    </>
                  }
                >
                  <Nav.Link as={Link} to="/assets" className="sidebar-sublink">
                    All Assets
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/assets/add"
                    className="sidebar-sublink"
                  >
                    Add Asset
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/assets/manage"
                    className="sidebar-sublink"
                  >
                    Manage Assets
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/assets/reports"
                    className="sidebar-sublink"
                  >
                    Reports
                  </Nav.Link>
                </SidebarItem>

                {/* Collapsible Sidebar Section for Settings */}
                <SidebarItem
                  title={
                    <>
                      <FaCogs className="me-2" /> Settings
                    </>
                  }
                >
                  <Nav.Link
                    as={Link}
                    to="/settings/account"
                    className="sidebar-sublink"
                  >
                    Account Settings
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/settings/preferences"
                    className="sidebar-sublink"
                  >
                    Preferences
                  </Nav.Link>
                </SidebarItem>

                {/* Collapsible Sidebar Section for Profile */}
                <SidebarItem
                  title={
                    <>
                      <FaUser className="me-2" /> Profile
                    </>
                  }
                >
                  <Nav.Link
                    as={Link}
                    to="/profile/edit"
                    className="sidebar-sublink"
                  >
                    Edit Profile
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/profile/activity"
                    className="sidebar-sublink"
                  >
                    Activity Log
                  </Nav.Link>
                </SidebarItem>
              </Nav>
            </Col>
          )}

          {/* Scrollable Main Content */}
          <Col
            md={isSidebarOpen ? 10 : 12}
            className="main-content scrollable-content"
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/assets"
                element={user ? <Assets /> : <Navigate to="/login" />}
              />
              <Route
                path="/profile"
                element={user ? <Profile /> : <Navigate to="/login" />}
              />
              <Route
                path="/profile/edit"
                element={user ? <EditProfile /> : <Navigate to="/login" />}
              />
              <Route
                path="/settings"
                element={
                  user ? <h2>Settings Content</h2> : <Navigate to="/login" />
                }
              />
              <Route path="/home" element={<h2>Home Content</h2>} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
