import React from 'react';
import { Row,Col } from 'react-bootstrap';
import Slider from 'material-ui/Slider';

class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentProgressValue:0,position:0}
  }

  changeSeekValue()
  { 
       this.setState({position:this.progressBar.getValue()})
       this.props.seekTo(this.state.currentProgressValue,this.progressBar.getValue())
  }

  dragStart()
  { 
    
    this.setState({currentProgressValue:this.progressBar.getValue()})
  }

  componentWillReceiveProps(nextProps)
  {
      this.setState({position:nextProps.position})
  }

  render(){

    return(
      <div style = {{width:'300px'}}>
            <div style = {{marginRight:'8px',float:'left',marginTop:'2px'}}>{this.props.elapsed}</div>
              <Slider ref={(ref) => this.progressBar = ref} value={this.state.position}
                      onDragStart = {this.dragStart.bind(this)}
                      sliderStyle = {{width:'200px',height:'30px',margin:'2px',float:'left'}}
                      onChange = {this.changeSeekValue.bind(this)}
                     />
              
              <div style = {{margin:'2px',float:'left'}}>{this.props.total}</div>
           
        </div>

    )
  }

}

Progress.propTypes = {
  seekTo: React.PropTypes.func  
}

export default Progress
