const clientId = 'aab86b4070b64918a4343c4d9d9e78d2';
const redirectUri = 'http://localhost:3000/';
const baseUrl = 'https://api.spotify.com/v1'
let accessToken;
export let accessDenied = false;

const Spotify = {
    getToken() {
        if (accessDenied)
            return;

        if (accessToken) {
            return accessToken;
        }

        const accessTokenInUrl = window.location.href.match(/access_token=([^&]*)/);
        const expiresInInUrl = window.location.href.match(/expires_in=([^&]*)/)

        if (accessTokenInUrl && expiresInInUrl) {
            accessToken = accessTokenInUrl[1];
            const expiresIn = expiresInInUrl[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.setTimeout(() => window.history.pushState('Access Token', null, '/'), expiresIn * 1000);
            return accessToken;
        } else {
            const errorInUrl = window.location.href.match(/error=([^&]*)/);

            if (errorInUrl) {
                accessDenied = true;
                window.history.pushState('Denied', null, '/');
            } else {
                accessDenied = false;
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`;
                window.location = accessUrl; 
            }
        }
    },

    async search(query) {
        const accessToken = this.accessToken ? this.accessToken : Spotify.getToken();
        const type = 'track';
        const endpoint = `${baseUrl}/search?q=${query}&type=${type}`;

        try {
            const response = await fetch(endpoint, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists.map(artist => artist.name).join(', '),
                    album: track.album.name,
                    uri: track.uri
                }));
            }
            throw new Error('Search Request Error');
        } catch (e) {
            console.log(e);
        }
    }
};

export default Spotify;