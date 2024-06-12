const clientId = '3ce8406978974c2c91f9ea9542b614fe';
const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        // Check for an access token in the URL
        const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenMatch && expiresInMatch) {
            accessToken = tokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // Clear the parameters from the URL, so the app doesn't try to grab the token again when it has expired
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            // Redirect to Spotify authorization
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    getCurrentUserId() {
        const accessToken = Spotify.getAccessToken();
        return fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => response.json())
            .then(jsonResponse => jsonResponse.id);
    },

    createPlaylist(userId, playlistName) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: playlistName })
        }).then(response => response.json())
          .then(jsonResponse => jsonResponse.id);
      },
    
      addTracksToPlaylist(playlistId, trackUris) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uris: trackUris })
        });
      },
    
      savePlaylist(playlistName, trackUris) {
        if (!playlistName || !trackUris.length) {
          return;
        }
    
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;
    
        return Spotify.getCurrentUserId().then(id => {
          userId = id;
          return Spotify.createPlaylist(userId, playlistName);
        }).then(playlistId => {
          return Spotify.addTracksToPlaylist(playlistId, trackUris);
        });
      },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artist[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    }
};


export default Spotify;