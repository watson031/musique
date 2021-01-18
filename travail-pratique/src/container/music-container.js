
import React, { Component } from 'react'

// import InputComponent from 'component/input-component'
// import TextComponent from 'component/text-component'

class MusicContainer extends Component {
    constructor (props) {
        super(props)

        this.state = {
            userNameIsEditing: false,
            userNameValue: 'mvachon',

            emailIsEditing: false,
            emailValue: 'mvachon@server.com',

            messageIsEditing: false,
            messageValue: 'message de test'
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render () {
        return (
            <div>

                <InputComponent
                    text="Nom d'usager:"
                    type='text'
                    id='userName_id'
                    name='userName'
                    value={this.state.userNameValue}
                    isEditing={this.state.userNameIsEditing}
                    onCklick={this.handleClick('userNameIsEditing')}
                    onChange={this.handleChange('userNameValue')}
                />
                <InputComponent
                    text='Email:'
                    type='email'
                    id='email_id'
                    name='email'
                    value={this.state.emailValue}
                    isEditing={this.state.emailIsEditing}
                    onCklick={this.handleClick('emailIsEditing')}
                    onChange={this.handleChange('emailValue')}
                />
                <TextComponent
                    text='Message:'
                    id='email_id'
                    name='email'
                    value={this.state.messageValue}
                    isEditing={this.state.messageIsEditing}
                    onCklick={this.handleClick('messageIsEditing')}
                    onChange={this.handleChange('messageValue')}
                />
                <div>
                    <input type='submit' value='Submit' />
                </div>

            </div>
        )
    }
}

export default MusicContainer
