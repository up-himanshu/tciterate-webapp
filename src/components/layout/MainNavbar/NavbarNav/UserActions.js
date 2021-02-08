import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse, NavItem, NavLink } from 'shards-react';

export default class UserActions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};

		this.toggleUserActions = this.toggleUserActions.bind(this);
	}

	toggleUserActions() {
		this.setState({
			visible: !this.state.visible
		});
	}

	render() {
		let user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			return (
				<NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
					<DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
						<img
							className="user-avatar rounded-circle mr-2"
							src={require('./../../../../images/avatars/admin-default.jpg')}
							alt="User Avatar"
						/>
						<span className="d-none d-md-inline-block">{user.name || user.email}</span>
					</DropdownToggle>
					<Collapse tag={DropdownMenu} right small open={this.state.visible}>
						{/* <DropdownItem tag={Link} to="user-profile">
              <i className="material-icons">&#xE7FD;</i> Profile
            </DropdownItem>
            <DropdownItem tag={Link} to="edit-user-profile">
              <i className="material-icons">&#xE8B8;</i> Edit Profile
            </DropdownItem>
            <DropdownItem tag={Link} to="file-manager-list">
              <i className="material-icons">&#xE2C7;</i> Files
            </DropdownItem> */}
						<DropdownItem tag={Link} to="profile">
							<i className="material-icons">person</i> Profile
						</DropdownItem>
						<DropdownItem divider />
						<DropdownItem tag={Link} to="/login?logout=true" className="text-danger">
							<i className="material-icons text-danger">&#xE879;</i> Logout
						</DropdownItem>
					</Collapse>
				</NavItem>
			);
		} else {
			return <div>No user</div>;
		}
	}
}
