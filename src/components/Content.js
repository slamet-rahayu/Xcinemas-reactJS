import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import '../App.css';

const jwt = require('jsonwebtoken')
const tokenraw = localStorage.getItem('token')

class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
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
    axios.get('https://xcinemas.herokuapp.com//api/v1/movies')
    .then(res=>{
        this.setState({data: res.data})
    })
    }
    render(){
        return(
        <text>
        <div className="album">
        <Row>{this.state.data.map((s,k)=>{
            return(
                <Col sm={3} className="mb-3">
                <Card bg="transparent" style={{border:"none"}}>
                    <a href={'/moviesdetail?id='+(s.id)}>    
                    <Card.Img variant="top" 
                    src={s.img}
                     />
                    </a>
                    <Card.Body>
                    <a href={'/moviesdetail?id='+(s.id)}>
                    <p style={{textAlign:"center",fontWeight:"bold"}}>{s.title}</p>
                    <p style={{textAlign:"center",fontWeight:"bold"}}>{s.parental}</p>
                    </a>
                    </Card.Body>
                </Card>
                </Col>
            )
        })}</Row>
        </div>
        </text>)
    }
}

export default Content;