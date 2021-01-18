
import React, { Component } from 'react'

import SearchInputComponent from 'component/search-input-component'

class MusicContainer extends Component {
    constructor (props) {
        super(props)

        this.state = {

        }
    }

    render () {
        return (

            <SearchInputComponent
                text='Search'
            />

        )
    }
}

export default MusicContainer
