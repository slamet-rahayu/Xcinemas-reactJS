import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import '../App.css';
import Register from '../App';
import Login from '../view/Login';
import Profile from '../view/Popover'

class Auth extends Component {
    render() {
        return(
                <div>
                <Navbar bg="dark" expand="md">
                <Navbar.Brand href="/" style={{fontSize:"40px",color:"white",fontFamily:"Edwardian Script ITC"}}><i class="fa fa-film"></i> X Cinemas</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    {localStorage.getItem('token') !== null ? <div style={{marginRight:"30px"}}><Profile /></div> : <text style={{display:"flex"}}><Register />&nbsp;<Login text={'Login'} variant="outline-light btn-sm" />&nbsp;</text>}
                </Navbar.Collapse>
                </Navbar>
                <br></br>
                </div>
        )
    }
}

export default Auth;