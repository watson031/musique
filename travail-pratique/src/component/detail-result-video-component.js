import React from 'react'

function displaySongs (song, index) {
    return (
        <ul key={index}>
            <li> <img src={song.images} />  {song.title} <i className='fa fa-plus' aria-hidden='true' /> </li>
        </ul>
    )
}
const DetailResultVideoComponent = ({ songs }) => (

    <div>
        {songs.map((song, index) => displaySongs(song, index))}
    </div>

)

export default DetailResultVideoComponent
