import React from 'react';
import { Container, Row, Col, Card, CardBody, Button, ButtonGroup, Alert } from 'shards-react';
import MainTitle from '../../components/common/MainTitle';
import ContentHeader from '../../components/common/ContentHeader';
import Loader from '../../components/Loader/Loader';
import { Redirect } from 'react-router-dom';
import { APIService } from '../../utils/APIService';
import userLoginStatus from '../../utils/userLoginStatus';

class Disciplines extends React.Component {
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
		APIService.fetchAllDisciplines().then(
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
		APIService.deleteDisciplines(id).then(
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

	renderRow = (Obj, i) => {
		return (
			<tr key={i}>
				<td>{i + 1}</td>
				<td>{Obj.name}</td>
				<td align="right">
					<ButtonGroup size="sm">
						<Button
							theme="info"
							onClick={() =>
								this.setState({
									redirect: true,
									redirectPath: '/disciplines/' + Obj.id,
									redirectData: { name: Obj.name }
								})
							}
						>
							Detail
						</Button>
						<Button
							theme="secondary"
							onClick={() =>
								this.setState({
									redirect: true,
									redirectPath: '/disciplines/' + Obj.id + '/edit',
									redirectData: { name: Obj.name, id: Obj.id, update: true }
								})
							}
						>
							Edit
						</Button>
						<Button
							theme="danger"
							onClick={() => {
								if (window.confirm('are you sure?')) {
									this._handleDelete(Obj.id);
								}
							}}
						>
							Delete
						</Button>
					</ButtonGroup>
				</td>
			</tr>
		);
	};

	render() {
		this.renderRow = this.renderRow.bind(this);
		const tableBody = this.state.unitData.length > 0 && this.state.unitData.map(this.renderRow);
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
						<MainTitle title="Disciplines" />
						<Row>
							<Col>
								<Card small className="mb-4">
									<ContentHeader title="Disciplines">
										<Button
											outline
											theme="primary"
											className="mb-2 mr-1"
											onClick={() =>
												this.setState({
													redirect: true,
													redirectPath: '/disciplines/new'
												})
											}
										>
											Add Disciplines
										</Button>
									</ContentHeader>
									<CardBody className="p-0 pb-3">
										<CardBody className="p-0 pb-3">
											<table className="table mb-0">
												<thead className="bg-light">
													<tr>
														<th scope="col" className="border-0">
															id
														</th>
														<th scope="col" className="border-0">
															Disciplines Name
														</th>
														<th scope="col" className="border-0" align="right" />
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

export default Disciplines;
