import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import '../App.css';
import '../App';
import axios from 'axios'

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      variant="bg-danger"
    >
      <Modal.Body>
          <div className="loginbox">
        <h3 align="center"><b>Login</b></h3>
        <p style={{fontSize:"15px",color:"grey",textAlign:"center"}}>
        </p><br></br><br></br>
        <center>
            <Form />
        </center>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function App(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <ButtonToolbar>
      <Button variant={props.variant} onClick={() => setModalShow(true)}>
        {props.text}
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </ButtonToolbar>
  );
}

class Form extends Component {
  userData;
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errormsg: '',
      isLoggedIn: false
    }
    this.formHandler = this.formHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }
  formHandler(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  submitHandler(e){
    // // e.preventDefault()
    // if (this.state.password.lengh > 1 && this.state.password.length <= 8) {
    //  alert('password must be at least 8 char min') 
    // }
    // axios.post('https://xcinemas.herokuapp.com/api/v1/login', {
    //   email: this.state.email,
    //   password: this.state.password
    // }).then(res=>{
    //   if (res.data.token !== undefined) {
    //     localStorage.setItem('token', res.data.token)
    //     window.location.reload()
    //   }else{
    //     this.setState({errormsg: res.data.error})
    //   }
    // })
    // .catch(err=>{
    //   console.log('error', err)
    // })
    if (this.state.password.length < 1 || this.state.email.length < 1) {
      this.setState({errormsg: 'please enter your email and password!'})
    } else {
      axios.post('https://xcinemas.herokuapp.com/api/v1/login', {
      email: this.state.email,
      password: this.state.password
    }).then(res=>{
      if (res.data.token !== undefined) {
        localStorage.setItem('token', res.data.token)
        window.location.reload()
      }else{
        this.setState({errormsg: res.data.error})
      }
    })
    }
  }
render () {
  return (
    <div>
        <label>Your email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input type="email"
        name="email"
          placeholder="&#128712;"
        style={{border:"none",borderBottom:"1px solid grey"}} 
        value={this.state.email}
          onChange={this.formHandler}
          required
          ></input><br></br><br></br>
        <label>Your password</label>
        <input type="password"
        name="password"
          placeholder="&#128712;"
        style={{border:"none",borderBottom:"1px solid grey"}}
        value={this.state.password}
          onChange={this.formHandler}
          required
          ></input><br></br><br></br><br></br>
        <button className="btn btn-dark" type="submit" onClick={this.submitHandler}>Login</button><br></br><br></br><br></br>
        <center><text style={{color:"red"}}>{this.state.errormsg}</text></center>
    </div>
  )
}

}


export default App;