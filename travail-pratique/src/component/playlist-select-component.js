import React from 'react'

const PlaylistSelectComponent = ({ id, name, options }) => (
    <div>
        <select name={name} id={id}>
            <option defaultValue>Choose...</option>
            {options.map((option, index) => <option value={option.value} key={index}>{option.label}</option>)}
        </select>
    </div>
)

export default PlaylistSelectComponent
