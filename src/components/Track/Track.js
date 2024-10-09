import React from 'react';
import styles from './Track.module.css';

function Track({ song, onAdd, onRemove, inPlaylist }) {
    const handleClick = (event) => {
        event.preventDefault();

        if (inPlaylist) {
            onRemove(song.id);
        } else {
            onAdd(song);
        }
    };

    return (
        <div>
            <p>{song.name}</p>
            <p>{song.artist}</p>
            <p>{song.album}</p>
            <button onClick={handleClick}>{inPlaylist ? '-' : '+'}</button>
        </div>
    );
}

export default Track;