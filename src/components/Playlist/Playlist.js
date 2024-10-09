import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

function Playlist(props) {
    const handleChange = ({ target }) => {
        props.onNameChange(target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(props.tracks.map(track => track.uri));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type='text' 
                value={props.name} 
                onChange={handleChange} />
            <Tracklist 
                tracks={props.tracks}
                onRemove={props.onRemove}
                inPlaylist={true} />
            <input 
                type='submit' 
                value='Save to Spotify' />
        </form>
    );
}

export default Playlist;