import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron, Table, Form, Button } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import { Redirect } from 'react-router-dom'
import { Auth } from './utils/Auth'
import { User } from './utils/User'
import { Notifier } from './utils/Notifier'
import styled from 'styled-components'

const Styles = styled.div`
    .padding-bottom {
        padding-bottom: 16px;
    }

    .center {
        width: fit-content;
        text-align: center;
        margin: 1em auto;
        display: table;
    }

    .left {
        width: fit-content;
        text-align: left;
        margin: 0;
        display: block;
    }
`

export class Chat extends Component {

    constructor(props) {
        super(props);
        this.auth = new Auth()
        this.profile = this.auth.getUserProfile()
        this.state = {
            "disable_form": false,
            "profile": this.profile,
            "email": this.profile.email
        }
    }

    onEmailChange = (event) => this.setState({ "email": event.target.value })

    onFormSubmitted = async (event) => {
        event.preventDefault()
        if (this.state.email.length) {
            if (this.state.profile.email !== this.state.email) {
                this.setState({ "disable_form": true })
                const update_query = await User.updateUserProfile({ "email": this.state.email })
                if (update_query) {
                    Notifier.notifyFromResponse(update_query)
                    this.auth.updateUserProfile()
                    this.setState({ "profile": this.auth.getUserProfile() })
                } else {
                    Notifier.createNotification(
                        "error", 
                        "Query failed", 
                        "Please check your internet connection"
                    )
                }
                this.setState({ "disable_form": false })
            }
        }
    }

    render() {
        if (this.props.authenticated === false)
            return <Redirect to='/login' />
        return (
            <Styles>
                <Container>
                    <Row className="padding-bottom">
                        <Col lg={{ span: 12 }} className="center">
                            <Jumbotron>
                                <h1>Chat</h1>
                            </Jumbotron>

                            <p>chat ...</p>
                        
                        </Col>
                    </Row>
                </Container>
            </Styles>
        )
    }

    componentDidMount() {
        document.title = "Profile - Secure Chat";
    }

}

export default Chat;