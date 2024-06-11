import React from 'react';
import Track from '../Track/Track';
import './Tracklist.module.css';

function Tracklist() {
    const tracks = [
        { id: 1, name: 'Song 1', artist: 'Artist 1', album: 'Album 1'},
        { id: 2, name: 'Song 2', artist: 'Artist 2', album: 'Album 2'}
    ];

    return (
        <div className='Tracklist'>
            {tracks.map(track => (
                <Track key={track.id} track={track} />
            ))}
        </div>
    );
}

export default Tracklist;