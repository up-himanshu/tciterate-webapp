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

class AddEditDisciplines extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginStatus: undefined,
			success: false,
			redirect: false,
			loading: false,
			listItems: false,
			internetConnected: true,
			visible: false,
			name: this.props.location.state ? this.props.location.state.name : '',
			id: this.props.location.state ? this.props.location.state.id : '',
			update: this.props.location.state ? this.props.location.state.update : false
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

	_handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	_handleSubmitAdd(e) {
		e.preventDefault();
		this.setState({ loading: true });
		const { name } = this.state;
		APIService.addDisciplines({
			name
		}).then(
			(unit) => {
				this.setState({
					success: true,
					loading: false,
					redirect: true,
					redirectPath: '/disciplines',
					redirectData: {
						visible: true,
						alertStyle: 'success',
						alertIcon: 'fa fa-check mx-2',
						alertMessage: 'Discipline added successfully.'
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

	_handleSubmitUpdate(e) {
		e.preventDefault();
		const { name } = this.state;
		const id = this.state.id;
		// console.log(name);
		APIService.updateDisciplines(id, name).then(
			(unit) => {
				this.setState({
					success: true,
					loading: false,
					redirect: true,
					redirectPath: '/disciplines',
					redirectData: {
						visible: true,
						alertStyle: 'success',
						alertIcon: 'fa fa-check mx-2',
						alertMessage: 'Discipline updated successfully.'
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
					<Col sm={{ size: 4, order: 4, offset: 4 }}>
						<FormInput
							id="unitName"
							type="text"
							placeholder="Discipline Name"
							name="name"
							value={this.state.name}
							onChange={this._handleChange}
						/>
					</Col>
				</Row>
				<Row form>
					<Col sm={{ size: 6, order: 6, offset: 5 }}>
						{this.state.update ? <Button type="submit">Update</Button> : <Button type="submit">Add</Button>}
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
						<MainTitle title="Discipline" />
						<Row>
							<Col>
								<Card small className="mb-4">
									<ContentHeader
										title={this.state.name === '' ? 'Add Discipline' : 'Edit Discipline'}
									>
										<Button
											outline
											theme="primary"
											className="mb-2 mr-1"
											onClick={() =>
												this.setState({
													redirect: true,
													redirectPath: '/disciplines'
												})
											}
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

export default AddEditDisciplines;
