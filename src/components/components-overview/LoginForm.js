import React from "react";
import { Container, Row, Col, Form, FormInput, Button } from "shards-react";

class LoginForm extends React.Component {
  state = { email: "", password: "" };

  loginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.onSubmit(email, password);
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <Row form>
                <Col className="form-group">
                  <label htmlFor="feEmailAddress">Email</label>
                  <FormInput
                    id="feEmailAddress"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </Col>
              </Row>

              <Row form>
                <Col className="form-group">
                  <label htmlFor="fePassword">Password</label>
                  <FormInput
                    id="fePassword"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.Password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </Col>
              </Row>
              <Row form>
                <Col md="6"> &nbsp;</Col>
              </Row>
              <Row form>
                <Col md="6">
                  <Button type="submit" onClick={this.loginSubmit}>
                    Login
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginForm;
