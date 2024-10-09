import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

function Playlist(props) {
    const handleChange = ({ target }) => {
        props.onNameChange(target.value);
    };

    const handleClick = (event) => {
        props.onSave(props.name, props.tracks.map(track => track.uri));
    }

    return (
        <div className={styles.playlist}>
            <div className={styles.name}>
                <input 
                    type='text' 
                    value={props.name}
                    placeholder='Name your new playlist'
                    onChange={handleChange} />
            </div>
            <Tracklist 
                tracks={props.tracks}
                onRemove={props.onRemove}
                inPlaylist={true} />
            <div className={styles.button}>
                <button onClick={handleClick}>Save to Spotify</button>
            </div>
        </div>
    );
}

export default Playlist;
