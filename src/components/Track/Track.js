import React from 'react';
import styles from './Track.module.css';

function Track({ song }) {
    return (
        <div>
            <p>{song.name}</p>
            <p>{song.artist}</p>
            <p>{song.album}</p>
        </div>
    );
}

export default Track;