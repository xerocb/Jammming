import React from 'react';
import styles from './SearchBar.module.css';
import Spotify from '../../util/Spotify';

function SearchBar({ onSearch }) {

    const [query, setQuery] = React.useState('');

    const handleChange = ({ target }) => {
        setQuery(target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(query);
        setQuery('');
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input type='text' value={query} onChange={handleChange} />
            <input type='submit' value='Search' />
        </form>
    );
}

export default SearchBar;