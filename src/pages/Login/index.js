import React, { Component } from 'react';
import Logo from "../../images/logo_system4book.png"
import './style.css';

import LOGIN_LOG from '../../components/Login;Comp/Log';
import LOGIN_FORGOT from '../../components/Login;Comp/Forgot';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderLog: true
        }
    }

    render() {
        return (
            <div className='login-container'>
                <div id='logos-container'>
                    <img alt="logo" src={Logo} />
                    <div><strong>System4Book</strong> App</div>
                </div>
                {this.state.renderLog ? (
                    <LOGIN_LOG
                        forgot={() => this.setState({ renderLog: false })}
                        history={this.props.history}
                    />
                ) :
                    <LOGIN_FORGOT
                        log={() => this.setState({ renderLog: true })}
                    />
                }
                <div id='copyright'>Tecnodata Corp. © 2020.</div>
            </div>
        )
    }
}

export default Login