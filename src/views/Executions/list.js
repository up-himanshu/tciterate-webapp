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
		APIService.fetchProjectExecutions(this.state.project_id).then(
			(units) => {
				this.setState({
					loginStatus: true,
					listItems: true,
					loading: false,
					listData: units
				});
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
					<Container fluid className="px-4 py-4">
						<ButtonGroup className="mb-3">
							<Button
								theme="white"
								onClick={() =>
									this.setState({
										redirect: true,
										redirectPath: '/projects/' + this.state.project_id + '/testcases'
									})
								}
							>
								Test Cases
							</Button>
							<Button theme="primary">Executions</Button>
						</ButtonGroup>
					</Container>
					<Container fluid className="main-content-container px-4">
						<MainTitle title="Project Executions">
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
														'/projects/' + this.state.project_id + '/executions/new'
												})
											}
										>
											Add New Execution
										</Button>
									</ContentHeader>
									<CardBody className="p-0 pb-3">
										<CardBody className="p-0 pb-3">
											<MaterialTable
												title="Executions"
												columns={[
													{ title: 'ID', field: 'id' },
													{ title: 'Name', field: 'name' },
													{ title: 'Type', field: 'type' },
													{ title: 'Unexecuted', field: 'unexecuted' },
													{ title: 'Passed', field: 'passed' },
													{ title: 'Failed', field: 'failed' },
													{ title: 'Blocked', field: 'blocked' },
													{ title: 'Total', field: 'total' }
												]}
												data={this.state.listData}
												options={{
													search: true,
													actionsColumnIndex: -1
												}}
												actions={[
													{
														icon: 'visibility',
														tooltip: 'Execute Tests',
														onClick: (event, rowData) => {
															this.setState({
																redirect: true,
																redirectPath:
																	'/projects/' +
																	this.state.project_id +
																	'/executions/' +
																	rowData.id,
																redirectData: { data: rowData }
															});
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
