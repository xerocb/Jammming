const clientId = 'aab86b4070b64918a4343c4d9d9e78d2';
const redirectUri = 'http://localhost:3000/';
const scope = 'playlist-modify-public user-library-read';
const baseUrl = 'https://api.spotify.com/v1';
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
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const errorInUrl = window.location.href.match(/error=([^&]*)/);

            if (errorInUrl) {
                accessDenied = true;
                window.history.pushState('Denied', null, '/');
            } else {
                accessDenied = false;
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
                window.location = accessUrl; 
            }
        }
    },

    async search(query) {
        const accessToken = Spotify.getToken();
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
    },

    async savePlaylist(name, uris) {
        const accessToken = Spotify.getToken();
        const userIdEndpoint = `${baseUrl}/me`;

        try {
            const userIdResponse = await fetch(userIdEndpoint, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (userIdResponse.ok) {
                return Spotify.createPlaylist(userIdResponse, name, uris);
            }
            throw new Error('User Id Error');
        } catch (e) {
            console.log(e);
        }
    },

    async createPlaylist(userIdResponse, name, uris) {
        const accessToken = Spotify.getToken();
        const jsonUserIdResponse = await userIdResponse.json();
        const userId = jsonUserIdResponse.id;
        const createPlaylistEndpoint = `${baseUrl}/users/${userId}/playlists`;

        try {
            const createPlaylistResponse = await fetch(createPlaylistEndpoint, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                method: 'POST',
                body: JSON.stringify({ name: name })
            });
            if (createPlaylistResponse.ok) {
                return Spotify.addTracksToPlaylist(createPlaylistResponse, uris);
            }
            throw new Error('Create Playlist Error');
        } catch (e) {
            console.log(e);
        }
    },

    async addTracksToPlaylist(createPlaylistResponse, uris) {
        const accessToken = Spotify.getToken();
        const jsonCreatePlaylistResponse = await createPlaylistResponse.json();
        const playlistId = jsonCreatePlaylistResponse.id;
        const addTracksEndpoint = `${baseUrl}/playlists/${playlistId}/tracks`;

        try {
            const addTracksResponse = await fetch(addTracksEndpoint, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                method: 'POST',
                body: JSON.stringify({ uris: uris })
            });
            if (addTracksResponse.ok) {
                return true;
            }
            throw new Error('Add Tracks to Playlist Error');
        } catch (e) {
            console.log(e);
        }
    },

    getRandomAlbumCover() {
        
    }
};

export default Spotify;