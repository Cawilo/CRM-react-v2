import React, { Component } from 'react'
import './style.css'

class ModalImage extends Component {

    openModal = () => {
        document.querySelector(".top-modal-projects-img").style.maxHeight = "800px"
        document.querySelector(".overlayTop-projects-img").style.display = "block"
        setTimeout(function () {
            document.querySelector(".overlayTop-projects-img").style.background = 'rgba(0, 0, 0, 0.1)'
            document.querySelector(".overlayTop-projects-img").style['-webkit-backdrop-filter'] = 'blur(2px)'
            document.querySelector(".overlayTop-projects-img").style.backdropFilter = 'blur(2px)'
        }, 100);
    }

    closeModal = () => {
        document.querySelector(".top-modal-projects-img").style.maxHeight = "0"
        document.querySelector(".overlayTop-projects-img").style.background = 'rgba(0, 0, 0, 0.0)'
        document.querySelector(".overlayTop-projects-img").style['-webkit-backdrop-filter'] = 'blur(0px)'
        document.querySelector(".overlayTop-projects-img").style.backdropFilter = 'blur(0px)'
        setTimeout(function () { 
            document.querySelector(".overlayTop-projects-img").style.display = "none" 
        }, 100);
        this.props.closeModalImg()
    }


    render() {
        return (
            <div>
                <div className='top-modal-projects-img'><div>{this.props.children}</div></div>
                <div onClick={this.closeModal} className="overlayTop-projects-img"></div>
            </div>
        )
    }




}

export default ModalImage
