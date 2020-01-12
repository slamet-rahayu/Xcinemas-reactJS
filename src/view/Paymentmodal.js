import React, {Component} from 'react';
import { Button, Container, Row, Col, Modal, ButtonToolbar } from 'react-bootstrap';
import '../App.css';
import '../App';
import axios from 'axios'

class MyVerticallyCenteredModal extends Component {
  constructor(){
    super()
    this.state = {
      
    }
  }
  
  postData = e =>{
    axios.post('https://xcinemas.herokuapp.com/api/v1/booking', {
      user_id: 3,
      ticket_id: 11
    })
  }

  render(){
    return (
      <Modal
        show={this.props.show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Body>
            <div className="loginbox">
          <h4>Payment confirmation</h4>
          </div>
          <div>
          <Container>
        <Row>
          <Col>
            <table>
            <tr>
                <td>Movie</td>
                <td>:</td>
                <td>{this.props.movie}</td>
              </tr>
              <tr>
                <td>Tickets</td>
                <td>:</td>
                <td>{this.props.tickets}</td>
              </tr>
              <tr>
                <td>Theatre</td>
                <td>:</td>
                <td>{this.props.theatre}</td>
              </tr>
              <tr>
                <td>Seats</td>
                <td>:</td>
                <td>{this.props.seats}</td>
              </tr> 
              <tr>
                <td>Ticket price</td>
                <td>:</td>
                <td>Rp. {this.props.price}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>:</td>
                <td>Rp. {this.props.totalprice}</td>
              </tr>
              <tr>
                <td>Your Xtix balance</td>
                <td>:</td>
                <td>Rp. {this.props.balance}</td>
              </tr>
            </table>
          </Col>
        </Row>
        <Row className="mt-3">
            <Col style={{display:"flex",flex:"1"}}>
              <Button onClick={this.props.post}>Proceed</Button>
              &nbsp;
              <Button 
              onClick={this.props.onHide}
              variant="danger">Cancel</Button>
            </Col>
          </Row>
      </Container>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
  
}

function App(props) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <ButtonToolbar>
      <Button onClick={() => setModalShow(true)}>
        Proceed to payment
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        theatre={props.theatre}
        price={props.price}
        totalprice={props.totalprice}
        tickets={props.tickets}
        seats={props.seats}
        balance={props.balance}
        movie={props.movie}
        post={props.post}
      />
    </ButtonToolbar>
  );
}



export default App;