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

    componentDidMount() {
        document.title = "Chat - Secure Chat";

        // RSA Example
        const NodeRSA = require('node-rsa');
        const key = new NodeRSA({b: 512});

        const text = 'Hello RSA!';
        const encrypted = key.encrypt(text, 'base64');
        console.log('encrypted: ', encrypted);
        const decrypted = key.decrypt(encrypted, 'utf8');
        console.log('decrypted: ', decrypted);
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

}

export default Chat;