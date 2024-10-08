import React from 'react';
import Tracklist from '../Tracklist/Tracklist'
import styles from './SearchResults.module.css';

function SearchResults({ songs }) {
    return (
        <div>
            <Tracklist songs={songs} />
        </div>
    );
}

export default SearchResults;