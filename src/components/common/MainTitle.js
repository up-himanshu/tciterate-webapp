import React from 'react';
// import classNames from "classnames";
import PropTypes from 'prop-types';
import { Col, Row } from 'shards-react';
import strings from '../../data/strings';
import PageTitle from './PageTitle';

const MainTitle = ({ title, children }) => {
	return (
		<Row>
			<Col>
				<Row noGutters className="page-header py-4">
					<Col>
						<PageTitle sm="4" title={title} subtitle={strings.ProductName} className="text-sm-left" />
					</Col>
				</Row>
			</Col>
			<Col className="text-md-right" sm="4" xs="12">
				<Row noGutters className="page-header py-4">
					<Col>{children}</Col>
				</Row>
			</Col>
		</Row>
	);
};

MainTitle.propTypes = {
	/**
	 * The page title.
	 */
	title: PropTypes.string
};

export default MainTitle;
