import React from 'react'

function displaySongs (track, index, onClickToggle, test) {
    return (

        <li key={index}> {track.title} <span className='notChecked'><i className='fa fa-plus' aria-hidden='true' id={index} onClick={onClickToggle} /></span> </li>

    )
}
const DetailResultVideoComponent = ({ tracks, img, artistName, style, year, onClickToggle }) => (

    <div className='details'>
        <div>
            <img src={img} />

            <div><strong>{artistName}</strong></div>
            <div>Style: {style}</div>
            <div>Year: {year}</div>
        </div>
        <div>
            <div>
                <h1>Add to playlists</h1>
            </div>
            <ul>
                {tracks.map((track, index) => displaySongs(track, index, onClickToggle))}
            </ul>
        </div>
    </div>

)

export default DetailResultVideoComponent
