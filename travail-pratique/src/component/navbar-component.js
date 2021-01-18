import React from 'react'

import PlaylistSelectComponent from 'component/playlist-select-component'
import SearchInputComponent from 'component/search-input-component'

const OPTIONS = [
    {
        label: 'POP',
        value: '1'
    },
    {
        label: 'Country',
        value: '2'
    },
    {
        label: 'Classique',
        value: '3'
    },
    {
        label: 'Rock',
        value: '4'
    }]
const NavbarComponent = ({ id }) => (

    <div id={id} className='navbar navbar-dark bg-dark'>
        <PlaylistSelectComponent
            id='select_playlist'
            name='select_playlist'
            options={OPTIONS}
        />
        <SearchInputComponent
            text='Search'
        />
    </div>
)

export default NavbarComponent
