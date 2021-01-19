import React from 'react'

function displaySongs (song, index) {
    return (
        <ul>
            <li>{song.artist} - {song.title} <button>+</button> </li>
        </ul>
    )
}
const DetailResultVideoComponent = ({ songs }) => (

    <div>
        {songs.map((song, index) => displaySongs(song, index))}
    </div>

)

export default DetailResultVideoComponent
