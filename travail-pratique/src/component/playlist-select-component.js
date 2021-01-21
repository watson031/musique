import React from 'react'

const PlaylistSelectComponent = ({ id, name, playlists, onClickSelect, onClickMusic }) => (
    <div>
        <label htmlFor={id} className='labelMusic' onClick={onClickMusic}>Music</label>
        <select name={name} id={id} onClick={onClickSelect}>
            {playlists.map((option, index) => <option value={option.id} key={index}>{option.title}</option>)}
        </select>
    </div>
)

export default PlaylistSelectComponent
