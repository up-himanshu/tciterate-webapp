import React from 'react';
import {
	Container,
	Row,
	Col,
	Card,
	// CardHeader,
	CardBody,
	Button,
	// ButtonGroup,
	Form,
	FormInput,
	Alert
} from 'shards-react';
// import PageTitle from '../../components/common/PageTitle';
import MainTitle from '../../components/common/MainTitle';
import ContentHeader from '../../components/common/ContentHeader';
// import Test from '../../components/common/Test';
import Loader from '../../components/Loader/Loader';
import { Redirect } from 'react-router-dom';
import { APIService } from '../../utils/APIService';
import userLoginStatus from '../../utils/userLoginStatus';

class AdminProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginStatus: undefined,
			success: false,
			redirect: false,
			loading: false,
			internetConnected: true,
			visible: false,
			userData: JSON.parse(localStorage.getItem('user')),
			email: '',
			password: '',
			id: this.props.location.state ? this.props.location.state.id : ''
		};

		this._handleChange = this._handleChange.bind(this);
		this._handleSubmitUpdate = this._handleSubmitUpdate.bind(this);
		this.dismiss = this.dismiss.bind(this);
	}

	componentDidMount() {
		if (this.state.loginStatus === undefined) {
			userLoginStatus().then(
				(value) => {
					this.setState({
						email: this.state.userData.email,
						loginStatus: true,
						loading: false
					});
				},
				(reason) => {
					this.setState({ loginStatus: false });
				}
			);
		}
	}

	_handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	_handleSubmitUpdate(e) {
		e.preventDefault();
		//const id = this.state.id;
		// console.log(name);
		APIService.updateUserProfile({ password: this.state.password }).then(
			(data) => {
				this.setState({
					success: true,
					loading: false,
					redirect: false,
					visible: true,
					alertStyle: 'success',
					password: '',
					alertIcon: 'fa fa-check mx-2',
					alertMessage: 'Profile updated successfully.'
				});
			},

			(error) => {
				console.log('error == ' + error);

				this.setState({
					success: false,
					loading: false,
					visible: true,
					alertStyle: 'danger',
					alertIcon: 'fa fa-exclamation mx-2',
					alertMessage: error.errorMessage
				});
			}
		);
	}

	dismiss() {
		this.setState({ visible: false });
	}

	_renderForm() {
		return (
			<Form onSubmit={this._handleSubmitUpdate}>
				<Row className="py-5 px-4">
					<Col md="7">
						<Row form>
							{/* <Col md="12" className="form-group">
								<label htmlFor="feInputName" className="mb-1">
									Name
								</label>
								<FormInput id="feInputName" />
							</Col> */}

							<Col md="12" className="form-group">
								<label htmlFor="feInputEmail" className="mb-1">
									Email
								</label>
								<FormInput id="feInputEmail" value={this.state.email} disabled />
							</Col>

							<Col md="12" className="form-group">
								<label htmlFor="fePassword" className="mb-1">
									Password
								</label>
								<FormInput
									id="fePassword"
									type="password	"
									placeholder="Enter new password"
									name="password"
									onChange={(e) => {
										this.setState({ password: e.target.value });
										this.value = this.state.password;
									}}
									value={this.state.password}
								/>
							</Col>
						</Row>
					</Col>
				</Row>

				<Row form>
					<Col md="4" sm={{ size: 6, order: 6, offset: 5 }}>
						<Button type="submit">Update Profile</Button>
					</Col>
				</Row>
			</Form>
		);
	}

	render() {
		const { loginStatus, loading, internetConnected } = this.state;
		if (this.state.redirect) {
			return (
				<Redirect
					to={{
						pathname: this.state.redirectPath,
						state: this.state.redirectData
					}}
				/>
			);
		}
		if (!internetConnected) {
			return <div>No Internet Connection.</div>;
		}
		if (loading) {
			return <Loader />;
		}
		if (loginStatus === undefined) {
			return <Loader />;
		} else if (loginStatus) {
			return (
				<div>
					<Container fluid className="px-0">
						<Alert
							theme={this.state.alertStyle || 'primary'}
							dismissible={this.dismiss}
							open={this.state.visible}
							className="mb-0"
						>
							<i className={this.state.alertIcon} /> {this.state.alertMessage}
						</Alert>
					</Container>
					<Container fluid className="main-content-container px-4">
						<MainTitle title="Profile" />
						<Row>
							<Col>
								<Card small className="mb-4">
									<ContentHeader title="">
										<Button
											outline
											theme="primary"
											className="mb-2 mr-1"
											onClick={() =>
												this.setState({
													redirect: true,
													redirectPath: '/dashboard'
												})
											}
										>
											Exit
										</Button>
									</ContentHeader>
									<CardBody className="p-0 pb-3">{this._renderForm()}</CardBody>
								</Card>
							</Col>
						</Row>
					</Container>
				</div>
			);
		} else {
			return <Redirect to="/login" />;
		}
	}
}

export default AdminProfile;
