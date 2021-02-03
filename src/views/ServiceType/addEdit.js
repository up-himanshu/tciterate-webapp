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
	FormTextarea
} from 'shards-react';
// import PageTitle from '../../components/common/PageTitle';
import MainTitle from '../../components/common/MainTitle';
import ContentHeader from '../../components/common/ContentHeader';
// import Test from '../../components/common/Test';
import Loader from '../../components/Loader/Loader';
import { Redirect } from 'react-router-dom';
import { APIService } from '../../utils/APIService';
import userLoginStatus from '../../utils/userLoginStatus';

class AddEditServiceType extends React.Component {
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
			category_id: this.props.location.state ? this.props.location.state.category_id : '',
			sub_category_id: this.props.location.state ? this.props.location.state.sub_category_id : '',
			id: this.props.location.state ? this.props.location.state.id : '',
			update: this.props.location.state ? this.props.location.state.update : false,
			description: this.props.location.state ? this.props.location.state.description : '',
			unitData: [],
			subCategory: []
		};

		// console.log(this.state);

		this._handleChange = this._handleChange.bind(this);
		this._handleChangeCategory = this._handleChangeCategory.bind(this);
		this._handleChangeSubCategory = this._handleChangeSubCategory.bind(this);
		this._handleSubmitAdd = this._handleSubmitAdd.bind(this);
		this._handleSubmitUpdate = this._handleSubmitUpdate.bind(this);
		this.dismiss = this.dismiss.bind(this);
	}

	componentDidMount() {
		if (this.state.loginStatus === undefined) {
			userLoginStatus().then(
				(value) => {
					this._fetchListData();

					if (this.state.update) {
						this._fetchSubListData();
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
		APIService.fetchAllCategories().then(
			(units) => {
				this.setState({
					unitData: units
				});
			},
			(error) => this.setState({ internetConnected: false })
		);
	};

	_fetchSubListData = () => {
		const { category_id } = this.state;
		APIService.fetchSubCategory(category_id).then(
			(units) => {
				this.setState({
					subCategory: units
				});
			},
			(error) => this.setState({ internetConnected: false })
		);
	};

	_handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}
	async _handleChangeCategory(e) {
		await this.setState({ category_id: e.target.value });
		this._fetchSubListData();
	}

	_handleChangeSubCategory(e) {
		this.setState({ sub_category_id: e.target.value });
	}

	_handleSubmitAdd(e) {
		e.preventDefault();
		this.setState({ loading: true });
		const { name, sub_category_id, category_id, description } = this.state;
		// const sub_category_name = name;
		APIService.addServiceType({
			sub_category_id,
			name,
			category_id,
			description
		}).then(
			(unit) => {
				this.setState({
					success: true,
					loading: false,
					redirect: true,
					redirectPath: '/service-type',
					redirectData: {
						visible: true,
						alertStyle: 'success',
						alertIcon: 'fa fa-check mx-2',
						alertMessage: 'Service Type added successfully.'
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
		const { name, category_id, sub_category_id, description } = this.state;
		const id = this.state.id;
		// const name = name;
		// console.log(name);
		APIService.updateServiceType(id, { name, category_id, sub_category_id, description }).then(
			(unit) => {
				this.setState({
					success: true,
					loading: false,
					redirect: true,
					redirectPath: '/service-type',
					redirectData: {
						visible: true,
						alertStyle: 'success',
						alertIcon: 'fa fa-check mx-2',
						alertMessage: 'Service Type updated successfully.'
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
			<option value={Obj.id} selected={this.state.category_id === Obj.id ? true : false} key={i}>
				{Obj.category_name}
			</option>
		);
	};

	renderSubcategory = (Obj, i) => {
		return (
			<option value={Obj.id} key={i} selected={this.state.sub_category_id === Obj.id ? true : false} key={i}>
				{Obj.sub_category_name}
			</option>
		);
	};

	_renderForm(selectBody, selectSubCategory) {
		return (
			<Form onSubmit={this.state.update ? this._handleSubmitUpdate : this._handleSubmitAdd}>
				<Row form>
					<Col sm={{ size: 4, order: 4, offset: 4, mt: 2 }}>
						<select className="mt-2 form-control" name="category_id" onChange={this._handleChangeCategory}>
							<option selected={this.state.category_id === '' ? true : false} disabled="disabled">
								Select Category
							</option>
							{selectBody}
						</select>
					</Col>
				</Row>

				<Row form>
					<Col sm={{ size: 4, order: 4, offset: 4, mt: 2 }}>
						<select
							className="mt-2 form-control"
							name="sub_category_id"
							onChange={this._handleChangeSubCategory}
						>
							<option selected={this.state.sub_category_id === '' ? true : false} disabled="disabled">
								Select Sub Category
							</option>
							{selectSubCategory}
						</select>
					</Col>
				</Row>

				<Row form>
					<Col sm={{ size: 4, order: 4, offset: 4 }} className="mt-2">
						<FormInput
							id="unitName"
							type="text"
							placeholder="Service Type Name"
							name="name"
							value={this.state.name}
							onChange={this._handleChange}
						/>
					</Col>
				</Row>

				<Row form>
					<Col sm={{ size: 4, order: 4, offset: 4 }} className="mt-3">
						<FormTextarea
							id="description"
							type="text"
							placeholder="Description"
							name="description"
							value={this.state.description}
							onChange={this._handleChange}
						/>
					</Col>
				</Row>

				<Row form>
					<Col sm={{ size: 6, order: 6, offset: 5 }} className="mt-2">
						{this.state.update ? <Button type="submit">Update</Button> : <Button type="submit">Add</Button>}
					</Col>
				</Row>
			</Form>
		);
	}

	render() {
		const { loginStatus, loading, internetConnected } = this.state;
		this.renderRow = this.renderRow.bind(this);
		const selectBody = this.state.unitData.length > 0 && this.state.unitData.map(this.renderRow);

		this.renderSubcategory = this.renderSubcategory.bind(this);
		const selectSubCategory =
			this.state.subCategory.length > 0 && this.state.subCategory.map(this.renderSubcategory);

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
						<MainTitle title="Service Type" />
						<Row>
							<Col>
								<Card small className="mb-4">
									<ContentHeader
										title={this.state.name === '' ? 'Add Service Type' : 'Edit Service Type'}
									>
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
														redirectPath: '/service-type'
													});
												}
											}}
										>
											Back
										</Button>
									</ContentHeader>
									<CardBody className="p-0 pb-3">
										{this._renderForm(selectBody, selectSubCategory)}
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

export default AddEditServiceType;
