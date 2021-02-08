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
	FormCheckbox,
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
			projectTestCases: JSON.parse(localStorage.getItem('projectTestCases')),
			test_case_ids: [],
			profile_change: false,
			countries: [],
			states: [],
			cities: []
		};
		this._handleChange = this._handleChange.bind(this);
		this._handleSubmitAdd = this._handleSubmitAdd.bind(this);
		this._handleSubmitUpdate = this._handleSubmitUpdate.bind(this);
		this.dismiss = this.dismiss.bind(this);
	}

	componentDidMount() {
		if (this.state.loginStatus === undefined) {
			userLoginStatus().then(
				(value) => {
					let test_case_ids = [];
					this.state.projectTestCases.map((tc) => {
						test_case_ids.push(tc.id);
					});
					this.setState({
						loginStatus: true,
						loading: false,
						test_case_ids
					});
				},
				(reason) => {
					this.setState({ loginStatus: false });
				}
			);
		}
	}

	_handleChange(e, current, value) {
		// const { name, value } = e.target;
		let { test_case_ids } = this.state;
		// this.setState({ [name]: value });
		if (current) {
			test_case_ids = test_case_ids.filter((item) => item !== value);
			this.setState({ test_case_ids });
		} else {
			test_case_ids.push(value);
			this.setState({ test_case_ids });
		}
	}

	_handleSubmitAdd(e) {
		e.preventDefault();
		let { name, test_case_ids, project_id } = this.state;
		if (!name) {
			alert('Please fill name.');
			return;
		}
		if (!test_case_ids.length) {
			alert('You need to select at least one test case.');
			return;
		}
		this.setState({ loading: true });
		// const { firstName, lastName } = this.state;
		APIService.addProjectExecution(project_id, { name, test_case_ids }).then(
			(unit) => {
				this.setState({
					success: true,
					loading: false,
					redirect: true,
					redirectPath: '/projects/' + this.state.project_id + '/executions',
					redirectData: {
						visible: true,
						alertStyle: 'success',
						alertIcon: 'fa fa-check mx-2',
						alertMessage: 'Execution added successfully.'
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
		// const { name } = this.state;
		const id = this.state.id;
		// console.log(name);
		APIService.updateUser(id, this.state).then(
			(unit) => {
				this.setState({
					success: true,
					loading: false,
					redirect: true,
					redirectPath: '/users',
					redirectData: {
						visible: true,
						alertStyle: 'success',
						alertIcon: 'fa fa-check mx-2',
						alertMessage: 'User updated successfully.'
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

	_renderItems(item) {
		let { test_case_ids } = this.state;
		return (
			<Col md={{ size: 12 }} className="ml-2" key={item.id.toString()}>
				<FormCheckbox
					id="fc1"
					checked={test_case_ids.includes(item.id)}
					onChange={(e) => this._handleChange(e, test_case_ids.includes(item.id), item.id)}
				>
					{item.title}
				</FormCheckbox>
			</Col>
		);
	}

	_renderForm() {
		this._renderItems = this._renderItems.bind(this);
		let tableRows = this.state.projectTestCases.map(this._renderItems);
		return (
			<Form onSubmit={this.state.update ? this._handleSubmitUpdate : this._handleSubmitAdd}>
				<Row form>
					<Col md={{ size: 6, order: 6 }} className="form-group p-3">
						<label htmlFor="feName">Name*</label>
						<FormInput
							id="feName"
							type="text"
							placeholder="Execution Name"
							name="name"
							onChange={(e) => {
								this.setState({ name: e.target.value });
								this.value = this.state.name;
							}}
							value={this.state.name}
						/>
					</Col>
				</Row>

				<Row form>
					<Col md={{ size: 12 }} className="ml-2 pb-3">
						<strong>Select Test Cases</strong>
					</Col>
					{tableRows}
				</Row>

				<Row form>
					<Col sm={{ size: 6, order: 6, offset: 5 }}>
						{this.state.update ? (
							<Button type="submit">Update Execution</Button>
						) : (
							<Button type="submit">Add Execution</Button>
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
														redirectPath: '/projects/' + project_id + '/executions'
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
