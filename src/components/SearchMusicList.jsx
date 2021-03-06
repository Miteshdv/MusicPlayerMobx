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
      window.onresize = this.resizeView.bind(this)
      this.setState({
        selectedIndex: this.props.defaultValue,
        windowHeight:window.innerHeight - 150
      });
    }

    resizeView()
    {

      this.setState({windowHeight:window.innerHeight-150})
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index
      });
    };

    render() {
      return (
        <ComposedComponent style = {{overflowY:'auto',height:this.state.windowHeight}}
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

  pevComp = null;

  stopPrevPlay(currentComp)
  {
    if(this.prevComp)
    {
      this.prevComp.togglePlay(false)

    }

    this.prevComp = currentComp
  }

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
            <SoundPlayerComponent songDetails = {songItem} playAction = {this.stopPrevPlay.bind(this)}/>
          </ListItem>
          ))}
        </SelectableList>

      )
  }

}

SearchMusicList.propTypes = {
  searchList: React.PropTypes.array
}



export default SearchMusicList
