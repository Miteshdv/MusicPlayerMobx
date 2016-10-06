import  'whatwg-fetch';
import SearchMusicStore from '../stores/SearchMusicStore.jsx'


export function searchSong(query)
{
  var url = 'https://api.soundcloud.com/tracks?q='+query+'&format=json&client_id=2f98992c40b8edf17423d93bda2e04ab&limit=200';
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      SearchMusicStore.loadSearchedSongs(data);
    });
}

export function clearSongList()
{

      SearchMusicStore.clearSearchedSongs();

}
