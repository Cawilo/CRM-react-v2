import React, { Component } from 'react'
import './style.css'



class ModalConfirmation extends Component {

    openModal = () => {
        document.querySelector(".top-modal-confirmation").style.maxHeight = "800px"
        document.querySelector(".overlayTop-confirmation").style.display = "block"
        setTimeout(function () {
            document.querySelector(".overlayTop-confirmation").style.background = 'rgba(0, 0, 0, 0.1)'
            document.querySelector(".overlayTop-confirmation").style['-webkit-backdrop-filter'] = 'blur(2px)'
            document.querySelector(".overlayTop-confirmation").style.backdropFilter = 'blur(2px)'
        }, 100);
    }

    closeModal = () => {
        document.querySelector(".top-modal-confirmation").style.maxHeight = "0"
        document.querySelector(".overlayTop-confirmation").style.background = 'rgba(0, 0, 0, 0.0)'
        document.querySelector(".overlayTop-confirmation").style['-webkit-backdrop-filter'] = 'blur(0px)'
        document.querySelector(".overlayTop-confirmation").style.backdropFilter = 'blur(0px)'

        setTimeout(function () { document.querySelector(".overlayTop-confirmation").style.display = "none" }, 100);
    }


    render() {
        return (
            <div>
                <div className='top-modal-confirmation'>
                    <div>
                        <div>{this.props.text}</div>
                        <div><button onClick={this.closeModal}>No</button></div>
                        <div><button onClick={this.props.delete}>Si</button></div>
                    </div>
                </div>
                <div onClick={this.closeModal} className="overlayTop-confirmation"></div>
            </div>
        )
    }




}

export default ModalConfirmation
