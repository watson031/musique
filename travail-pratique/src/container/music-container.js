
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

function buildHeader (method, body) {
    return {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}
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
            currentIdPlaylist: 1,
            isLoading: false

        }
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this)
        this.handleOnClickSearch = this.handleOnClickSearch.bind(this)
        this.handleOnClickDetail = this.handleOnClickDetail.bind(this)
        this.handleClickToggle = this.handleClickToggle.bind(this)
        this.handleSelectPlaylist = this.handleSelectPlaylist.bind(this)
        this.handleOnClickMusic = this.handleOnClickMusic.bind(this)
    }

    /**
     * Gestions d'évenenemet pour le bouton search dans le navbar
     */
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
    }

    /**
     * Gestions d'évenenemet pour le bouton detail quand on veut voir les tracks dans les resultats de discogs
     */
    handleOnClickDetail (e) {
        const url = ' https://api.discogs.com/masters/' + e.target.id

        // Afficher la liste de l'album envoyé par discogs en mettant check sur ce que existe dans la bd
        fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                const responseVideo = response.videos.map(element => {
                    const uriBdTracks = this.state.tracks.map(uriBd => uriBd.uri)
                    uriBdTracks.forEach(uri => {
                        if (uri === element.uri) {
                            element.isChecked = true
                        }
                    })
                    return element
                })
                this.setState({ tracksPerAlbum: responseVideo, artistName: response.artists[0].name })
            })

        this.setState({ isDisplaySongsShowing: true, isAlbumDIsplay: false, isYoutubeShowing: false, idAlbumClicked: e.target.parentNode.id })
    }

    /**
     * Gestions d'évenenemet pour quand on écrit dans l'input dans le search bar,
     * on set le state avec la valeur
     */
    handleOnChangeInput (e) {
        this.setState({ searchInput: e.target.value })
    }

    /** Ajout ou delete d'un track dans la playlist  */
    handleClickToggle (e) {
        const params = {
            idPlaylist: this.state.currentIdPlaylist,
            title: this.state.tracksPerAlbum[e.target.id].title,
            uri: this.state.tracksPerAlbum[e.target.id].uri,
            masterId: this.state.albumsResults[this.state.idAlbumClicked].master_id
        }

        const uriTrackSelected = this.state.tracksPerAlbum[e.target.id].uri
        const trackFound = this.state.tracks.filter(existingTrack => existingTrack.uri === uriTrackSelected)

        const toggleTracks = this.state.tracksPerAlbum.map((track, index) => {
            if (index === parseInt(e.target.id)) {
                if (track.isChecked) {
                    fetch('http://localhost:8080/playlist', buildHeader('DELETE', params))
                        .then(response => response.json())
                        .then(response => {
                            console.log(response)
                        })
                } else {
                    if (trackFound.length === 0) {
                        fetch('http://localhost:8080/playlist', buildHeader('POST', params))
                            .then(response => response.json())
                            .then(response => {
                                console.log(response)
                            })
                    }
                }

                track.isChecked = !track.isChecked
            }
            return track
        })
        this.setState({ tracksPerAlbum: toggleTracks })
        this.getTracks(this.state.currentIdPlaylist)
    }

    componentDidMount () {
        fetch('http://localhost:8080/playlist', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ playlists: response })
            })
        this.getTracks(this.state.currentIdPlaylist)
    }

    /**
     *Event pour recuperer la catégorie selectionné et recupère la playlist associée
     */
    handleSelectPlaylist (e) {
        const idPlaylist = parseInt(e.target.value)
        this.getTracks(idPlaylist)
    }

    /*
     *Fonction qui permet de recupérer les playlist
     */
    getTracks (idPlaylist) {
        fetch('http://localhost:8080/playlist/' + idPlaylist, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ tracks: response, currentIdPlaylist: idPlaylist })
            })
    }

    /*
     *Event pour retourner en sur la page d'accueil
     */
    handleOnClickMusic () {
        this.setState({
            isAlbumDIsplay: false,
            isYoutubeShowing: true
        })
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
                    onClickSelect={this.handleSelectPlaylist}
                    onClickMusic={this.handleOnClickMusic}

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
