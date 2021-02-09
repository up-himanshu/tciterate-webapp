import React from 'react';
import {
	Container,
	Row,
	Col,
	Card,
	// CardHeader,
	CardBody,
	FormTextarea,
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

class AddEditUser extends React.Component {
	constructor(props) {
		super(props);
		// console.log('props in constructor ', props);
		this.state = {
			loginStatus: undefined,
			success: false,
			redirect: false,
			loading: false,
			listItems: false,
			internetConnected: true,
			visible: false,
			project_id: this.props.match.params.project_id,
			update: this.props.location.state ? this.props.location.state.update : false,
			id: this.props.location.state ? this.props.location.state.id : '',
			title: this.props.location.state ? this.props.location.state.title : '',
			description: this.props.location.state ? this.props.location.state.description : '',
			expected_results: this.props.location.state ? this.props.location.state.expected_results : '',
			profile_change: false,
			countries: [],
			states: [],
			cities: []
		};
		this._handleSubmitAdd = this._handleSubmitAdd.bind(this);
		this._handleSubmitUpdate = this._handleSubmitUpdate.bind(this);
		this.dismiss = this.dismiss.bind(this);
	}

	componentDidMount() {
		if (this.state.loginStatus === undefined) {
			userLoginStatus().then(
				(value) => {
					this.setState({
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

	_handleSubmitAdd(e) {
		e.preventDefault();
		this.setState({ loading: true });
		// const { firstName, lastName } = this.state;
		console.log('this.state.project_id', this.state.project_id);
		APIService.addProjectTestCase(this.state.project_id, this.state).then(
			(unit) => {
				this.setState({
					success: true,
					loading: false,
					redirect: true,
					redirectPath: '/projects/' + this.state.project_id + '/testcases',
					redirectData: {
						visible: true,
						alertStyle: 'success',
						alertIcon: 'fa fa-check mx-2',
						alertMessage: 'Test Case added successfully.'
					}
				});
			},
			(error) => {
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

	_handleSubmitUpdate(e) {
		e.preventDefault();
		let { id, title, description, expected_results } = this.state;
		APIService.updateProjectTestCase(id, { title, description, expected_results }).then(
			(unit) => {
				this.setState({
					success: true,
					loading: false,
					redirect: true,
					redirectPath: '/projects/' + this.state.project_id + '/testcases',
					redirectData: {
						visible: true,
						alertStyle: 'success',
						alertIcon: 'fa fa-check mx-2',
						alertMessage: 'Test case updated successfully.'
					}
				});
			},

			(error) => {
				// alert(JSON.stringify(error, null, 2));
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
			<Form onSubmit={this.state.update ? this._handleSubmitUpdate : this._handleSubmitAdd}>
				<Row form>
					<Col md={{ size: 6, order: 6 }} className="form-group p-3">
						<label htmlFor="feTitle">Test Case Title*</label>
						<FormInput
							id="feTitle"
							type="text"
							placeholder="Title that explain the test case in one line"
							name="title"
							onChange={(e) => {
								this.setState({ title: e.target.value });
								this.value = this.state.title;
							}}
							value={this.state.title}
						/>
					</Col>
				</Row>

				<Row form>
					<Col md={{ size: 6, order: 6 }} className="form-group p-3">
						<label htmlFor="feDescription">Description</label>
						<FormTextarea
							id="feDescription"
							rows="10"
							placeholder="Precondition, steps, test case type, etc."
							name="description"
							onChange={(e) => {
								this.setState({ description: e.target.value });
								this.value = this.state.description;
							}}
							value={this.state.description}
						/>
					</Col>
					<Col md={{ size: 6, order: 6 }} className="form-group p-3">
						<label htmlFor="feExpectedResults">Expected Results*</label>
						<FormTextarea
							id="feExpectedResults"
							rows="10"
							placeholder="Expected Results"
							name="expected_results"
							onChange={(e) => {
								this.setState({ expected_results: e.target.value });
								this.value = this.state.expected_results;
							}}
							value={this.state.expected_results}
						/>
					</Col>
				</Row>

				<Row form>
					<Col sm={{ size: 6, order: 6, offset: 5 }}>
						{this.state.update ? (
							<Button type="submit">Update Test Case</Button>
						) : (
							<Button type="submit">Add Test Case</Button>
						)}
					</Col>
				</Row>
			</Form>
		);
	}

	render() {
		const { loginStatus, loading, internetConnected, project_id } = this.state;
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
						<MainTitle title="Test Cases" />
						<Row>
							<Col>
								<Card small className="mb-4">
									<ContentHeader title={this.state.update ? 'Edit Test Case' : 'Add Test Case'}>
										<Button
											outline
											theme="primary"
											className="mb-2 mr-1"
											onClick={() => {
												if (
													window.confirm(
														'All your changes will be lost. Do you still want continue?'
													)
												) {
													this.setState({
														redirect: true,
														redirectPath: '/projects/' + project_id + '/testcases'
													});
												}
											}}
										>
											Back
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

export default AddEditUser;
