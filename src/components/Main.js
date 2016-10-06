require('normalize.css/normalize.css');
require('../styles/App.css');
require('../styles/MusicPlayer.css');

import React from 'react';
import AppBar from 'material-ui/AppBar';

import SearchView from './SearchView.jsx';


class AppComponent extends React.Component {
  render() {
    return (


          <div>
            <AppBar title='Musix Application' />
            <SearchView/>
          </div>

    );
  }
}



export default AppComponent;
