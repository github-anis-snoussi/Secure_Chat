import 'react-notifications/lib/notifications.css';
import React, { Component } from 'react'
import { Container, Row, Col, Card, Jumbotron, Form, Button } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import { Redirect } from 'react-router-dom'
import { Auth } from './utils/Auth'
import { Ping } from './utils/Ping'
import { Notifier } from './utils/Notifier'
import styled from 'styled-components'

const Styles = styled.div`
    .padding-top {
        padding-top: 16px;
    }

    .center {
        width: fit-content;
        text-align: center;
        margin: 1em auto;
        display: table;
    }

    .main-search-bar {
        padding: 32px;
        margin-top: 32px;
        margin-bottom: 8px;
    }
`

export class Register extends Component {

    constructor(props) {
        super(props);
        // Passing a list of callbacks to update the
        // parent component <App/> and <Register>'s component.
        this.auth = new Auth([
            this.props.onAuthUpdate,
            this.onAuthUpdate
        ])
        this.state = {
            "firstname": "",
            "lastname": "",
            "username": "",
            "password": "",
            "disable_form": false,
            "profile": this.auth.getUserProfile()
        }
    }

    onAuthUpdate = () => {
        this.setState({
            "profile": this.auth.getUserProfile(),
            "disable_form": false
        })
    }

    onFirstNameChange = (event) => this.setState({ "firstname": event.target.value })
    onLastNameChange = (event) => this.setState({ "lastname": event.target.value })
    onUsernameChange = (event) => this.setState({ "username": event.target.value })
    onPasswordChange = (event) => this.setState({ "password": event.target.value })

    onFormSubmitted = async (event) => {
        if (this.state.firstname.length && this.state.lastname.length && this.state.username.length && this.state.password.length) {
            this.setState({ "disable_form": true })
            const api_ping_query = await Ping.pingApi()
            if (api_ping_query) {
                const api_auth_query = await this.auth.requestLDAPRegister(this.state.firstname, this.state.lastname, this.state.username, this.state.password)
                if (api_auth_query && api_auth_query.error === false) {
                    Notifier.createNotification(
                        "success", 
                        "Account Created", 
                        "You can start using the app"
                    )
                } else {
                    Notifier.notifyFromResponse(api_auth_query, "Authentication")
                }
            } else {
                Notifier.createNotification(
                    "error", 
                    "API unreachable", 
                    "Please check your internet connection"
                )
            }
            this.setState({ "disable_form": false })
        }
    }

    render() {
        if (this.props.authenticated)
            return <Redirect to='/dashboard' />
        return (
            <Styles>
                <Container>
                    <Row className="padding-top">
                        <Col lg={{ offset: 3, span: 6 }}>
                            <Card>
                                <Card.Body>
                                    <Jumbotron>
                                        <h1>Register</h1>
                                        <p>
                                            Register to start using the application.
                                        </p>
                                    </Jumbotron>
                                    {
                                        (this.props.authenticated === false)
                                        ?
                                        (
                                            <Form>
                                                <Form.Group>
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="First Name"
                                                        disabled={this.state.disable_form}
                                                        onChange={this.onFirstNameChange}
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Last Name"
                                                        disabled={this.state.disable_form}
                                                        onChange={this.onLastNameChange}
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="LDAP username"
                                                        disabled={this.state.disable_form}
                                                        onChange={this.onUsernameChange}
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control 
                                                        type="password" 
                                                        placeholder="LDAP password"
                                                        disabled={this.state.disable_form}
                                                        onChange={this.onPasswordChange}
                                                    />
                                                </Form.Group>
                                                <Button 
                                                    variant="primary" 
                                                    type="submit" 
                                                    style={{ width: "100%" }} 
                                                    disabled={this.state.disable_form}
                                                    onClick={this.onFormSubmitted}
                                                >
                                                    {
                                                        this.state.disable_form
                                                        ?
                                                        <Loader
                                                            type="TailSpin"
                                                            color="#fff"
                                                            height={28}
                                                            width={28}
                                                        />
                                                        :
                                                        <>Register</>
                                                    }
                                                </Button>
                                            </Form>
                                        )
                                        :
                                        <div>
                                            <h3 className="center">You are already authenticated !</h3>
                                            <p className="center">
                                                { 
                                                    this.state.profile !== undefined && "first_name" in this.state.profile 
                                                    ? this.state.profile.first_name 
                                                    : "Tell me" 
                                                }, do you want to :
                                            </p>
                                            <ul>
                                                <li>Go to your dashboard ?</li>
                                                <li><button onClick={this.auth.logoutUser}>Logout ?</button></li>
                                            </ul>
                                        </div>    
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Styles>
        )
    }

    componentDidMount() {
        document.title = "Register - Secure Chat";
    }

}
