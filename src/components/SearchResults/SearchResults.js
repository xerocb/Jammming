import React from 'react';
import Tracklist from '../Tracklist/Tracklist'
import styles from './SearchResults.module.css';

function SearchResults({ songs, onAdd }) {
    return (
        <div>
            <Tracklist 
                songs={songs}
                onAdd={onAdd}
                inPlaylist={false} />
        </div>
    );
}

export default SearchResults;