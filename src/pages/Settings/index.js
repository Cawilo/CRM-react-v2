import React, { Component } from 'react';
import './style.css';


class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            night: this.props.nightmode
        }
    }

    toggleMode = () => {
        console.log(this.props.nightmode)
        if (this.state.night === 'true') {
            console.log('f')
            document.cookie = 'nightmode=; Max-Age=0';
            document.cookie = 'nightmode=; Max-Age=0';
            let date = new Date();
            date.setTime(date.getTime() + (149 * 24 * 60 * 60 * 1000));
            let expiry = '; expires=' + date.toUTCString();
            document.cookie = `nightmode=false${expiry}; path=/`
            this.setState({ night: 'false' })
            this.updateGraphicsOff()

        } else {
            console.log('u')
            document.cookie = 'nightmode=; Max-Age=0';
            let date = new Date();
            date.setTime(date.getTime() + (149 * 24 * 60 * 60 * 1000));
            let expiry = '; expires=' + date.toUTCString();
            document.cookie = `nightmode=true${expiry}; path=/`
            this.setState({ night: 'true' })
            this.updateGraphicsOn()
        }
    }

    // updateGraphicsOff = () => {
    //     // normal
    //     document.body.style.backgroundColor = '#e3e3e3'
    //     document.body.style.color = 'black'
    // }
    // updateGraphicsOn = () => {
    //     // night
    //     document.body.style.backgroundColor = '#262626'
        
    // }

    render() {
        return (
            <div className='ajustes-container'>
                <div className='ajustes-nightmode'>
                    <div>Night mode</div>
                    <button onClick={this.toggleMode}>{this.state.night === 'false' ? 'Go normal' : 'Go night'}</button>
                </div>
            </div>
        )
    }
}

export default Settings