import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

function Playlist() {
    return (
        <form>
            <input />
            <Tracklist />
            <input type='submit' value='Save to Spotify' />
        </form>
    );
}

export default Playlist;