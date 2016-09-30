import React, {Component, PropTypes} from 'react'
import {List, ListItem, MakeSelectable} from 'material-ui/List'
let SelectableList = MakeSelectable(List)
import { observer} from 'mobx-react';
import SoundPlayerComponent from '../components/SoundPlayer/SoundPlayerComponent.jsx'

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
        windowHeight:window.innerHeight - 120
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index
      });
    };

    render() {
      return (
        <ComposedComponent style = {{overflowY:"auto",height:this.state.windowHeight}}
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      )
    }
  }
}

SelectableList = wrapState(SelectableList)

@observer
class SearchMusicList extends React.Component {

  render()
  {
      return (

        <SelectableList defaultValue = {-1} >
          {this.props.searchList.map((songItem,index) => (
          <ListItem
            value = {index}
            key={songItem.id}
            style  = {{WebkitAppearance:'none'}}
          >
            <SoundPlayerComponent songDetails = {songItem}/>
          </ListItem>
          ))}
        </SelectableList>

      )
  }

}

SearchMusicList.propTypes = {
  searchList: React.PropTypes.object
}



export default SearchMusicList
