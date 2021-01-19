
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

        this.musicData = new MusicData('NCAjILTYVqQjshVLBSOeCgquZVeQCzmPLEoZNKkU')

        this.state = {
            playlists: [],
            tracks: [],
            searchInput: '',
            albumsResults: [],
            isAlbumDIsplay: false
        }
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this)
        this.handleOnClickSearch = this.handleOnClickSearch.bind(this)
    }

    handleOnClickSearch (e) {
        const searchInput = this.state.searchInput
        console.log(searchInput)
        const params = {
            query: searchInput,
            perPage: 75
        }

        const thisClass = this
        this.musicData.search(params, function (albums) {
            console.log(albums.results)
            thisClass.setState({
                albumsResults: albums.results,
                isAlbumDIsplay: true
            })
        })

        this.setState({ isAlbumDIsplay: true })
    }

    handleOnChangeInput (e) {
        this.setState({ searchInput: e.target.value })
    }

    componentDidMount () {
        fetch('http://localhost:8080/playlist', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                // console.log(response)
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
                {this.state.isAlbumDIsplay ? this.renderAlbumPlaylist() : this.renderYoutube()}
            </div>

        )
    }

    renderAlbumPlaylist () {
        return (
            <div>
                <SearchResultComponent
                    albums={this.state.albumsResults}
                />
            </div>
        )
    }

    renderYoutube () {
        return (
            <div>
                <Playlist
                    tracks={this.state.tracks}
                />
            </div>
        )
    }
}

export default MusicContainer
