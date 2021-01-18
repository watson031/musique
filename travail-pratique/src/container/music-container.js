
import React, { Component } from 'react'

import NavbarComponent from 'component/navbar-component'
// import SearchInputComponent from 'component/search-input-component'

class MusicContainer extends Component {
    constructor (props) {
        super(props)

        this.state = {

        }
    }

    render () {
        const PLAYLISTS = [
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
        return (
            <div>
                <NavbarComponent
                    id='navbar_component'
                    playlists={PLAYLISTS}
                />
            </div>
        )
    }
}

export default MusicContainer
