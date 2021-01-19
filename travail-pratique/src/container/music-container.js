
import React, { Component } from 'react'

import NavbarComponent from 'component/navbar-component'
// import SearchInputComponent from 'component/search-input-component'
import Playlist from 'container/playlist-container'

class MusicContainer extends Component {
    constructor (props) {
        super(props)

        this.state = {
            playlists: [],
            tracks: []
        }
    }

    componentDidMount () {
        fetch('http://localhost:8080/playlist', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({ playlists: response })
            })
    }

    render () {
        return (
            <div>
                <NavbarComponent
                    id='navbar_component'
                    playlists={this.state.playlists}
                />

                <Playlist
                    tracks={this.state.tracks}
                />
            </div>

        )
    }
}

export default MusicContainer
