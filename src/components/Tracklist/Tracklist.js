import React from 'react';
import Track from '../Track/Track';
import styles from './Tracklist.module.css';

function Tracklist({ songs=[] }) {
    const tracks = songs.map(song => <Track song={song} />);

    return (
        <div>
            {tracks}
        </div>
    );
}

export default Tracklist;