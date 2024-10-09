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
        <div>
            <input 
                type='text' 
                value={props.name} 
                onChange={handleChange} />
            <Tracklist 
                tracks={props.tracks}
                onRemove={props.onRemove}
                inPlaylist={true} />
            <button onClick={handleClick}>Save to Spotify</button>
        </div>
    );
}

export default Playlist;