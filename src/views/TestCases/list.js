import React from 'react';
import { Container, Row, Col, Card, CardBody, Button, Alert, ButtonGroup } from 'shards-react';
import MainTitle from '../../components/common/MainTitle';
import ContentHeader from '../../components/common/ContentHeader';
import Loader from '../../components/Loader/Loader';
import { Redirect } from 'react-router-dom';
import { APIService } from '../../utils/APIService';
import userLoginStatus from '../../utils/userLoginStatus';

import MaterialTable from 'material-table';

class Common extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginStatus: undefined,
			addUpdateItem: undefined,
			success: false,
			loading: false,
			listItems: false,
			internetConnected: true,
			project_id: this.props.match.params.project_id,
			visible: this.props.location.state ? this.props.location.state.visible : false,
			alertStyle: this.props.location.state ? this.props.location.state.alertStyle : '',
			alertIcon: this.props.location.state ? this.props.location.state.alertIcon : '',
			alertMessage: this.props.location.state ? this.props.location.state.alertMessage : '',
			listData: []
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
		APIService.fetchProjectTestCases(this.state.project_id).then(
			(data) => {
				this.setState({
					loginStatus: true,
					listItems: true,
					loading: false,
					listData: data
				});
				localStorage.setItem('projectTestCases', JSON.stringify(data));
			},
			(error) => this.setState({ internetConnected: false })
		);
	};

	_handleDelete(id) {
		APIService.deleteProjectTestCase(id).then(
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
		APIService.statusUser(id).then(
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
					<Container fluid className="px-4 py-4">
						<ButtonGroup className="mb-3">
							<Button theme="primary">Test Cases</Button>
							<Button
								theme="white"
								onClick={() =>
									this.setState({
										redirect: true,
										redirectPath: '/projects/' + this.state.project_id + '/executions'
									})
								}
							>
								Executions
							</Button>
						</ButtonGroup>
					</Container>
					<Container fluid className="px-0">
						{this.state.alertMessage && (
							<Alert
								theme={this.state.alertStyle || 'primary'}
								dismissible={this.dismiss}
								open={this.state.visible}
								className="mb-0"
							>
								<i className={this.state.alertIcon} /> {this.state.alertMessage}
							</Alert>
						)}
					</Container>
					<Container fluid className="main-content-container px-4">
						<MainTitle title="Project Test Cases">
							<Button
								onClick={() => {
									localStorage.removeItem('projectTestCases');
									this.setState({
										redirect: true,
										redirectPath: '/projects'
									});
								}}
							>
								Change Project
							</Button>
						</MainTitle>
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
													redirectPath:
														'/projects/' + this.state.project_id + '/testcases/new'
												})
											}
										>
											Add New Test Case
										</Button>
									</ContentHeader>
									<CardBody className="p-0 pb-3">
										<CardBody className="p-0 pb-3">
											<MaterialTable
												title="Test Cases"
												columns={[
													{ title: 'ID', field: 'id' },
													{ title: 'Title', field: 'title' },
													{ title: 'Description', field: 'description' },
													{ title: 'Expected Results', field: 'expected_results' }
												]}
												data={this.state.listData}
												options={{
													search: true,
													actionsColumnIndex: -1
												}}
												actions={[
													// {
													// 	icon: 'edit',
													// 	tooltip: 'User Edit',
													// 	onClick: (event, rowData) => {
													// 		this.setState({
													// 			redirect: true,
													// 			redirectPath: '/projects/' + rowData.id + '/edit',
													// 			redirectData: {
													// 				data: rowData,
													// 				id: rowData.id,
													// 				update: true,
													// 				first_name: rowData.first_name,
													// 				last_name: rowData.last_name,
													// 				email: rowData.email,
													// 				city: rowData.city,
													// 				country: rowData.country,
													// 				state: rowData.state,
													// 				phone: rowData.phone,
													// 				zip_code: rowData.zip_code,
													// 				address_1: rowData.address_1,
													// 				role_type: rowData.role_type
													// 			}
													// 		});
													// 	}
													// },
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

export default Common;
