import React from 'react';
import TextField from 'material-ui/TextField';
import SearchMusicList from './SearchMusicList.jsx';
import { observer, inject } from 'mobx-react';
import  * as searchSongAction from '../actions/SearchSongAction';


@inject ('SearchMusicStore') @observer
class SearchView extends React.Component {

  onSearch(view,searchTxt)
  {
    if(searchTxt.length > 5)
    {
      searchSongAction.searchSong(searchTxt);
    }
    else
    {
      searchSongAction.clearSongList();
    }

  }

  render()
  {
    return (
      <div>
        <TextField hintText="Search" onChange ={this.onSearch.bind(this)}/>
        <SearchMusicList searchList ={this.props.SearchMusicStore.searchedSongs}/>

      </div>

    )
  }

}

SearchView.wrappedComponent.propTypes = {
  SearchMusicStore: React.PropTypes.object.isRequired
};

export default SearchView;
