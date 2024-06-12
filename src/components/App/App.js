import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../Spotify';
import './App.module.css';

function App() {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistName, setPlaylistName] = useState('New Playlist');
    const [playlistTracks, setPlaylistTracks] = useState([]);

    const updatePlaylistName = (name) => {
        setPlaylistName(name);
    };

    const addTrackToPlaylist = (track) => {
        if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        }
        setPlaylistTracks([...playlistTracks, track]);
    };

    const removeTrackFromPlaylist = (track) => {
        setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id))
    };

    const savePlaylist = () => {
        const trackUris = playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(playlistName, trackUris).then(() => {
            setPlaylistName('New Playlist');
            setPlaylistTracks([]);
        });
    };

    const search = (term) => {
        Spotify.search(term).then(searchResults => {
            setSearchResults(searchResults);
        });
    };

    return (
        <div className='App'>
            <h1>Jammming</h1>
            <SearchBar onSearch={search} />
            <div className='App-playlist'>
                <SearchResults searchResults={searchResults} onAdd={addTrackToPlaylist} />
                <Playlist 
                    playlistName={playlistName}
                    playlistTracks={playlistTracks}
                    onRemove={removeTrackFromPlaylist}
                    onNameChange={updatePlaylistName}
                    onSave={savePlaylist}
                />
            </div>
        </div>
    );
}

export default App;