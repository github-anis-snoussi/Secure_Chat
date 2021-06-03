import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { Auth } from './utils/Auth'
import styled from 'styled-components'

// the chat component 
import ChatApp from './ChatApp';



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

                            <div style={{width : 500, height : 800}} >
                                <ChatApp />
                            </div>
                        
                        </Col>
                    </Row>
                </Container>
            </Styles>
        )
    }

}

export default Chat;