import React from 'react'

const SearchInputComponent = ({ text, onClick, onChange }) => (

    <div>
        <input type='search' placeholder='Search' onChange={onChange} />
        <button className='btn btn-outline-success my-2 my-sm-0' onClick={onClick} type='submit'>{text}</button>
    </div>

)

export default SearchInputComponent
