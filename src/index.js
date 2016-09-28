import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SearchMusicStore from './stores/SearchMusicStore';
import { Provider } from 'mobx-react';

//This plugin captures tap events faster.
// Some of the underlying component use it.
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
 const stores = {SearchMusicStore}
//Wrapping our main component into an MuiThemeProvider which is required by the Library to
const App = () => (


  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>

    <Provider {...stores}>
      <Main />
    </Provider>


  </MuiThemeProvider>

);
// Render the main component into the dom
ReactDOM.render(<App/>, document.getElementById('app'));
