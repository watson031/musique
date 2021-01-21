
import React, { Component } from 'react'

import PlaylistSelectComponent from 'component/playlist-select-component'
import SearchInputComponent from 'component/search-input-component'
import NavbarComponent from 'component/navbar-component'
import Playlist from 'container/playlist-container'
import MusicData from 'service/music-data'
import SearchResultComponent from 'component/search-result-component'
import DetailResultVideoComponent from 'component/detail-result-video-component'
import '../css/music.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
// import { css } from '@emotion/react'

class MusicContainer extends Component {
    constructor (props) {
        super(props)

        this.musicData = new MusicData('NCAjILTYVqQjshVLBSOeCgquZVeQCzmPLEoZNKkU')

        this.state = {
            playlists: [],
            tracks: [],
            searchInput: '',
            albumsResults: [],
            tracksPerAlbum: [],
            isAlbumDIsplay: false,
            isDisplaySongsShowing: false,
            isYoutubeShowing: true,
            idAlbumClicked: '',
            artistName: '',
            isClassToggled: false,
            currentIdPlaylist: 1,
            isLoading: false
        }
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this)
        this.handleOnClickSearch = this.handleOnClickSearch.bind(this)
        this.handleOnClickDetail = this.handleOnClickDetail.bind(this)
        this.handleClickToggle = this.handleClickToggle.bind(this)
        this.handleSelectPlaylist = this.handleSelectPlaylist.bind(this)
    }

    handleOnClickSearch (e) {
        const searchInput = this.state.searchInput

        const params = {
            query: searchInput,
            perPage: 75
        }
        this.setState({ isLoading: true }, () => {
            this.musicData.search(params, (albums) => {
                this.setState({
                    albumsResults: albums.results,
                    isAlbumDIsplay: true,
                    isLoading: false

                })
            })
        })

        // this.setState({ isAlbumDIsplay: true })
    }

    handleOnClickDetail (e) {
        const url = ' https://api.discogs.com/masters/' + e.target.id
        console.log(url)
        fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({ tracksPerAlbum: response.videos, artistName: response.artists[0].name })
            })

        this.setState({ isDisplaySongsShowing: true, isAlbumDIsplay: false, isYoutubeShowing: false, idAlbumClicked: e.target.parentNode.id })
    }

    handleOnChangeInput (e) {
        this.setState({ searchInput: e.target.value })
    }

    handleClickToggle (e) {
        console.log(this.state.isClassToggled)
        if (this.state.isClassToggled === false) {
            e.target.className = 'fa fa-check'
        } else {
            e.target.className = 'fa fa-plus'
        }
        this.setState({ isClassToggled: !this.state.isClassToggled })

        const params = {
            idPlaylist: this.state.currentIdPlaylist,
            title: this.state.tracksPerAlbum[e.target.id].title,
            uri: this.state.tracksPerAlbum[e.target.id].uri,
            masterId: this.state.albumsResults[this.state.idAlbumClicked].master_id
        }
        console.log('id du playlist :' + this.state.currentIdPlaylist)
        console.log('title du track :' + params.title)

        fetch('http://localhost:8080/playlist', {
            // mode: 'no-cors',
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(params)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
    }

    componentDidMount () {
        fetch('http://localhost:8080/playlist', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                // console.log(response)
                this.setState({ playlists: response })
            })
    }

    handleSelectPlaylist (e) {
        const idPlaylist = parseInt(e.target.value)

        fetch('http://localhost:8080/playlist/' + idPlaylist, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ tracks: response, currentIdPlaylist: idPlaylist })
            })
        // console.log(this.state.currentIdPlaylist)
    }

    render () {
        return (
            <div>
                {this.renderNav()}

                {this.state.isAlbumDIsplay ? this.renderAlbumPlaylist() : (this.state.isYoutubeShowing ? this.renderYoutube() : this.renderDetailResultVideoComponent())}
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
                    onClick={this.handleSelectPlaylist}
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
        // console.log(this.state.albumsResults[this.state.idAlbumClicked].cover_image)
        console.log(this.state.idAlbumClicked)
        return (
            <div>

                <DetailResultVideoComponent
                    tracks={this.state.tracksPerAlbum}
                    img={this.state.albumsResults[this.state.idAlbumClicked].cover_image}
                    artistName={this.state.artistName}
                    style={this.state.albumsResults[this.state.idAlbumClicked].style}
                    year={this.state.albumsResults[this.state.idAlbumClicked].year}
                    onClickToggle={this.handleClickToggle}

                />
            </div>
        )
    }

    renderAlbumPlaylist () {
        return (
            <div>

                {this.state.isLoading ? <Loader type='ThreeDots' color='white' height={80} width={80} /> : <SearchResultComponent albums={this.state.albumsResults} onClickDetail={this.handleOnClickDetail} />}

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
