import React from 'react';
import TextField from 'material-ui/TextField';
import SearchMusicList from './SearchMusicList.jsx';
import PaginationComponent from './PaginationComponent.jsx';
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

  loadPage(pageNum)
  {
    this.props.SearchMusicStore.loadNextPage(pageNum);
  }

  render()
  {
    return (
      <div>
        <TextField hintText="Search" onChange ={this.onSearch.bind(this)}/>
        <PaginationComponent ref={(ref) => this.paginationBar = ref} totalPages = {this.props.SearchMusicStore.totalPagedSongs} loadPage = {this.loadPage.bind(this)} style={{width:'100%',height:'30px'}}/>
        <SearchMusicList searchList ={this.props.SearchMusicStore.searchedSongsPaginated}/>


      </div>

    )
  }

}

SearchView.wrappedComponent.propTypes = {
  SearchMusicStore: React.PropTypes.object.isRequired
};

export default SearchView;
