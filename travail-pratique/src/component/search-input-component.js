import React from 'react'

const SearchInputComponent = ({ text }) => (

    <div>
        <input class='form-control mr-sm-2' type='search' placeholder='Search' />
        <button class='btn btn-outline-success my-2 my-sm-0' type='submit'>{text}</button>
    </div>

)

export default SearchInputComponent
