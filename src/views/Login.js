import React from 'react';
import { Container, Row, Col, Card, Form, FormInput, Button } from 'shards-react';
import Loader from '../components/Loader/Loader';
import { APIService } from './../utils/APIService';
import userLoginStatus from './../utils/userLoginStatus';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';

class LoginContainer extends React.Component {
	constructor(props) {
		super(props);

		if (queryString.parse(this.props.location.search).logout) {
			APIService.logout();
		}

		this.state = {
			username: '',
			password: '',
			submitted: false,
			loginStatus: undefined,
			loading: false,
			error: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		if (this.state.loginStatus === undefined) {
			userLoginStatus().then(
				(value) => {
					this.setState({ loginStatus: true });
				},
				(reason) => {
					this.setState({ loginStatus: false });
				}
			);
		}
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true });
		const { username, password } = this.state;

		// stop here if form is invalid
		if (!(username && password)) {
			return;
		}
		this.setState({ loading: true });
		APIService.login(username, password).then(
			(user) => {
				const { from } = this.props.location.state || {
					from: { pathname: 'dashboard' }
				};
				this.props.history.push(from);
			},
			(error) => {
				if (error.errorMessage) {
					error.errorMessage = 'Invalid credentials';
				}
				this.setState({ error, loading: false });
			}
		);
	}

	render() {
		const { username, password, loading, error, loginStatus } = this.state;
		if (loading) {
			return <Loader />;
		}
		if (loginStatus === undefined) {
			return <div>default UI</div>;
		} else if (loginStatus) {
			return <Redirect to="/dashboard" />;
		} else {
			return (
				<Container fluid className="container h-100" style={{ marginTop: 100 }}>
					<Row className="row h-100 justify-content-center align-items-center">
						<Col lg="5" className="mb-4">
							<Row className="justify-content-center align-items-center">{error.errorMessage}</Row>
							{/* Complete Form Example */}
							<Card small className="py-4">
								<Container>
									<Row>
										<Col>
											<Form onSubmit={this.handleSubmit}>
												<Row form>
													<Col className="form-group">
														<label htmlFor="feEmailAddress">Email</label>
														<FormInput
															id="feEmailAddress"
															type="email"
															placeholder="Email"
															name="username"
															value={username}
															onChange={this.handleChange}
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
															value={password}
															onChange={this.handleChange}
														/>
													</Col>
												</Row>
												<Row form>
													<Col md="6"> &nbsp;</Col>
												</Row>
												<Row form>
													<Col md="6">
														<Button type="submit" disabled={loading}>
															Login
														</Button>
													</Col>
												</Row>
											</Form>
										</Col>
									</Row>
								</Container>
							</Card>
						</Col>
					</Row>
				</Container>
			);
		}
	}
}

export default LoginContainer;
