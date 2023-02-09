import React from 'react';
import { Container, Row, Col, Card, CardBody, Button, Alert } from 'shards-react';
import MainTitle from '../../components/common/MainTitle';
import ContentHeader from '../../components/common/ContentHeader';
import Loader from '../../components/Loader/Loader';
import { Redirect } from 'react-router-dom';
import userLoginStatus from '../../utils/userLoginStatus';

class UserDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginStatus: undefined,
			addUpdateItem: undefined,
			success: false,
			loading: false,
			listItems: false,
			internetConnected: true,
			data: this.props.location.state ? this.props.location.state.data : '',
			visible: this.props.location.state ? this.props.location.state.visible : false,
			alertStyle: this.props.location.state ? this.props.location.state.alertStyle : '',
			alertIcon: this.props.location.state ? this.props.location.state.alertIcon : '',
			alertMessage: this.props.location.state ? this.props.location.state.alertMessage : '',
			unitData: []
		};
		// console.log(this.state.data);
		this.dismiss = this.dismiss.bind(this);
	}

	componentDidMount() {
		if (this.state.loginStatus === undefined) {
			userLoginStatus().then(
				(value) => {
					this.setState({
						loginStatus: true,
						listItems: true,
						loading: false
					});
					// this._fetchListData();
				},
				(reason) => {
					this.setState({ loginStatus: false });
				}
			);
		}
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
						<MainTitle title="Testers" />
						<Row>
							<Col>
								<Card small className="mb-4">
									<ContentHeader title="Tester Details">
										<Button
											outline
											theme="primary"
											className="mb-2 mr-1"
											onClick={() =>
												this.setState({
													redirect: true,
													redirectPath: '/users'
												})
											}
										>
											Back
										</Button>
									</ContentHeader>
									<CardBody className="p-0 pb-3">
										<CardBody className="p-0 pb-3">
											<table className="table mb-0">
												<thead className="bg-light">
													<tr>
														<th scope="col" className="border-0">
															Customer Name
														</th>
														<th scope="col" className="border-0">
															Email
														</th>
														<th scope="col" className="border-0">
															Phone
														</th>
														<th scope="col" className="border-0">
															Country
														</th>
														<th scope="col" className="border-0">
															State
														</th>
														<th scope="col" className="border-0">
															City
														</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															{this.state.data.first_name} {this.state.data.last_name}
														</td>
														<td>{this.state.data.email}</td>
														<td>{this.state.data.phone}</td>
														<td>{this.state.data.countries.name}</td>
														<td>{this.state.data.states.name}</td>
														<td>{this.state.data.cities.name}</td>
													</tr>
												</tbody>
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

export default UserDetails;
