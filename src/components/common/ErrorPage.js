import React from "react";
import { Container, Button } from 'shards-react';
import { Link } from 'react-router-dom';

class ErrorPage extends React.Component {

	render() {
		const {code, statusText, message} = this.props;
		return (
			<Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h2>{code || null}</h2>
        <h3>{statusText || null}</h3>
        <p>{message || 'Some error has occurred.'}</p>
        <Button tag={Link} to="/">
          Home
        </Button>
      </div>
    </div>
  </Container>);
	}
}

export default ErrorPage;