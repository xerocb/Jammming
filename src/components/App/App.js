import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import styles from './App.module.css';
import { MockSongs } from '../MockSongs';

function App({ songs }) {
  return (
    <div>
      <SearchBar />
      <SearchResults songs={MockSongs} />
      <Playlist />
    </div>
  );
}

export default App;