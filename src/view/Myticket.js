import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import {Card, Button} from 'react-bootstrap'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Moment from 'react-moment'
import axios from 'axios'

const query = new URLSearchParams(window.location.search)
const id = query.get('id')

class Myticket extends Component{
    constructor(){
        super()
        this.state = {
        data: [],
        movies: [],
        theatre: [],
        }
    }
    componentDidMount(){
        axios.get('https://xcinemas.herokuapp.com//api/v1/mytickets/'+id)
        .then(res=>this.setState({data: res.data.bookings, movies: res.data.bookings}))
        axios.get('https://xcinemas.herokuapp.com//api/v1/myseats/'+id)
        .then(res=>this.setState({theatre: res.data.bookings}))
    }
     render() {
        return (
        <text>
        <Header />
        <Container>
        <Row>
            <Col>
            {this.state.data.map(s=>(
                <text>
                <Card>
                <Card.Header><b>{s.ticket.show.movie.title}</b><b style={{float:"right"}}>Ticket No: {s.ticket.ticket_no}</b></Card.Header>
                <Card.Body>
                    <Card.Title>
                    <Moment format="DD MMM YYYY HH:mm">
                    {s.ticket.show.startTime}
                    </Moment>
                    </Card.Title>
                    <Card.Text>
                    <p>{s.ticket.show.movie.title}</p>
                    </Card.Text>
                </Card.Body>
                </Card>
                </text>
            ))}
            </Col>
        </Row>
        </Container>
        <br></br>
        <Footer />
        </text>
        )
    }
}

export default Myticket;