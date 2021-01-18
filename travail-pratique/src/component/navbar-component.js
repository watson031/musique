import React from 'react'

import PlaylistSelectComponent from 'component/playlist-select-component'
import SearchInputComponent from 'component/search-input-component'

const NavbarComponent = ({ id, playlists }) => (
    <nav id={id} className='navbar navbar-dark bg-dark'>

        <PlaylistSelectComponent
            id='select_playlist'
            name='select_playlist'
            options={playlists}
        />
        <SearchInputComponent
            text='Search'
        />
    </nav>
)

export default NavbarComponent
