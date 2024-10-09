import React from 'react';
import Track from '../Track/Track';
import styles from './Tracklist.module.css';

function Tracklist({ songs=[], onAdd, onRemove, inPlaylist }) {
    const tracks = songs.map((song) => {
        return (
        <Track 
            song={song} 
            key={song.id}
            onAdd={onAdd}
            onRemove={onRemove}
            inPlaylist={inPlaylist} />
        );
    });

    return (
        <div>
            {tracks}
        </div>
    );
}

export default Tracklist;