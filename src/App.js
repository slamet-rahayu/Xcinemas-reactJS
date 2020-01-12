import React, {Component} from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Login from './view/Login';
import ReactDOM from 'react-dom';
import axios from 'axios'

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Body>
        <h3 align="center" style={{marginBottom:"20px"}}><b>Register</b></h3>
        <center>
        <FormRegister />
        </center>
      </Modal.Body>
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <ButtonToolbar>
      <Button variant="outline-light btn-sm" onClick={() => setModalShow(true)}>
        Register
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </ButtonToolbar>
  );
}

class FormRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
          firstname: '',
          lastname:'',
          username: '',
          dateOfBirth: '',
          phone: '',
          image: '',
          email: '',
          password: ''
        }
        this.formHandler = this.formHandler.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
    }
    formHandler(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    formSubmit(e) {
        axios.post('https://xcinemas.herokuapp.com//api/v1/register', {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          dateOfBirth: this.state.dateOfBirth,
          phone: this.state.phone,
          email: this.state.email,
          password: this.state.password
        })
        .then(res=>alert(res))
    }
    render() {
        return(
            <form onSubmit={this.formSubmit}>
            <label>Firstname</label>
            <input type="text"
             placeholder="&#128712;"
             style={{border:"none",borderBottom:"2px solid grey"}}
             name="firstname"
             onChange={this.formHandler}
             value={this.state.firstname}
             required
            ></input><br></br><br></br>
            <label>Lastname</label>
            <input type="text"
             placeholder="&#128712;"
             style={{border:"none",borderBottom:"2px solid grey"}}
             name="lastname"
             onChange={this.formHandler}
             value={this.state.lastname}
             required
            ></input><br></br><br></br>
            <label>Date Of Birth</label>
            <input type="date"
             placeholder="&#128712;"
             style={{border:"none",borderBottom:"2px solid grey"}}
             name="dateOfBirth"
             onChange={this.formHandler}
             value={this.state.dateOfBirth}
             required
            ></input><br></br><br></br>            
            <label>E-mail &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="email"
            placeholder="&#128712;"
            style={{border:"none",borderBottom:"2px solid grey"}}
            name="email"
            onChange={this.formHandler}
            value={this.state.email}
            required
            ></input><br></br><br></br>
            <label>Phone</label>
            <input type="text"
             placeholder="&#128712;"
             style={{border:"none",borderBottom:"2px solid grey"}}
             name="phone"
             onChange={this.formHandler}
             value={this.state.phone}
             required
            ></input><br></br><br></br>
            <label>Password</label>
            <input type="password"
             placeholder="&#128712;"
             style={{border:"none",borderBottom:"2px solid grey"}}
             name="password"
             onChange={this.formHandler}
             value={this.state.password}
             required
             ></input><br></br><br></br>
            <button className="btn btn-dark" type="submit">Register</button><br></br><br></br><br></br>
        </form>
        )
    }
}

export default App;