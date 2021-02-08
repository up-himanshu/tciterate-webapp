import React from 'react';
import { Container, Row, Col } from 'shards-react';
import { Redirect } from 'react-router-dom';
import PageTitle from './../components/common/PageTitle';
import SmallStats from './../components/common/SmallStats';
import ErrorPage from './../components/common/ErrorPage';
import UsersOverview from './../components/blog/UsersOverview';
import UsersByDevice from './../components/blog/UsersByDevice';
import userLoginStatus from './../utils/userLoginStatus';
import { APIService } from './../utils/APIService';
import Loader from '../components/Loader/Loader';
// import NewDraft from './../components/blog/NewDraft';
// import Discussions from './../components/blog/Discussions';
import TopReferrals from './../components/common/TopReferrals';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginStatus: undefined,
			errorMessage: {},
			loading: false,
			stats: {}
		};
	}

	componentDidMount() {
		if (this.state.loginStatus === undefined) {
			userLoginStatus().then(
				(value) => {
					this._fetchStats();
				},
				(reason) => {
					this.setState({ loginStatus: false });
				}
			);
		}
	}

	_fetchStats = () => {
		//var date = new Date();
		APIService.dashboardStats().then(
			(stats) => {
				this.setState({ loginStatus: true, stats: stats });
			},
			(error) => {
				if (error.errorStatus == 401) {
					APIService.logout();
					this.setState({ loginStatus: false });
				} else {
					this.setState({ errorMessage: error });
				}
			}
		);
	};

	render() {
		const { loginStatus, stats, errorMessage } = this.state;
		if (Object.keys(errorMessage).length) {
			return (
				<ErrorPage
					code={errorMessage.errorStatus}
					statusText={errorMessage.statusText}
					message={errorMessage.errorMessage}
				/>
			);
		}
		if (loginStatus === undefined) {
			return <Loader />;
		} else if (loginStatus) {
			return (
				<Container fluid className="main-content-container px-4">
					{/* Page Header */}
					<Row noGutters className="page-header py-4">
						<PageTitle title="Dashboard" subtitle="TCIterate" className="text-sm-left mb-3" />
					</Row>

					{/* Small Stats Blocks */}
					<Row>
						{stats.smallStats.map((stats, idx) => (
							<Col className="col-lg mb-4" key={idx} {...stats.attrs}>
								<SmallStats
									id={`small-stats-${idx}`}
									variation="2"
									chartData={stats.datasets}
									chartLabels={stats.chartLabels}
									label={stats.label}
									value={stats.value}
									percentage={stats.percentage}
									increase={stats.increase}
									decrease={stats.decrease}
								/>
							</Col>
						))}
					</Row>

					<Row>
						{/* Users Overview */}
						<Col lg="8" md="12" sm="12" className="mb-4">
							{/* <UsersOverview chartData={stats.chartData} /> */}
						</Col>

						{/* User Devices */}
						<Col lg="4" md="6" sm="12" className="mb-4">
							{/* <UsersByDevice deviceData={stats.deviceData} /> */}
						</Col>

						{/* New Draft */}
						<Col lg="4" md="6" sm="12" className="mb-4">
							{/* <NewDraft /> */}
						</Col>

						{/* Discussions */}
						<Col lg="5" md="12" sm="12" className="mb-4">
							{/* <Discussions /> */}
						</Col>

						{/* Top Referrals */}
						<Col lg="3" md="12" sm="12" className="mb-4">
							{/* <TopReferrals /> */}
						</Col>
					</Row>
				</Container>
			);
		} else {
			return <Redirect to="/login" />;
		}
	}
}

export default Dashboard;
