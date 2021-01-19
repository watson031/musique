import React from 'react'

function displayTrack (oneTrack) {
    return (
        <div>
            <img src={oneTrack.src} alt={oneTrack.alt} />
            <h3>{oneTrack.title}</h3>
            <div>{oneTrack.style}</div>
            <div>{oneTrack.year}</div>
            <a href={oneTrack.href}>Details</a>
        </div>
    )
}
const SearchResultComponent = ({ tracks }) => (

    <div>
        {tracks.map(oneTrack => displayTrack(oneTrack))}
    </div>

)

export default SearchResultComponent
