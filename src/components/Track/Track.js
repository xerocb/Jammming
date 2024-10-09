import React from 'react';
import styles from './Track.module.css';

function Track({ track, onAdd, onRemove, inPlaylist }) {
    const handleClick = (event) => {
        event.preventDefault();

        if (inPlaylist) {
            onRemove(track.id);
        } else {
            onAdd(track);
        }
    };

    return (
        <div>
            <p>{track.name}</p>
            <p>{track.artist}</p>
            <p>{track.album}</p>
            <button onClick={handleClick}>{inPlaylist ? '-' : '+'}</button>
        </div>
    );
}

export default Track;