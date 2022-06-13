import React, { Component } from 'react'
import Product3 from '../photo/smalldumbmerch.png'
import { Nav, Container, Navbar, Row, Col, Card, Button } from 'react-bootstrap'
import promo from '../data/promo'

export default class Countdown extends Component {
    state = {
        minutes: 3,
        seconds: 0,
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <div className="bg-black" style={{height:"100vh"}}>
                <div className="bg-black">
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/homepage">
                            <img
                                alt=""
                                src={Product3}
                                width="60"
                                height="60"
                                className="d-inline-block align-top"
                                />{' '}
                        </Navbar.Brand>
                        <Nav className="me-auto; justify-content-end">
                            <Nav.Link href="#">Complain</Nav.Link>
                            <Nav.Link href="/profil">Profil</Nav.Link>
                            <Nav.Link href="/">LogOut</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                </div>
                { minutes === 0 && seconds === 0
                    ? <h1>The Promotion has been the end</h1>
                    : <h1 className='d-flex justify-content-center'>Promotion Time: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
                <Container>
                    <Row>
                        {promo.map((data, index) => (
                            <Col md={3}>
                                <Card style={{ width: '18rem'}}>
                                    <Card.Img variant="top" src={data.image} />
                                    <Card.Body>
                                        <Card.Title>{data.name}</Card.Title>
                                        <Card.Text>
                                            Happy Shopping!!
                                        </Card.Text>
                                        <Button variant="primary">Buy</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                
            </div>

        )
    }
}