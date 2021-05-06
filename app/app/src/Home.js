import React, { Component } from 'react'
import { Container, Row, Col, Button, Jumbotron, Nav } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
`

class Home extends Component {

    render() {
        return (
            <Styles>
                <Container>
                    <Row className="padding-bottom">
                        <Col lg={{ span: 12 }} className="center">
                            <Jumbotron>
                                <h1>Hello</h1>
                                <p>
                                    Welcome to the most secure Chat app in the world!
                                </p>
                                <p>
                                <Nav.Link as={Link} to={'/login'}>
                                    <Button variant="warning">Login !</Button>
                                </Nav.Link>
                                <Nav.Link as={Link} to={'/signup'}>
                                    <Button variant="warning">Register !</Button>
                                </Nav.Link>
                                </p>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>
            </Styles>
        )
    }

    componentDidMount() {
        document.title = "Home - Secure Chat";
    }

}

export default Home;