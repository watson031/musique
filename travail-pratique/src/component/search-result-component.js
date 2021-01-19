import React from 'react'

function displayTrack (oneTrack, index) {
    return (
        <div key={index}>
            <img src={oneTrack.cover_image} />
            <h3>{oneTrack.title}</h3>
            <div>{oneTrack.style}</div>
            <div>{oneTrack.year}</div>
            {/* <a href='../'>Details</a> */}
            <button className='link' id='btnWishyWashy'>Detail</button>
        </div>
    )
}
const SearchResultComponent = ({ albums }) => (

    <div>
        {albums.map((oneTrack, index) => displayTrack(oneTrack, index))}
    </div>

)

export default SearchResultComponent
