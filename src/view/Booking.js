import React, { Component } from 'react';
import { Button, Card} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Moment from 'react-moment'
import NumberFormat from 'react-number-format'
import Payment from './Paymentmodal'
const jwt = require('jsonwebtoken')

const query = new URLSearchParams(window.location.search)
const id = query.get('id')
const mvid = query.get('mvid')
const tokenraw = localStorage.getItem('token')

class Categorydetail extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      seats: [],
      seats_no: [],
      postdata: [],
      tickets: [],
      user: [],
      theatre: [],
      movie: [],
    }
  }
  postData = e =>{
    axios.post('https://xcinemas.herokuapp.com/api/v1/booking', this.state.postdata)
    .then(res=>{
      if(res.data.message === "success"){
        alert('sukses')
        // window.location="/"
      }
    })
    .catch(err=>alert('error',err))
  }
  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      const token = jwt.verify(tokenraw, 'pssst!')
      axios.get('https://xcinemas.herokuapp.com/api/v1/user/'+token.userId)
     .then(res=>{
       this.setState({user: res.data})
     })
     }
    axios.get('https://xcinemas.herokuapp.com/api/v1/myticket/'+(id))
    .then(res=>{
      this.setState({data: res.data, theatre: res.data.theatre, seats: res.data.theatre.seats})
    })
    axios.get('https://xcinemas.herokuapp.com/api/v1/movies/'+(mvid))
    .then(res=>{
      this.setState({movie: res.data})
    })
  }
  render(){
    return(
      <text>
        <Header />
      <Container className="mb-5">
      <Row>
        <Col>
      <Row className="mb-3">
      <Col>
          <div style={{backgroundColor:"blue",textAlign:"center",color:"white"}}>Screen</div>
      </Col>
      </Row>
      <div className="album">
        <Row>
        {this.state.seats.map(s=>{
              return(
                this.state.seats_no.length < 5 ?
                <Col className="mb-3">
                {s.tickets.map(p=>
                <text>
                {this.state.seats_no.find(e=>e === s.seat_no) ? 
                 <Button 
                 onClick={()=>this.setState({
                   seats_no: this.state.seats_no.filter(item=> item !== s.seat_no),
                   postdata: this.state.postdata.filter(item=> item.ticket_id !== p.id)
                   })}
                 variant="warning">{s.seat_no}</Button>
                 :   
                 <text>{s.tickets.find(e=>e !== s.id) ? 
                  <Button 
                  onClick={()=>this.setState(prevState=>({
                  seats_no: [...prevState.seats_no, s.seat_no],
                  postdata: [...prevState.postdata, {
                    user_id: this.state.user.id,
                    ticket_id : p.id
                  }]
                  }))}
                 variant="primary">{s.seat_no}
                 </Button>
                 :
                 <Button variant="secondary" disabled>{s.seat_no}</Button>
                 }</text>
                 }
                </text>
                )}
                </Col>
                :
                <Col className="mb-3">
                 <Button 
                 variant="secondary"
                 onClick={()=>this.setState({seats_no: [] ,postdata: []})}
                 >{s.seat_no}</Button>
                </Col>
              )
            })}
      </Row>
      </div>
        </Col>
        <Col>
        <Row>
          <Col style={{fontSize:"15px"}}>
          <table>
          <tr>
            <td>Movie</td>
            <td>:</td>
            <td>{this.state.movie.title}</td>
          </tr>
          <tr>
            <td>Theatre</td>
            <td>:</td>
            <td>{this.state.theatre.name}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>:</td>
            <td>{this.state.theatre.location}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>:</td>
            <td>{this.state.theatre.phone}</td>
          </tr>
          <tr>
            <td>Date & Time</td>
            <td>:</td>
            <td>
            <Moment format="DD MMM YYYY HH:mm">
            {this.state.data.startTime}
            </Moment>
            </td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>:</td>
            <td>{this.state.theatre.phone}</td>
          </tr>
        </table>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <p><b>Seat Number : </b></p>
            <p>
              <Row>{this.state.seats_no.map(s=>
              <Col lg={2}>
              <Button variant="warning">{s}</Button>
              </Col>
              )}</Row>
              {this.state.seats_no.length === 0 ? <Button disabled>No seats selected</Button> : ""}
              <Row className="mt-4">
                <Col><b>{this.state.seats_no.length} Seats selected</b></Col>
              </Row>
              <Row className="mt-4">
                <Col style={{color:"green", fontSize:"25px"}}>
                <NumberFormat 
                value={this.state.data.price * this.state.seats_no.length} 
                displayType="text" prefix={'Rp. '} 
                thousandSeparator />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  {this.state.seats_no.length === 0 ? 
                  <Button variant="secondary" disabled>Proceed to payment</Button>
                  :
                  <Payment
                  movie={this.state.movie.title}
                  theatre={this.state.theatre.name}
                  price={this.state.data.price}
                  totalprice={this.state.data.price * this.state.seats_no.length}
                  tickets={this.state.seats_no.length}
                  seats={this.state.seats_no+''}
                  balance={this.state.user.balance}
                  post={this.postData}
                   />
                  }
                </Col>
              </Row>
            </p>
          </Col>
          <Col>
          <Card bg="transparent" style={{border:"none"}}> 
                    <Card.Img variant="top" 
                    src={this.state.movie.img}
                     />
          </Card>
          </Col>
        </Row>
        </Col>
      </Row>
      </Container>
      <Footer />
      </text>
    )
  }
}



export default Categorydetail;