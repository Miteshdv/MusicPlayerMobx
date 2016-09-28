import { observable, action } from 'mobx';


class SearchMusicStore {
  @observable searchedSongs = [];



  @action loadSearchedSongs = (searchData) => {
    this.searchedSongs = searchData;
  }

  @action clearSearchedSongs = () => {
    this.searchedSongs = [];
  }

}


const searchMusicStore = new SearchMusicStore();

export default searchMusicStore;
export { SearchMusicStore };
