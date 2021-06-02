import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { Auth } from './utils/Auth'
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
            "profile": this.profile,
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
        document.title = "Chat - Secure Chat";
    }

}

export default Chat;