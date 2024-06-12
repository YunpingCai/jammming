import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import './Playlist.module.css';

function Playlist({ playlistName, playlistTracks, onRemove, onNameChange, onSave }) {
    const handleNameChange = (event) => {
        onNameChange(event.target.value)
    };

    return (
        <div className='Playlist'>
            <h2>Playlist</h2>
            <input 
                value={playlistName} 
                onChange={handleNameChange} 
                placeholder='Enter playlist name'/>
            <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
            <button className='SaveButton' onClick={onSave}>SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;