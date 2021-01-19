import React from 'react'

const PlaylistSelectComponent = ({ id, name, options }) => (
    <div>
        <select name={name} id={id}>
            {options.map((option, index) => <option value={option.id} key={index}>{option.title}</option>)}
        </select>
    </div>
)

export default PlaylistSelectComponent
