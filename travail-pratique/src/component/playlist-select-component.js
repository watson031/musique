import React from 'react'

const PlaylistSelectComponent = ({ id, name, playlists, onClick }) => (
    <div>
        <label htmlFor={id}>Music</label>
        <select name={name} id={id} onClick={onClick}>
            {playlists.map((option, index) => <option value={option.id} key={index}>{option.title}</option>)}
        </select>
    </div>
)

export default PlaylistSelectComponent
