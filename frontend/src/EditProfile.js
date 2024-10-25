// EditProfile.js
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Alert,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/profile/");
        setProfile(response.data);
      } catch (err) {
        setError("Failed to fetch profile information.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await axios.put("http://127.0.0.1:8000/api/profile/", profile);
      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner animation="border" variant="primary" />;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Edit Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={profile.first_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={profile.last_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditProfile;
