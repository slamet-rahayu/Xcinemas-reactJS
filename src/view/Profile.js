import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Moment from 'react-moment'
const jwt = require('jsonwebtoken')

const query = new URLSearchParams(window.location.search)
const id = query.get('id')
const tokenraw = localStorage.getItem('token')

class Profile extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      datacontent: [],
      user: [],
      Loading: false
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
    axios.get('https://xcinemas.herokuapp.com//api/v1/categories/3')
    .then(res=>{
      this.setState({data: res.data, datacontent: res.data.events})
    })
  }
  render(){
    return(
      <text>
    <Header />
      <Container className="mb-4">
      <Row>
        <Col lg={2}>
          <div 
          style={{
          width:"100px", 
          height:"100px", 
          fontSize:"80px", 
          backgroundColor:"grey",
          justifyContent:"center",
          display:"flex",
          color:"white",
          borderRadius:"100%"
          }}>
            <i class="fa fa-user mt-2"></i>
          </div>
        </Col>
        <Col>
            <p>{(this.state.user.firstname)+' '+(this.state.user.lastname)}</p>
            <p>{this.state.user.phone}</p>
            <p>{this.state.user.email}</p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <p><i class="fa fa-briefcase"></i> Your Xtix Balance : Rp. {this.state.user.balance},00</p>
          <p><i class="fa fa-credit-card"></i> Payment History</p>
          <p><i class="fa fa-pencil"></i> Update your profile</p>
          <p><i class="fa fa-sign-out"></i> Logout</p>
        </Col>
      </Row>
      </Container>
      <Footer />
      </text>
    )
  }
}

export default Profile;