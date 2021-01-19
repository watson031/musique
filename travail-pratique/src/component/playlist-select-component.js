import React from 'react'

const PlaylistSelectComponent = ({ id, name, playlists }) => (
    <div>
        <label htmlFor={id}>Music</label>
        <select name={name} id={id}>
            {playlists.map((option, index) => <option value={option.id} key={index}>{option.title}</option>)}
        </select>
    </div>
)

export default PlaylistSelectComponent
