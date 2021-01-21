import React from 'react'
// id={oneTrack.master_id
function displayTrack (oneTrack, index, onClickDetail) {
    return (
        <div key={index} className='albumList'>
            <div className='imgAlbum'>
                <img src={oneTrack.cover_image} />
            </div>
            <div className='contenuAlbum' id={index}>
                <h3>Title: {oneTrack.title}</h3>
                <div>Genre: {oneTrack.style}</div>
                <div>Year: {oneTrack.year}</div>
                <button className='link' onClick={onClickDetail} id={oneTrack.master_id}>Detail</button>
            </div>
        </div>
    )
}
const SearchResultComponent = ({ albums, onClickDetail }) => (

    <div>
        {albums.map((oneTrack, index) => displayTrack(oneTrack, index, onClickDetail))}
    </div>

)

export default SearchResultComponent
