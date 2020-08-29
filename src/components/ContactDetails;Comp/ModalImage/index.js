import React, { Component } from 'react'
import './style.css'

class ModalImage extends Component {

    openModal = () => {
        document.querySelector(".top-modal-contactdetails-img").style.maxHeight = "800px"
        document.querySelector(".overlayTop-contactdetails-img").style.display = "block"
        setTimeout(function () {
            document.querySelector(".overlayTop-contactdetails-img").style.background = 'rgba(0, 0, 0, 0.1)'
            document.querySelector(".overlayTop-contactdetails-img").style['-webkit-backdrop-filter'] = 'blur(2px)'
            document.querySelector(".overlayTop-contactdetails-img").style.backdropFilter = 'blur(2px)'
        }, 100);
    }

    closeModal = () => {
        document.querySelector(".top-modal-contactdetails-img").style.maxHeight = "0"
        document.querySelector(".overlayTop-contactdetails-img").style.background = 'rgba(0, 0, 0, 0.0)'
        document.querySelector(".overlayTop-contactdetails-img").style['-webkit-backdrop-filter'] = 'blur(0px)'
        document.querySelector(".overlayTop-contactdetails-img").style.backdropFilter = 'blur(0px)'
        setTimeout(function () { 
            document.querySelector(".overlayTop-contactdetails-img").style.display = "none" 
        }, 100);
        this.props.closeModalImg()
    }


    render() {
        return (
            <div>
                <div className='top-modal-contactdetails-img'><div>{this.props.children}</div></div>
                <div onClick={this.closeModal} className="overlayTop-contactdetails-img"></div>
            </div>
        )
    }




}

export default ModalImage
