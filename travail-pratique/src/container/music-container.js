
import React, { Component } from 'react'

import PlaylistSelectComponent from 'component/playlist-select-component'
import SearchInputComponent from 'component/search-input-component'
import NavbarComponent from 'component/navbar-component'
import Playlist from 'container/playlist-container'
import MusicData from 'service/music-data'
import SearchResultComponent from 'component/search-result-component'
import DetailResultVideoComponent from 'component/detail-result-video-component'

class MusicContainer extends Component {
    constructor (props) {
        super(props)

        this.musicData = new MusicData('NCAjILTYVqQjshVLBSOeCgquZVeQCzmPLEoZNKkU')

        this.state = {
            playlists: [],
            tracks: [],
            searchInput: '',
            albumsResults: [],
            songsPerAlbum: [],
            isAlbumDIsplay: false,
            isDisplaySongsShowing: false,
            isYoutubeShowing: true,
            imageClicked: ''
        }
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this)
        this.handleOnClickSearch = this.handleOnClickSearch.bind(this)
        this.handleOnClickDetail = this.handleOnClickDetail.bind(this)
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
            console.log(e.target)
            thisClass.setState({
                albumsResults: albums.results,
                isAlbumDIsplay: true

            })

            // console.log(this.state.albumsResults)
        })

        this.setState({ isAlbumDIsplay: true })
    }

    handleOnClickDetail (e) {
        const url = ' https://api.discogs.com/masters/' + e.target.id
        console.log(url)
        fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({ songsPerAlbum: response.videos })
            })

        this.setState({ isDisplaySongsShowing: true, isAlbumDIsplay: false, isYoutubeShowing: false, imageClicked: e.target.parentNode.id })
        // console.log(e.target)
        // const index = e.target.parentNode.id
        // console.log(index)
        // console.log(this.state.albumsResults[index].cover_image)
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
                {this.renderNav()}

                {this.state.isAlbumDIsplay ? this.renderAlbumPlaylist() : ''}
                {this.state.isAlbumDIsplay === false && this.state.isYoutubeShowing === false ? this.renderDetailResultVideoComponent() : this.renderYoutube()}
            </div>
        )
    }

    renderNav () {
        return (
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
        )
    }

    renderDetailResultVideoComponent () {
        return (
            <div>
                <DetailResultVideoComponent
                    songs={this.state.songsPerAlbum}
                    img={this.state.albumsResults[this.state.imageClicked].cover_image}
                />
            </div>
        )
    }

    renderAlbumPlaylist () {
        return (
            <div>
                <SearchResultComponent
                    albums={this.state.albumsResults}
                    onClickDetail={this.handleOnClickDetail}

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
