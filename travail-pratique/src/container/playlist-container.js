import React, { Component } from 'react'
import YouTube from 'react-youtube'

class Playlist extends Component {
    constructor (props) {
        super(props)

        this.state = {
            index: 0,
            options: {
                height: '390',
                width: '730',
                playerVars: { // https://developers.google.com/youtube/player_parameters
                    autoplay: 0
                }
            }
        }

        this.handleOnEndHandler = this.handleOnEndHandler.bind(this)
        this.handleNextOnClickHandler = this.handleNextOnClickHandler.bind(this)
        this.handlePreviousOnClickHandler = this.handlePreviousOnClickHandler.bind(this)
    }

    handleOnEndHandler () {
        if (this.state.index < this.props.tracks.length - 1) {
            this.setState({
                index: this.state.index + 1,
                options: {
                    ...this.state.options,
                    playerVars: {
                        autoplay: 1
                    }
                }
            })
        }
    }

    handleNextOnClickHandler () {
        if (this.state.index < this.props.tracks.length - 1) {
            this.setState({
                index: this.state.index + 1
            })
        }
    }

    handlePreviousOnClickHandler () {
        if (this.state.index > 0) {
            this.setState({
                index: this.state.index - 1
            })
        }
    }

    getVideoId () {
        let videoId = ''
        if (this.props.tracks.length > 0) {
            const uri = this.props.tracks[this.state.index].uri
            videoId = uri.substring(uri.indexOf('=') + 1)
        }
        return videoId
    }

    handleOnClickHandler (index) {
        this.setState({
            index: index
        })
    }

    render () {
        return (
            <div className='playlist'>
                <div className='row'>
                    <div className='col'>
                        <div className='card'>
                            <YouTube
                                videoId={this.getVideoId()}
                                opts={this.state.options}
                                onEnd={this.handleOnEndHandler}
                            />
                            <div className='card-body'>
                                <h5 className='card-title'>{this.props.tracks[this.state.index] && this.props.tracks[this.state.index].title}</h5>
                                <div>
                                    <button onClick={this.handlePreviousOnClickHandler}><i className='fa fa-step-backward' /></button>
                                    <button onClick={this.handleNextOnClickHandler}><i className='fa fa-step-forward' /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <ul className='list-group'>
                            {this.props.tracks.map((track, index) => <li key={index} onClick={() => this.handleOnClickHandler(index)} className={index === this.state.index ? 'list-group-item list-group-item-dark' : 'list-group-item'}>{track.title}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default Playlist
