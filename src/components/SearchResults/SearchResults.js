import React from 'react';
import Tracklist from '../Tracklist/Tracklist'
import styles from './SearchResults.module.css';

function SearchResults({ tracks, onAdd }) {
    return (
        <div className={styles.results}>
            <h2>Results</h2>
            <Tracklist 
                tracks={tracks}
                onAdd={onAdd}
                inPlaylist={false} />
        </div>
    );
}

export default SearchResults;