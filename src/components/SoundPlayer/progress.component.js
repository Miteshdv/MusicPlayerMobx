import React from 'react';
import { Row,Col } from 'react-bootstrap';
class Progress extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(

        <Row className="progress">
          <Col md={2}>
            <span className="player__time-elapsed">{this.props.elapsed}</span>
          </Col>

          <Col md={10}>
            <Row>
              <Col md = {10}> <progress
                value={this.props.position}
                max="1"></progress></Col>
         <Col md ={2}> <span className="player__time-total">{this.props.total}</span></Col>

            </Row>
           </Col>
        </Row>

    )
  }

}

export default Progress
