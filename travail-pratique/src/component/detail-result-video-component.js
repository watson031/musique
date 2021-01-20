import React from 'react'

function displaySongs (track, index) {
    return (
        <ul key={index}>
            <li> {track.title} <i className='fa fa-plus' aria-hidden='true' /> </li>
        </ul>
    )
}
const DetailResultVideoComponent = ({ tracks, img, artistName, style, year }) => (

    <div>
        <img src={img} />
        <div><strong>{artistName}</strong></div>
        <div>Style: {style}</div>
        <div>Year: {year}</div>
        {tracks.map((track, index) => displaySongs(track, index))}
    </div>

)

export default DetailResultVideoComponent
