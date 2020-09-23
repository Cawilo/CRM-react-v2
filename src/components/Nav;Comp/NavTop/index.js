import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './style.css'



class NavTop extends Component {
  

    render() {
        return (
            <div className='navTop'>
                <div>
                    {this.props.title !== '' ? (
                    <div id='navTop-back'><button onClick={() => window.history.back()}><i className="fas fa-arrow-left fa-2x"></i></button></div>
                    ):null}
                    <div id='navTop-title'><div>{this.props.title}</div></div>
                    <div id='navTop-menu'><button onClick={this.props.openSide}><i className="fas fa-bars fa-2x"></i></button></div>
                </div>
            </div>
        )
    }
}

export default withRouter(NavTop)
