import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import styles from './App.module.css';
import { MockSongs } from '../MockSongs';

function App() {
  const [searchResults, setSearchResults] = React.useState(MockSongs);
  const [playlistName, setPlaylistName] = React.useState('New Playlist');
  const [playlistSongs, setPlaylistSongs] = React.useState(MockSongs);

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const addTrack = (song) => {
    if (playlistSongs.some(prev => prev.id === song.id)) {
      return;
    }

    setPlaylistSongs(prev => [...prev, song]);
  }

  const removeTrack = (id) => {
    setPlaylistSongs(prev => prev.filter(song => song.id != id));
  }

  return (
    <div>
      <SearchBar />
      <SearchResults 
        songs={searchResults}
        onAdd={addTrack} />
      <Playlist 
        name={playlistName} 
        songs={playlistSongs} 
        onNameChange={updatePlaylistName}
        onRemove={removeTrack} />
    </div>
  );
}

export default App;