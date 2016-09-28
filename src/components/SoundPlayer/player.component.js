import React from 'react';
import ClassNames from 'classnames';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    const playPauseClass = ClassNames({
      'fa fa-play': this.props.playStatus == 'PLAYING' ? false : true,
      'fa fa-pause': this.props.playStatus == 'PLAYING' ? true : false
    });
    return(
      <div className="player">

        <div className="player__main">
          <button onClick={this.props.togglePlay}><i className={playPauseClass}></i></button>
          <button onClick={this.props.stop}><i className="fa fa-stop"></i></button>
        </div>

      </div>
    )
  }

}

export default Player
