import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import Content from '../components/Content'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            filter: ''
        }
    }
    formHandler = e =>{
        this.setState({[e.target.name]: e.target.value})
    }
    render() {
return (
<text>
<Header />
<Container>
 <br></br>
<Row>
    <Col lg={4}>
    <div style={{backgroundColor:"#758184",height:"35px"}}>
    <h4 style={{marginLeft:"10px", color:"white"}}>Now Playing</h4>
    </div>
    </Col>
</Row>
<br></br>
<Content filter={this.state.filter} />
</Container>
<br></br>
<Footer />
</text>

        )
    }
}

export default Home;