import React from 'react';
import { Container, Row, Col, Card, CardBody, Button, Alert } from 'shards-react';
import MainTitle from '../../components/common/MainTitle';
import ContentHeader from '../../components/common/ContentHeader';
import Loader from '../../components/Loader/Loader';
import { Redirect } from 'react-router-dom';
import { APIService } from '../../utils/APIService';
import userLoginStatus from '../../utils/userLoginStatus';

import MaterialTable from 'material-table';

class Categories extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginStatus: undefined,
			addUpdateItem: undefined,
			success: false,
			loading: false,
			listItems: false,
			internetConnected: true,
			visible: this.props.location.state ? this.props.location.state.visible : false,
			alertStyle: this.props.location.state ? this.props.location.state.alertStyle : '',
			alertIcon: this.props.location.state ? this.props.location.state.alertIcon : '',
			alertMessage: this.props.location.state ? this.props.location.state.alertMessage : '',
			unitData: []
		};
		this.dismiss = this.dismiss.bind(this);
	}

	componentDidMount() {
		if (this.state.loginStatus === undefined) {
			userLoginStatus().then(
				(value) => {
					this._fetchListData();
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
					loginStatus: true,
					listItems: true,
					loading: false,
					unitData: units
				});
			},
			(error) => this.setState({ internetConnected: false })
		);
	};

	_handleDelete(id) {
		APIService.deleteCategory(id).then(
			() => {
				this.setState({
					listItems: true,
					loading: false
				});
				this._fetchListData();
			},
			(error) => {
				alert(error.errorMessage);
				this.setState({ loading: false, alertVisible: true });
			}
		);
	}

	_handleStatus(id) {
		APIService.statusCategory(id).then(
			() => {
				this.setState({
					listItems: true,
					loading: false
				});
				this._fetchListData();
			},
			(error) => {
				alert(error.errorMessage);
				this.setState({ loading: false, alertVisible: true });
			}
		);
	}

	dismiss() {
		this.setState({ visible: false });
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
						<MainTitle title="Categories" />
						<Row>
							<Col>
								<Card small className="mb-4">
									<ContentHeader>
										<Button
											outline
											theme="primary"
											className="mb-2 mr-1"
											onClick={() =>
												this.setState({
													redirect: true,
													redirectPath: '/categories/new'
												})
											}
										>
											Add Categories
										</Button>
									</ContentHeader>
									<CardBody className="p-0 pb-3">
										<CardBody className="p-0 pb-3">
											<MaterialTable
												title="Categories"
												columns={[
													{ title: 'ID', field: 'id' },
													{ title: 'Category Name', field: 'category_name' },
													{ title: 'Categories Description', field: 'description' }
												]}
												data={this.state.unitData}
												options={{
													search: true,
													actionsColumnIndex: -1
												}}
												actions={[
													{
														icon: 'visibility',
														tooltip: 'User Details',
														onClick: (event, rowData) => {
															this.setState({
																redirect: true,
																redirectPath: '/categories/' + rowData.id,
																redirectData: {
																	name: rowData.category_name,
																	description: rowData.description
																}
															});
														}
													},
													{
														icon: 'edit',
														tooltip: 'User Edit',
														onClick: (event, rowData) => {
															this.setState({
																redirect: true,
																redirectPath: '/categories/' + rowData.id + '/edit',
																redirectData: {
																	name: rowData.category_name,
																	description: rowData.description,
																	id: rowData.id,
																	update: true
																}
															});
														}
													},
													(rowData) => ({
														icon: rowData.status ? 'check' : 'cancel',
														tooltip: rowData.status ? 'Activate' : 'Deactivate',
														onClick: (event, rowData) => {
															if (window.confirm('are you sure?')) {
																this._handleStatus(rowData.id);
															}
														}
													}),
													{
														icon: 'delete',
														tooltip: 'Delete User',
														onClick: (event, rowData) => {
															if (
																window.confirm(
																	'Are you sure, you want to permanently delete this record?'
																)
															) {
																this._handleDelete(rowData.id);
															}
														}
													}
												]}
											/>
										</CardBody>
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

export default Categories;
