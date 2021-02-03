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
	Alert,
	FormSelect
} from 'shards-react';
// import PageTitle from '../../components/common/PageTitle';
import MainTitle from '../../components/common/MainTitle';
import ContentHeader from '../../components/common/ContentHeader';
// import Test from '../../components/common/Test';
import Loader from '../../components/Loader/Loader';
import { Redirect } from 'react-router-dom';
import { APIService } from '../../utils/APIService';
import userLoginStatus from '../../utils/userLoginStatus';

class AddEditAdmin extends React.Component {
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
			first_name: this.props.location.state ? this.props.location.state.first_name : '',
			last_name: this.props.location.state ? this.props.location.state.last_name : '',
			email: this.props.location.state ? this.props.location.state.email : '',
			password: this.props.location.state ? this.props.location.state.password : '',
			id: this.props.location.state ? this.props.location.state.id : '',
			role_type: this.props.location.state ? this.props.location.state.role_type : '',
			update: this.props.location.state ? this.props.location.state.update : false,
			country: this.props.location.state ? this.props.location.state.country : '',
			state: this.props.location.state ? this.props.location.state.state : '',
			city: this.props.location.state ? this.props.location.state.city : '',
			phone: this.props.location.state ? this.props.location.state.phone : '',
			zip_code: this.props.location.state ? this.props.location.state.zip_code : '',
			address_1: this.props.location.state ? this.props.location.state.address_1 : '',
			profile_photo: this.props.location.state ? this.props.location.state.profile_photo : '',
			profile_change: false,
			countries: [],
			states: [],
			cities: [],
			unitData: []
		};
		// console.log(this.state);
		this._handleChange = this._handleChange.bind(this);

		this._handleSubmitAdd = this._handleSubmitAdd.bind(this);
		this._handleSubmitUpdate = this._handleSubmitUpdate.bind(this);

		this._fetchListData = this._fetchListData.bind(this);

		this._handleChangeCountry = this._handleChangeCountry.bind(this);
		this._handleChangeState = this._handleChangeState.bind(this);
		this._handleChangeCity = this._handleChangeCity.bind(this);
		this._handleChangeImage = this._handleChangeImage.bind(this);
		this.dismiss = this.dismiss.bind(this);
	}

	componentDidMount() {
		if (this.state.loginStatus === undefined) {
			userLoginStatus().then(
				(value) => {
					this._fetchCountryData();
					this._fetchListData();

					if (this.state.update) {
						this._fetchStateData();
						this._fetchCityData();
					}
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

	_fetchListData = () => {
		APIService.fetchAllAdminRoleType().then(
			(units) => {
				this.setState({
					unitData: units
				});
			},
			(error) => this.setState({ internetConnected: false })
		);
	};

	_fetchCountryData = () => {
		APIService.fetchCountry().then(
			(units) => {
				// console.log(units);
				this.setState({
					countries: units
				});
			},
			(error) => this.setState({ internetConnected: false })
		);
	};

	_fetchStateData = () => {
		const { country } = this.state;
		APIService.fetchState(country).then(
			(units) => {
				this.setState({
					states: units
				});
			},
			(error) => this.setState({ internetConnected: false })
		);
	};
	_fetchCityData = () => {
		const { state } = this.state;
		APIService.fetchCity(state).then(
			(units) => {
				this.setState({
					cities: units
				});
			},
			(error) => this.setState({ internetConnected: false })
		);
	};

	_handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	async _handleChangeCountry(e) {
		// console.log(e.target.value);
		await this.setState({ country: e.target.value });
		this._fetchStateData();
		// console.log(this.state);
	}

	async _handleChangeState(e) {
		await this.setState({ state: e.target.value });
		this._fetchCityData();
	}

	_handleChangeCity(e) {
		this.setState({ city: e.target.value });
	}

	_handleChangeImage(e) {
		// console.log(e.target.files[0]);
		this.setState({ profile_photo: e.target.files[0] });
		this.setState({ profile_change: true });
	}

	_handleSubmitAdd(e) {
		e.preventDefault();
		this.setState({ loading: true });
		// const { firstName, lastName } = this.state;
		// console.log(this.state);
		APIService.addSubAdmin(this.state).then(
			(unit) => {
				this.setState({
					success: true,
					loading: false,
					redirect: true,
					redirectPath: '/sub-admins',
					redirectData: {
						visible: true,
						alertStyle: 'success',
						alertIcon: 'fa fa-check mx-2',
						alertMessage: 'User added successfully.'
					}
				});
			},
			(error) => {
				alert(JSON.stringify(error, null, 2));
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
		APIService.updateSubAdmin(id, this.state).then(
			(unit) => {
				this.setState({
					success: true,
					loading: false,
					redirect: true,
					redirectPath: '/sub-admins',
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

	renderRow = (Obj, i) => {
		return (
			<option value={Obj.id} selected={this.state.role_type === Obj.id ? true : false} key={i}>
				{Obj.role_type}
			</option>
		);
	};

	renderCountry = (Obj, i) => {
		return (
			<option value={Obj.id} key={i} selected={this.state.country === Obj.id ? true : false}>
				{Obj.name}
			</option>
		);
	};
	renderState = (Obj, i) => {
		return (
			<option value={Obj.id} key={i} selected={this.state.state === Obj.id ? true : false}>
				{Obj.name}
			</option>
		);
	};
	renderCity = (Obj, i) => {
		return (
			<option value={Obj.id} key={i} selected={this.state.city === Obj.id ? true : false}>
				{Obj.name}
			</option>
		);
	};

	_renderForm(selectCountry, selectState, selectCity, selectBody) {
		return (
			<Form onSubmit={this.state.update ? this._handleSubmitUpdate : this._handleSubmitAdd}>
				<Row form>
					<Col md={{ size: 6, order: 6 }} className="form-group p-3">
						<label htmlFor="feFirstName">First Name</label>
						<FormInput
							id="feFirstName"
							type="text"
							placeholder="First Name"
							name="fistName"
							onChange={(e) => {
								this.setState({ first_name: e.target.value });
								this.value = this.state.first_name;
							}}
							value={this.state.first_name}
						/>
					</Col>
					<Col md={{ size: 6, order: 6 }} className="form-group p-3">
						<label htmlFor="feLastName">Last Name</label>
						<FormInput
							id="feLastName"
							placeholder="Last Name"
							type="text"
							name="lastName"
							onChange={(e) => {
								this.setState({ last_name: e.target.value });
								this.value = this.state.last_name;
							}}
							value={this.state.last_name}
						/>
					</Col>
				</Row>
				<Row form>
					<Col md={{ size: 6, order: 6 }} className="form-group p-3">
						<label htmlFor="feEmail">Email</label>
						<FormInput
							id="feEmail"
							type="email"
							placeholder="Email"
							name="email"
							onChange={(e) => {
								this.setState({ email: e.target.value });
								this.value = this.state.email;
							}}
							value={this.state.email}
						/>
					</Col>
					<Col md={{ size: 6, order: 6 }} className="form-group p-3">
						<label htmlFor="feMobile">Mobile</label>
						<FormInput
							id="feMobile"
							type="text"
							placeholder="Mobile"
							name="mobile"
							onChange={(e) => {
								this.setState({ phone: e.target.value });
								this.value = this.state.phone;
							}}
							value={this.state.phone}
						/>
					</Col>
				</Row>
				<Row form>
					<Col md={{ size: 6, order: 6 }} className="form-group p-3">
						<label htmlFor="feCountry">Country</label>
						<FormSelect id="feCountry" name="country_id" onChange={this._handleChangeCountry}>
							<option>Choose</option>
							{selectCountry}
						</FormSelect>
					</Col>
					<Col md={{ size: 6, order: 6 }} className="form-group p-3">
						<label htmlFor="feState">State</label>
						<FormSelect id="feState" onChange={this._handleChangeState}>
							<option>Choose</option>
							{selectState}
						</FormSelect>
					</Col>
				</Row>
				<Row form>
					<Col md={{ size: 6, order: 6 }} className="form-group p-3">
						<label htmlFor="feCity">City</label>
						<FormSelect id="feCity" onChange={this._handleChangeCity}>
							<option>Choose</option>
							{selectCity}
						</FormSelect>
					</Col>
					<Col md={{ size: 6, order: 6 }} className="form-group p-3">
						<label htmlFor="feZip">Zip Code</label>
						<FormInput
							id="feZip"
							type="text"
							placeholder="Zip Code"
							name="zip_code"
							onChange={(e) => {
								this.setState({ zip_code: e.target.value });
								this.value = this.state.zip_code;
							}}
							value={this.state.zip_code}
						/>
					</Col>
				</Row>
				<Row form>
					<Col md={{ size: 6, order: 6 }} className="form-group p-3">
						<label htmlFor="feAddress">Address</label>
						<FormInput
							id="feAddress"
							type="text"
							placeholder="Address"
							name="address_1"
							onChange={(e) => {
								this.setState({ address_1: e.target.value });
								this.value = this.state.address_1;
							}}
							value={this.state.address_1}
						/>
					</Col>

					<Col md={{ size: 6, order: 6 }} className="form-group p-3">
						<label htmlFor="role_type">Role Type</label>
						<select
							className="mt-2 form-control"
							name="role_type"
							onChange={this._handleChange}
							id="role_type"
						>
							<option selected={this.state.role_type === '' ? true : false} disabled="disabled">
								Select Role
							</option>
							{selectBody}
						</select>
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
		this.renderCountry = this.renderCountry.bind(this);
		this.renderState = this.renderState.bind(this);
		this.renderCity = this.renderCity.bind(this);
		const selectCountry = this.state.countries.length > 0 && this.state.countries.map(this.renderCountry);
		const selectState = this.state.states.length > 0 && this.state.states.map(this.renderState);
		const selectCity = this.state.cities.length > 0 && this.state.cities.map(this.renderCity);

		this.renderRow = this.renderRow.bind(this);
		const selectBody = this.state.unitData.length > 0 && this.state.unitData.map(this.renderRow);

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
						<MainTitle title="Sub Admin" />
						<Row>
							<Col>
								<Card small className="mb-4">
									<ContentHeader title={this.state.update ? 'Edit Sub Admin' : 'Add Sub Admin'}>
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
														redirectPath: '/sub-admins'
													});
												}
											}}
										>
											Back
										</Button>
									</ContentHeader>
									<CardBody className="p-0 pb-3">
										{this._renderForm(selectCountry, selectState, selectCity, selectBody)}
									</CardBody>
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

export default AddEditAdmin;
