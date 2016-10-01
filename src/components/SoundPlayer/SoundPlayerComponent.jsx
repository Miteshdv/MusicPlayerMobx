//React library
import React from 'react';
//Sound component
import Sound from 'react-sound';
//Axios for Ajax
import Axios from 'axios';
//Custom components
import Details from './details.component';
import Player from './player.component';
import Progress from './progress.component';
import { Row,Col } from 'react-bootstrap';
import { observer} from 'mobx-react';

@observer
class SoundPlayerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.client_id = '2f98992c40b8edf17423d93bda2e04ab';
    this.state = {
      track: {stream_url: '', title: '', artwork_url: ''},
      tracks: [],
      playStatus: Sound.status.STOPPED,
      elapsed: '00:00',
      total: '00:00',
      position: 0,
      playFromPosition: 0,
      autoCompleteValue: ''
    };
  }

  componentWillReceiveProps(nextProps)
  {

    this.setState({
      track: {stream_url: nextProps.songDetails.stream_url, title: nextProps.songDetails.title, artwork_url: nextProps.songDetails.artwork_url},
      tracks: [],
      playStatus: Sound.status.STOPPED,
      elapsed: '00:00',
      total: this.formatMilliseconds(nextProps.songDetails.duration),
      position: 0,
      playFromPosition: 0,
      autoCompleteValue: ''
    });


  }



  prepareUrl(url) {
    //Attach client id to stream url

    return `${url}?client_id=${this.client_id}`
  }

  xlArtwork(url){
    return url.replace(/large/, 't500x500');
  }

  togglePlay(dispatchAction){

    // Check current playing state
    if(this.state.playStatus === Sound.status.PLAYING){
      // Pause if playing
      this.setState({playStatus: Sound.status.PAUSED})
    } else {
      // Resume if paused
      if(dispatchAction)
        this.setState({playStatus: Sound.status.PLAYING})
    }

    if(dispatchAction)
     this.props.playAction(this)
  }

  stop(){
    // Stop sound
    this.setState({playStatus: Sound.status.STOPPED});
  }

  forward(){
    this.setState({playFromPosition: this.state.playFromPosition+=1000*10});
  }

  backward(){
    this.setState({playFromPosition: this.state.playFromPosition-=1000*10});
  }

  handleSelect(value, item){
    this.setState({ autoCompleteValue: value, track: item });
  }

  handleChange(event, value){
    // Update input box
    this.setState({autoCompleteValue: event.target.value});
    let _this = this;
    //Search for song with entered value
    Axios.get(`https://api.soundcloud.com/tracks?client_id=${this.client_id}&q=${value}`)
      .then(function (response) {
        // Update track state
        _this.setState({tracks: response.data});
      })
      .catch(function () {
        //console.log(err);
      });
  }


  formatMilliseconds(milliseconds) {
   // var hours = Math.floor(milliseconds / 3600000);
    milliseconds = milliseconds % 3600000;
    var minutes = Math.floor(milliseconds / 60000);
    milliseconds = milliseconds % 60000;
    var seconds = Math.floor(milliseconds / 1000);
    milliseconds = Math.floor(milliseconds % 1000);

    return (minutes < 10 ? '0' : '') + minutes + ':' +
      (seconds < 10 ? '0' : '') + seconds;
  }

  handleSongPlaying(audio){
    this.setState({  elapsed: this.formatMilliseconds(audio.position),
      total: this.formatMilliseconds(audio.duration),
      position: audio.position / audio.duration })
  }

  handleSongFinished () {
    this.randomTrack();
  }



  render () {

    return (
      <Row>

        <Col xs={2} md={2}>
        <Details
          title={this.props.songDetails.title}

        />
        <Sound
          url={this.prepareUrl(this.props.songDetails.stream_url)}
          playStatus={this.state.playStatus}
          onPlaying={this.handleSongPlaying.bind(this)}
          playFromPosition={this.state.playFromPosition}
          onFinishedPlaying={this.handleSongFinished.bind(this)}
          />
          </Col>

          <Col xs={2} md={2}><Player
            togglePlay={this.togglePlay.bind(this,true)}
            stop={this.stop.bind(this)}
            playStatus={this.state.playStatus}
            forward={this.forward.bind(this)}
            backward={this.backward.bind(this)}

          /></Col>
          <Col xs={4} md={4}><Progress
            elapsed={this.state.elapsed}
            total={this.formatMilliseconds(this.props.songDetails.duration)}
            position={this.state.position}
            /></Col>




      </Row>
    );
  }
}

SoundPlayerComponent.propTypes = {
  songDetails: React.PropTypes.object,
  playAction:React.PropTypes.func
}

export default SoundPlayerComponent
