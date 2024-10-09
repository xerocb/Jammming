import React from 'react';
import Tracklist from '../Tracklist/Tracklist'
import styles from './SearchResults.module.css';

function SearchResults({ tracks, onAdd, onSearch }) {
    return (
        <div>
            <Tracklist 
                tracks={tracks}
                onAdd={onAdd}
                inPlaylist={false} />
        </div>
    );
}

export default SearchResults;