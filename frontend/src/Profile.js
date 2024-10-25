// Profile.js
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import { Container, Row, Col, Button, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <p>{error}</p>;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{profile.username}'s Profile</Card.Title>
              <Card.Text>
                <strong>Username:</strong> {profile.username}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {profile.email}
              </Card.Text>
              <Card.Text>
                <strong>First Name:</strong> {profile.first_name}
              </Card.Text>
              <Card.Text>
                <strong>Last Name:</strong> {profile.last_name}
              </Card.Text>
              <Button as={Link} to="/profile/edit" variant="primary">
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
