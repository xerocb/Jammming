import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

function Playlist(props) {
    const handleChange = ({ target }) => {
        props.onNameChange(target.value);
    };

    return (
        <form>
            <input 
                type='text' 
                value={props.name} 
                onChange={handleChange} />
            <Tracklist 
                songs={props.songs}
                onRemove={props.onRemove}
                inPlaylist={true} />
            <input 
                type='submit' 
                value='Save to Spotify' />
        </form>
    );
}

export default Playlist;