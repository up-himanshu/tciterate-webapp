import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormTextarea,
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import Loader from "../components/Loader/Loader";
import { Redirect } from "react-router-dom";
import { APIService } from "./../utils/APIService";
import userLoginStatus from "./../utils/userLoginStatus";
//https://stackoverflow.com/questions/28527712/how-to-add-key-value-pair-in-the-json-object-already-declared

class Cockpit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: undefined,
      addUpdateItem: undefined,
      loading: false,
      internetConnected: true,
      configurations: {},
      error: "",
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
  }

  componentDidMount() {
    if (this.state.loginStatus === undefined) {
      userLoginStatus().then(
        (value) => {
          this._fetchConfigurations();
        },
        (reason) => {
          this.setState({ loginStatus: false });
        }
      );
    }
  }

  _handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  _fetchConfigurations = () => {
    APIService.fetchConfigurations().then(
      (configurations) => {
        this.setState({
          loginStatus: true,
          loading: false,
          configurations: JSON.stringify(configurations.configurations),
        });
      },
      (error) => {
        this.setState({
          internetConnected: false,
        });
      }
    );
  };

  _handleUpdate(e) {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      let { configurations } = this.state;
      let configs = JSON.parse(configurations);
      APIService.updateConfigurations({ configurations: configs }).then(
        (configurations) => {
          this.setState({
            loading: false,
            addUpdateItem: undefined,
            configurations: JSON.stringify(configurations.configurations),
          });
        },
        (error) => {
          this.setState({ loading: false, alertVisible: true });
        }
      );
    } catch (error) {
      this.setState({
        loading: false,
        alertVisible: true,
        error: "Invalid JSON",
      });
    }
  }

  _renderSettingsForm() {
    const { configurations, error } = this.state;
    return (
      <Form onSubmit={this._handleUpdate}>
        {error ? (
          <Row>
            <Col>{error}</Col>
          </Row>
        ) : null}
        <Row form>
          <Col sm={{ size: 4, order: 4, offset: 4 }}>
            <FormTextarea
              id="Message"
              placeholder=""
              name="configurations"
              value={configurations}
              onChange={this._handleChange}
            />
          </Col>
        </Row>
        <Row form>
          <Col sm={{ size: 6, order: 6, offset: 5 }}>
            <Button type="submit" disabled={this.state.loading}>
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { loginStatus, loading, internetConnected } = this.state;
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
        <Container fluid className="main-content-container px-4"> 
          {/* Page Header with Add button */}
          <Row>
            <Col>
              <Row noGutters className="page-header py-4">
                <Col>
                  <PageTitle
                    sm="4"
                    title="Cockpit"
                    subtitle="eZunction"
                    className="text-sm-left"
                  />
                </Col>
              </Row>
            </Col>
            <Col className="text-md-right" sm="4" xs="12">
              <Row noGutters className="page-header py-4">
                <Col />
              </Row>
            </Col>
          </Row>
          {/* <MainTitle title="Category" labelButton="Back" /> */}

          {/* Add Category Form */}
          <Row>
            <Col>
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <Row>
                    <Col>
                      <h6 className="m-0">Settings</h6>
                    </Col>
                    <Col className="text-md-right"></Col>
                  </Row>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                  {this._renderSettingsForm()}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default Cockpit;
