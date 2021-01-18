import React from 'react'

const SearchInputComponent = ({ text }) => (

    <div>
        <input type='search' placeholder='Search' />
        <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>{text}</button>
    </div>

)

export default SearchInputComponent
