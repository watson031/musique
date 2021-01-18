import React from 'react'

const PlaylistSelectComponent = ({ id, name, options }) => (
    <div>
        <select name={name} id={id}>
            <option selected value='0'>Choose...</option>
            {options.map((option, index) => <option value={option.value} key={index}>{option.label}</option>)}
        </select>
    </div>
)

export default PlaylistSelectComponent
