import React, { Component } from 'react'
import './style.css'

class ModalSms extends Component {

    openModal = () => {
        document.querySelector(".top-modal-contactdetails-sms").style.maxHeight = "800px"
        document.querySelector(".overlayTop-contactdetails-sms").style.display = "block"
        setTimeout(function () {
            document.querySelector(".overlayTop-contactdetails-sms").style.background = 'rgba(0, 0, 0, 0.1)'
            document.querySelector(".overlayTop-contactdetails-sms").style['-webkit-backdrop-filter'] = 'blur(2px)'
            document.querySelector(".overlayTop-contactdetails-sms").style.backdropFilter = 'blur(2px)'
        }, 100);
    }

    closeModal = () => {
        document.querySelector(".top-modal-contactdetails-sms").style.maxHeight = "0"
        document.querySelector(".overlayTop-contactdetails-sms").style.background = 'rgba(0, 0, 0, 0.0)'
        document.querySelector(".overlayTop-contactdetails-sms").style['-webkit-backdrop-filter'] = 'blur(0px)'
        document.querySelector(".overlayTop-contactdetails-sms").style.backdropFilter = 'blur(0px)'

        setTimeout(function () { document.querySelector(".overlayTop-contactdetails-sms").style.display = "none" }, 100);
    }


    render() {
        return (
            <div>
                <div className='top-modal-contactdetails-sms'><div>{this.props.children}</div></div>
                <div onClick={this.closeModal} className="overlayTop-contactdetails-sms"></div>
            </div>
        )
    }




}

export default ModalSms
