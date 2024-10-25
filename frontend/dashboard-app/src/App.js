import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Navbar, Nav, Container, Row, Col, Dropdown, Form, FormControl, Badge, Button} from 'react-bootstrap'
import { FaHome, FaChartBar, FaCogs, FaUser, FaSignOutAlt, FaBars, FaBell, FaUserCircle, FaSearch} from 'react-icons/fa'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function Home () {
  return <h2>Home Content</h2>
}

function Dashboard () {
  return <h2>Dashboard Content</h2>
}

function Settings () {
  return <h2>Settings Content</h2>
}

function Profile () {
  return <h2>Profile Content</h2>
}

function App () {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [notifications, setNotifications] = useState(3) // Sample notification count
  const user = { name: 'John Doe' }

  return (
    <Router>
      <div className='dashboard'>
        {/* Top Navbar */}
        <Navbar
          bg='dark'
          variant='dark'
          expand='lg'
          className='navbar'>
          <Container fluid>
            {/* Sidebar Toggle Button */}
            <Button variant='outline-light' className='me-2 toggle-button' onClick={() => setSidebarOpen(!isSidebarOpen)}>
              <FaBars />
            </Button>
            <Navbar.Brand href='#'>
              Advanced Dashboard
            </Navbar.Brand>
            {/* Search Bar */}
            <Form className='d-flex mx-auto'>
              <FormControl
                type='search'
                placeholder='Search'
                className='me-2'
                aria-label='Search' />
              <Button variant='outline-light'>
                <FaSearch />
              </Button>
            </Form>
            {/* Right Side of Navbar */}
            <Nav className='ms-auto'>
              {/* Notifications Icon */}
              <Nav.Link href='#notifications' className='text-light position-relative'>
                <FaBell />
                {notifications > 0 && (
                 <Badge bg='danger' pill className='position-absolute top-0 start-100 translate-middle'>
                   {notifications}
                 </Badge>
                 )}
              </Nav.Link>
              {/* User Profile Dropdown */}
              <Dropdown align='end'>
                <Dropdown.Toggle variant='dark' id='dropdown-basic' className='d-flex align-items-center'>
                  <FaUserCircle size='1.5em' className='me-2' />
                  <span>{user.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href='#profile'>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item href='#settings'>
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href='#logout'>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Container>
        </Navbar>
        {/* Sidebar and Main Content */}
        <Container fluid className='main-container'>
          <Row>
            {/* Sidebar */}
            {isSidebarOpen && (
             <Col md={2} className='sidebar bg-dark'>
             <Nav className='flex-column'>
               <Nav.Link as={Link} to='/home' className='sidebar-link'>
                 <FaHome className='me-2' /> Home
               </Nav.Link>
               <Nav.Link as={Link} to='/dashboard' className='sidebar-link'>
                 <FaChartBar className='me-2' /> Dashboard
               </Nav.Link>
               <Nav.Link as={Link} to='/settings' className='sidebar-link'>
                 <FaCogs className='me-2' /> Settings
               </Nav.Link>
               <Nav.Link as={Link} to='/profile' className='sidebar-link'>
                 <FaUser className='me-2' /> Profile
               </Nav.Link>
             </Nav>
             </Col>
             )}
            {/* Main Content */}
            <Col md={isSidebarOpen ? 10 : 12} className={`main-content ${
                isSidebarOpen ? "expanded" : "collapsed"
              }`}>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  )
}

export default App
