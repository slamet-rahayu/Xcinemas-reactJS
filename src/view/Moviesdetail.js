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
const jwt = require('jsonwebtoken')

const query = new URLSearchParams(window.location.search)
const id = query.get('id')
const tokenraw = localStorage.getItem('token')

class Categorydetail extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      datacategory: [],
      user: [],
      price:'',
      amount: 1,
      Loading: false
    }
    this.priceHandler = this.priceHandler.bind(this)
    this.amountIncrement = this.amountIncrement.bind(this)
    this.amountDecrement = this.amountDecrement.bind(this)
  }
  amountIncrement(e){
    e.preventDefault()
    this.setState({amount: this.state.amount+1})
  }
  amountDecrement(e){
    e.preventDefault()
    if(this.state.amount>1) {
    this.setState({amount: this.state.amount-1})
    }
  }
  priceHandler(e) {
    
  }

  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      const token = jwt.verify(tokenraw, 'pssst!')
      axios.get('https://xcinemas.herokuapp.com//api/v1/user/'+token.userId)
     .then(res=>{
       this.setState({user: res.data})
     })
     }
    axios.get('https://xcinemas.herokuapp.com//api/v1/movies/'+(id))
    .then(res=>{
      this.setState({data: res.data, datacategory: res.data.category})
      this.setState({price: res.data.price})
    })
  }
  render(){
    const price = this.state.amount * this.state.price
    return(
      <text>
        <Header />
      <Container>
        <Row>
          <Col className="mb-2">
            <h4>NOW PLAYING</h4>
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
            <Card.Body style={{backgroundColor:"#fddb3a"}}>
            <Button variant="transparent" onClick={()=>window.location="/Schedule?id="+this.state.data.id} block style={{color:"white",fontWeight:"bold"}}><text>Buy Ticket</text></Button>
            </Card.Body>
          </Card>            
          </Col>
          <Col>
              <div style={{display:"flex"}}>
                <h4 style={{color:"dark"}}>{this.state.data.title}</h4>
                <p style={{marginLeft:"40%"}}>{this.state.data.duration} Minutes</p>
              </div>
            <Row>
           <Col className="mt-3 mb-3" style={{fontSize:"15px"}}>
           <table>
             <tr>
               <td>Jenis</td>
               <td>:</td>
               <td>{this.state.data.genre}</td>
             </tr>
             <tr>
               <td>Produser</td>
               <td>:</td>
               <td>{this.state.data.producer}</td>
             </tr>
             <tr>
               <td>Sutradara</td>
               <td>:</td>
               <td>{this.state.data.sutradara}</td>
             </tr>
             <tr>
               <td>Penulis</td>
               <td>:</td>
               <td>{this.state.data.writer}</td>
             </tr>
             <tr>
               <td>Produksi</td>
               <td>:</td>
               <td>{this.state.data.production}</td>
             </tr>
             <tr>
               <td>Casts</td>
               <td>:</td>
               <td>{this.state.data.casts}</td>
             </tr>
           </table>
           </Col>
            </Row>
            <Row>
            <Col>
              <p><h5>SINOPSIS</h5></p>
              <p style={{fontSize:"15px"}}>{this.state.data.sinopsis}</p>
            </Col>
            <Col lg={3} style={{display:"flex",justifyContent:"space-between"}}>
              <p>Watch Trailer</p>
              <p>Playing At</p>
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