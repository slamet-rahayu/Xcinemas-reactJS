import React, { Component } from 'react';
import { Button, ButtonGroup} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ReactTooltip from 'react-tooltip'
import Login from './Login'
import { now } from 'moment';
const jwt = require('jsonwebtoken')
const query = new URLSearchParams(window.location.search)
const id = query.get('id')
const tokenraw = localStorage.getItem('token')

class Categorydetail extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      shows: [],
      user: [],
      theatre: [],
      price:'',
      amount: 1,
    }
  }
  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      const token = jwt.verify(tokenraw, 'pssst!')
      axios.get('https://xcinemas.herokuapp.com//api/v1/user/'+token.userId)
     .then(res=>{
       this.setState({user: res.data})
     })
     }
    axios.get('https://xcinemas.herokuapp.com//api/v1/theatres/'+(id))
    .then(res=>{
      this.setState({data: res.data, shows: res.data.shows})
    })
  }
  render(){
    const date = new Date()
    const time = date.toTimeString().substring(0,5)
    return(
      <text>
        <Header />
      <Container>
        <Row>
          <Col className="mb-2">
            <h4>{this.state.data.title}</h4>
          </Col>
        </Row>
        <Row>
          <Col lg={3} className="mb-4">
          <Card bg="transparent" style={{border:"none", width:"250px"}}>
            <div style={{position:"absolute",color:"white",marginLeft:"5%",marginTop:"2%",backgroundColor:"blue",borderRadius:"10%",padding:"5px"}}>
            {this.state.data.censor_rating}
            </div>    
            <Card.Img variant="top" 
            src={this.state.data.img}
              />
          </Card>
          </Col>
          <Col>
          <div className="album">
          <Row>{this.state.shows.map(s=>(
            <Col lg={3}>
                <p>{s.theatre.name}</p>
                {s.startTime.substring(11,16) < time
                 ?
                <p>
                {localStorage.getItem('token') !== null ?
                <Button data-tip={'Rp. '+s.price} onClick={()=>window.location="/Booking?id="+(s.id)+'&mvid='+(this.state.data.id)}>{s.startTime.substring(11,16)}</Button>
                :
                <Login data-tip={'Rp. '+s.price} text={s.startTime.substring(11,16)} variant="primary" />
                }
                </p> 
                :
                <p><Button variant="secondary" disabled data-tip={'Rp. '+s.price}>{s.startTime.substring(11,16)}</Button></p>
                }
                <ReactTooltip />
            </Col>
          ))}</Row>
          </div>
          </Col>
        </Row>
      </Container>
      <Footer />
      </text>
    )
  }
}

export default Categorydetail;