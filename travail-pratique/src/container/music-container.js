
import React, { Component } from 'react'

import PlaylistSelectComponent from 'component/playlist-select-component'
import SearchInputComponent from 'component/search-input-component'
import NavbarComponent from 'component/navbar-component'
import Playlist from 'container/playlist-container'
import MusicData from 'service/music-data'
import SearchResultComponent from 'component/search-result-component'

class MusicContainer extends Component {
    constructor (props) {
        super(props)

        this.musicData = new MusicData('xkrKTnhdTyeLXYIARAilosKOMBqzNXgqUGzZFXSN')

        this.state = {
            playlists: [],
            tracks: [],
            searchInput: ''
        }
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this)
        this.handleOnClickSearch = this.handleOnClickSearch.bind(this)
    }

    handleOnClickSearch (e) {
        console.log("Allo le monde, j'aime JavaScript")
        console.log(this.state.searchInput)
    }

    handleOnChangeInput (e) {
        this.setState({ searchInput: e.target })
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
                <NavbarComponent id='navbar_component'>
                    <PlaylistSelectComponent
                        id='select_playlist'
                        name='select_playlist'
                        playlists={this.state.playlists}
                    />
                    <SearchInputComponent
                        text='Search'
                        onClick={this.handleOnClickSearch}
                        onChange={this.handleOnChangeInput}
                    />
                </NavbarComponent>
                <Playlist
                    tracks={this.state.tracks}
                />

            </div>

        )
    }
}

export default MusicContainer
