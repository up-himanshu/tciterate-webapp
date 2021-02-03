import React from "react";
import { Col, Row } from "shards-react";
import strings from "../../data/strings";

const Test = ({ children }) => {
  //   alert(JSON.stringify(children, null, 2));
  return (
    <Row>
      <Col xs="12" sm="4">
        {strings.ProductName}
      </Col>
    </Row>
  );
};

export default Test;
