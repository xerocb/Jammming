import React from 'react';
import Track from '../Track/Track';
import styles from './Tracklist.module.css';

function Tracklist({ tracks=[], onAdd, onRemove, inPlaylist }) {
    const tracksJsx = tracks.map((track) => {
        return (
        <Track 
            track={track} 
            key={track.id}
            onAdd={onAdd}
            onRemove={onRemove}
            inPlaylist={inPlaylist} />
        );
    });

    return (
        <div>
            {tracksJsx}
        </div>
    );
}

export default Tracklist;