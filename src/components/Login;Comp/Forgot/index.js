import React, { Component } from 'react';
import './style.css'

class LOGIN_FORGOT extends Component {

    login = (event) => {
        event.preventDefault();

    }

    render() {
        return (
            <form onSubmit={this.login}>
                <div>
                    <input
                        placeholder='Email'
                    />
                </div>
                <div>
                    <button type='submit'>Enviar</button>
                    <div>
                        <button type='button' onClick={this.props.log}>ya tienes una cuenta ?</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default LOGIN_FORGOT