import React from 'react';
import styles from './Track.module.css';

function Track({ track, onAdd, onRemove, inPlaylist, albumCover, previewUrl }) {
    const handleClick = (event) => {
        event.preventDefault();

        if (inPlaylist) {
            onRemove(track.id);
        } else {
            onAdd(track);
        }
    };

    const infoStyle = {
        backgroundImage: albumCover,
        backgroundPosition: 'center',
        backgroundSize: '80%',
        backgroundRepeat: 'no-repeat',
    };

    const audioCheck = () => {
        if (previewUrl) {
            return <audio controls src={previewUrl}></audio>;
        } else {
            return <p>Preview not available.</p>;
        }
    };

    return (
        <div className={styles.track}>
            <div style={infoStyle} className={styles.info}>
                <h3>{track.name}</h3>
                <p className={styles.artist}>{track.artist}</p>
                <p className={styles.album}>{track.album}</p>
                <div className={styles.audio}>
                    {audioCheck()}
                </div>
            </div>
            <div className={styles.button}>
                <button onClick={handleClick}>{inPlaylist ? '-' : '+'}</button>
            </div>
        </div>
    );
}

export default Track;