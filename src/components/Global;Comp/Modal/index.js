import React, { Component } from 'react'
import './style.css'

class Modal extends Component {

    openModal = () => {
        document.querySelector(".top-modal").style.maxHeight = "800px"
        document.querySelector(".overlayTop").style.display = "block"
        setTimeout(function () {
            document.querySelector(".overlayTop").style.background = 'rgba(0, 0, 0, 0.1)'
            document.querySelector(".overlayTop").style['-webkit-backdrop-filter'] = 'blur(2px)'
            document.querySelector(".overlayTop").style.backdropFilter = 'blur(2px)'
        }, 100);
    }

    closeModal = () => {
        document.querySelector(".top-modal").style.maxHeight = "0"
        document.querySelector(".overlayTop").style.background = 'rgba(0, 0, 0, 0.0)'
        document.querySelector(".overlayTop").style['-webkit-backdrop-filter'] = 'blur(0px)'
        document.querySelector(".overlayTop").style.backdropFilter = 'blur(0px)'

        setTimeout(function () { document.querySelector(".overlayTop").style.display = "none" }, 100);
    }


    render() {
        return (
            <div>
                <div className='top-modal'><div>{this.props.children}</div></div>
                <div onClick={this.closeModal} className="overlayTop"></div>
            </div>
        )
    }




}

export default Modal
