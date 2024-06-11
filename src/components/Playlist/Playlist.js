import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import './Playlist.module.css';

function Playlist() {
    return (
        <div className='Playlist'>
            <h2>Playlist</h2>
            <input defaultValue="New Playlist" />
            <Tracklist />
            <button className='SaveButton'>SAVE TO SPOTIFY</button>
        </div>
    );
}
export default Playlist;
