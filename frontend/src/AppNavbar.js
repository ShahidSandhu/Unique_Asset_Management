import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import AuthContext from "./AuthContext";

function AppNavbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#">Dashboard</Navbar.Brand>
      <Nav className="ms-auto">
        {user ? (
          <>
            <Nav.Link href="#profile">Profile</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </>
        ) : (
          <Nav.Link href="/login">Login</Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
}

export default AppNavbar;
