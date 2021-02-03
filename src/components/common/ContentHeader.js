import React from 'react';
// import classNames from "classnames";
import PropTypes from 'prop-types';
import { Col, Row, CardHeader } from 'shards-react';

const ContentHeader = ({ title, children }) => {
	return (
		<CardHeader className="border-bottom">
			<Row>
				<Col>
					<h6 className="m-0">{title}</h6>
				</Col>
				<Col className="text-md-right">{children}</Col>
			</Row>
		</CardHeader>
	);
};

ContentHeader.propTypes = {
	/**
	 * The page title.
	 */
	title: PropTypes.string
};

export default ContentHeader;
