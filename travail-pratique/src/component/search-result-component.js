import React from 'react'
// id={oneTrack.master_id
function displayTrack (oneTrack, index, onClickDetail) {
    return (
        <div key={index}>
            <img src={oneTrack.cover_image} />
            <h3>{oneTrack.title}</h3>
            <div>{oneTrack.style}</div>
            <div>{oneTrack.year}</div>
            {/* <a href='../'>Details</a> */}
            <button className='link' onClick={onClickDetail} id={oneTrack.master_id}>Detail</button>
        </div>
    )
}
const SearchResultComponent = ({ albums, onClickDetail }) => (

    <div>
        {albums.map((oneTrack, index) => displayTrack(oneTrack, index, onClickDetail))}
    </div>

)

export default SearchResultComponent
