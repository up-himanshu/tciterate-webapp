import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Button } from "shards-react";
import PageTitle from "./../../components/common/PageTitle";

const MainTitle = ({ title, labelButton }) => {
  // const classes = classNames(
  //   className,
  //   'text-center',
  //   'text-md-left',
  //   'mb-sm-0'
  // );

  return (
    <Row>
      <Col>
        <Row noGutters className="page-header py-4">
          <Col>
            <PageTitle
              sm="4"
              title={title}
              subtitle="eZunction"
              className="text-sm-left"
            />
          </Col>
        </Row>
      </Col>
      <Col className="text-md-right" sm="4" xs="12">
        <Row noGutters className="page-header py-4">
          <Col>
            <Button
              outline
              theme="primary"
              className="mb-2 mr-1"
              _onClick={this.cancelAddUpdateForm}
            >
              {labelButton}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string,
  labelButton: PropTypes.string,
};

export default MainTitle;
