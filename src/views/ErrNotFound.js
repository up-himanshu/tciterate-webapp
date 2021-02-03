import React from 'react';
import { Container, Button } from 'shards-react';
import { Link } from 'react-router-dom';

const ErrNotFound = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h2>404</h2>
        <h3>Not Found!</h3>
        <p>Path you're looking to open does not exist.</p>
        <Button tag={Link} to="/">
          Home
        </Button>
      </div>
    </div>
  </Container>
);

export default ErrNotFound;
