import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import styles from './App.module.css';
import Spotify, { accessDenied } from '../../util/Spotify';

function App() {
  const [searchResults, setSearchResults] = React.useState([]);
  const [playlistName, setPlaylistName] = React.useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = React.useState([]);

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const addTrack = (track) => {
    if (playlistTracks.some(prev => prev.id === track.id)) {
      return;
    }

    setPlaylistTracks(prev => [...prev, track]);
  };

  const removeTrack = (id) => {
    setPlaylistTracks(prev => prev.filter(track => track.id != id));
  };

  const searchForTracks = async (query) => {
    if (!query)
      return;

    const tracks = await Spotify.search(query);
    setSearchResults(tracks);
  };

  const savePlaylist = () => {};

  Spotify.getToken();

  if (accessDenied) {
    return <p>Spotify access denied by user. Refresh and allow access to proceed.</p>;
  }

  return (
    <div>
      <SearchBar onSearch={searchForTracks}/>
      <SearchResults 
        tracks={searchResults}
        onAdd={addTrack} />
      <Playlist 
        name={playlistName} 
        tracks={playlistTracks} 
        onNameChange={updatePlaylistName}
        onRemove={removeTrack} />
    </div>
  );
}

export default App;