import React, { Component } from 'react';
import { Overlay, ButtonToolbar, Popover} from 'react-bootstrap';
import axios from 'axios'

const jwt = require('jsonwebtoken')
const tokenraw = localStorage.getItem('token')

function Example() {
    const [show, setShow] = React.useState(false);
    const [target, setTarget] = React.useState(null);
    const ref = React.useRef(null);
  
    const handleClick = event => {
      setShow(!show);
      setTarget(event.target);
    };
  
    return (
      <ButtonToolbar ref={ref}>
        <button 
        onClick={handleClick}
        style={{borderRadius:"100%",width:"40px",height:"40px",border:"none",color:"black"}}><i class="fa fa-user"></i></button>
  
        <Overlay
          show={show}
          target={target}
          placement="bottom"
          container={ref.current}
          containerPadding={-1}
        >
          <Popover id="popover">
              <Popover.Title>
              <Profiletitle />
              </Popover.Title>
          <Popover.Content>
              <p><Content /></p>
              <p><Logout /></p>
          </Popover.Content>
          </Popover>
        </Overlay>
      </ButtonToolbar>
    );
  }

  class Logout extends Component {
    constructor(props) {
      super(props)
      this.state = {
        data: []
      }
      this.logoutTrigger = this.logoutTrigger.bind(this)
    }
    logoutTrigger(e) {
      localStorage.clear()
      window.location = '/'
    }
    render(){
      return(
        <text>
          <button onClick={this.logoutTrigger}
          style={{background:"none",border:"none"}}><i class="fa fa-sign-out"></i> Logout</button>
        </text>
      )
    }
  }
  
  class Profiletitle extends Component {
    constructor(props){
      super(props)
      this.state = {
        user: [],
      }
    }
    componentDidMount() {
      if (localStorage.getItem('token') !== null) {
       const token = jwt.verify(tokenraw, 'pssst!')
       axios.get('https://xcinemas.herokuapp.com/api/v1/user/'+token.userId)
      .then(res=>{
        this.setState({user: res.data})
        console.log(res)
      })
      }
    }
    render() {
      return(
        <text><p><a href="/profile" >{(this.state.user.firstname)+' '+(this.state.user.lastname)}</a></p></text>
      )
    }
  }

class Content extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: [],
    }
  }
  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
     const token = jwt.verify(tokenraw, 'pssst!')
     axios.get('https://xcinemas.herokuapp.com/api/v1/user/'+token.userId)
    .then(res=>{
      this.setState({user: res.data})
    })
    }
  }
  render(){
    return(
      <text>
        <p><a href={'/Myticket?id='+(this.state.user.id)}><i class="fa fa-ticket"></i> My Ticket</a></p>
        <p><i class="fa fa-briefcase"></i> Balance : Rp. {this.state.user.balance}</p>
      </text>
    )
  }
}

export default Example;