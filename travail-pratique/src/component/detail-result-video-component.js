import React from 'react'
// className='notChecked'
function displaySongs (track, index, onClickToggle, test) {
    const classNameSpan = track.isChecked ? 'checked' : 'notChecked'
    const classNamei = track.isChecked ? 'fa fa-check' : 'fa fa-plus'
    return (

        <li key={index}> {track.title}  <span className={classNameSpan}><i className={classNamei} aria-hidden='true' id={index} onClick={onClickToggle} /></span> </li>

    )
}
const DetailResultVideoComponent = ({ tracks, img, artistName, style, year, onClickToggle, test }) => (

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
                {tracks.map((track, index) => displaySongs(track, index, onClickToggle, test))}
            </ul>
        </div>
    </div>

)

export default DetailResultVideoComponent
