
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
        return (
            <div>
                <NavbarComponent
                    id='navbar_component'
                />
            </div>
        )
    }
}

export default MusicContainer
