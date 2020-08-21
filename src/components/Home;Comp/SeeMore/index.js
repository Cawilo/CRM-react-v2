import React, { Component } from 'react';
import './style.css';

class SeeMore extends Component {

    goPage = () => {
        this.props.history.push(`/${this.props.page}/${this.props.value}`)
    }

    render() {
        return (
            <div onClick={this.goPage} className='seemore-block'>Ver mas informacion <i className="fas fa-angle-down"></i></div>
        )
    }
}

export default SeeMore