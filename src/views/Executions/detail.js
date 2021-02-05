import React from 'react';
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	Button,
	Alert,
	ButtonGroup,
	Modal,
	ModalBody,
	ModalHeader
} from 'shards-react';
import MainTitle from '../../components/common/MainTitle';
import ContentHeader from '../../components/common/ContentHeader';
import Loader from '../../components/Loader/Loader';
import { Redirect } from 'react-router-dom';
import { APIService } from '../../utils/APIService';
import userLoginStatus from '../../utils/userLoginStatus';
// import { ButtonGroup } from '@material-ui/core';

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
			execution_id: this.props.match.params.execution_id,
			actual_results: '',
			data: this.props.location.state ? this.props.location.state.data : '',
			visible: this.props.location.state ? this.props.location.state.visible : false,
			alertStyle: this.props.location.state ? this.props.location.state.alertStyle : '',
			alertIcon: this.props.location.state ? this.props.location.state.alertIcon : '',
			alertMessage: this.props.location.state ? this.props.location.state.alertMessage : '',
			listData: []
		};
		// console.log(this.state);
		this.dismiss = this.dismiss.bind(this);
		this.renderRow = this.renderRow.bind(this);
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
		APIService.fetchExecutionResults(this.state.execution_id).then(
			(data) => {
				this.setState({
					loginStatus: true,
					listItems: true,
					loading: false,
					stats: data,
					listData: data.test_cases
				});
			},
			(error) => this.setState({ internetConnected: false })
		);
	};

	dismiss() {
		this.setState({ visible: false });
	}

	handleClick = (id, status) => {
		if (status === 'passed' || status === 'unexecuted') {
			console.log('make api call');
			this.markExecution(id, status);
			//make api call
		} else {
			console.log('show popup for actual_results');
			//show popup for actual_results
		}
	};

	markExecution(id, status) {
		this.setState({ loading: true });
		let { actual_results } = this.state;
		console.log(status);
		APIService.updateExecutionResult(id, { status, actual_results }).then(
			(data) => {
				this._fetchListData();
			},
			(error) => {
				alert(error.errorMessage);
				this.setState({ loading: false });
			}
		);
	}

	renderExecutionStatus(stats) {
		return (
			<>
				<MainTitle title={stats.name}>
					<Button
						outline
						theme="primary"
						onClick={() =>
							this.setState({
								redirect: true,
								redirectPath: '/projects/' + this.state.project_id + '/executions'
							})
						}
					>
						Exit
					</Button>
				</MainTitle>
				<Row className="mb-2">
					<Col className="mb-4">
						<div
							className="bg-secondary text-white text-center rounded p-3"
							style={{ boxShadow: 'inset 0 0 5px rgba(0,0,0,.2)' }}
						>
							<font size="7">{stats.unexecuted}</font>
							<br />
							Not Run
						</div>
					</Col>
					<Col className="mb-4">
						<div
							className="bg-success text-white text-center rounded p-3"
							style={{ boxShadow: 'inset 0 0 5px rgba(0,0,0,.2)' }}
						>
							<font size="7">{stats.passed}</font>
							<br />
							Passed
						</div>
					</Col>
					<Col className="mb-4">
						<div
							className="bg-danger text-white text-center rounded p-3"
							style={{ boxShadow: 'inset 0 0 5px rgba(0,0,0,.2)' }}
						>
							<font size="7">{stats.failed}</font>
							<br />
							Failed
						</div>
					</Col>
					<Col className="mb-4">
						<div
							className="bg-info text-white text-center rounded p-3"
							style={{ boxShadow: 'inset 0 0 5px rgba(0,0,0,.2)' }}
						>
							<font size="7">{stats.blocked}</font>
							<br />
							Blocked
						</div>
					</Col>
				</Row>
			</>
		);
	}

	renderRow(item) {
		return (
			<tr key={item.id.toString()}>
				<td>{item.id}</td>
				<td>{item.test_case.title}</td>
				<td>{item.test_case.description}</td>
				<td>{item.test_case.expected_results}</td>
				<td>{item.actual_results}</td>
				<td>
					<ButtonGroup>
						{item.status === 'unexecuted' ? (
							<Button theme="secondary">Not Run</Button>
						) : (
							<Button theme="secondary" outline onClick={() => this.handleClick(item.id, 'unexecuted')}>
								Not Run
							</Button>
						)}
						{item.status === 'passed' ? (
							<Button theme="success" type="submit">
								Pass
							</Button>
						) : (
							<Button
								theme="success"
								outline
								type="submit"
								onClick={() => this.handleClick(item.id, 'passed')}
							>
								Pass
							</Button>
						)}
						{item.status === 'failed' ? (
							<Button theme="danger">Fail</Button>
						) : (
							<Button theme="danger" outline onClick={() => this.handleClick(item.id, 'failed')}>
								Fail
							</Button>
						)}
						{item.status === 'blocked' ? (
							<Button theme="info">Block</Button>
						) : (
							<Button theme="info" outline onClick={() => this.handleClick(item.id, 'blocked')}>
								Block
							</Button>
						)}
					</ButtonGroup>
				</td>
			</tr>
		);
	}

	render() {
		let { listData, stats } = this.state;
		let tableBody = listData.length && listData.map(this.renderRow);
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
					{this.state.alertMessage && (
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
					)}
					<Container>{this.renderExecutionStatus(stats)}</Container>
					<Container fluid className="main-content-container px-4">
						<Row>
							<Col>
								<Card small className="mb-4">
									<ContentHeader title="Test Case Results"></ContentHeader>
									<CardBody className="p-0 pb-3">
										<CardBody className="p-0 pb-3">
											<table className="table mb-0">
												<thead className="bg-light">
													<tr>
														<th scope="col" className="border-0">
															ID
														</th>
														<th scope="col" className="border-0">
															Title
														</th>
														<th scope="col" className="border-0">
															Description
														</th>
														<th scope="col" className="border-0">
															Expected Results
														</th>
														<th scope="col" className="border-0">
															Actual Results
														</th>
														<th scope="col" className="border-0"></th>
													</tr>
												</thead>
												<tbody>{tableBody}</tbody>
											</table>
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
