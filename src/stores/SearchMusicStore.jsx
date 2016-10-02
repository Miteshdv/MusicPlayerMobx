import { observable, action,computed } from 'mobx';


class SearchMusicStore {
  @observable searchedSongs = [];
  @observable totalPagedSongs  = 0;
  @observable currentPage = 1;
  totalPages = 10;

  @action loadSearchedSongs = (searchData) => {
    this.searchedSongs.replace(searchData);
    this.totalPagedSongs = Math.ceil(this.searchedSongs.length/this.totalPages);
    this.currentPage = 1;
  }

  @action clearSearchedSongs = () => {
    this.searchedSongs = [];
  }

  @computed get searchedSongsPaginated()
  {
    var lastPage = this.totalPages*this.currentPage-1;
    var firstPage = lastPage-(this.totalPages-1)
    return this.searchedSongs.slice(firstPage,lastPage)
  }

  @action loadNextPage(pageNum)
  {
    this.currentPage = pageNum;
  }
}


const searchMusicStore = new SearchMusicStore();

export default searchMusicStore;
export { SearchMusicStore };
