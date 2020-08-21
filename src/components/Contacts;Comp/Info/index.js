import React, { Component } from 'react';
import './style.css'




class CONTACTS_INFO extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contacts: this.props.contacts,


            contactOpen: '',
            swipeDownPC: '',

            swipeDownMOBILE: '',
            swipeYmobile: ''

        }
    }

    // mobile swipe/////////////////////////////
    swipeDownMOBILE = event => {

        if (this.props.disable) return
        this.setState({ swipeDownMOBILE: event.touches[0].clientX })
        this.setState({ swipeYmobile: event.touches[0].clientY })
    }
    swipeUpMOBILE = event => {
     
        if (this.props.disable) return
        event.preventDefault();
        // console.log(event.touchmoved)
        if (this.state.contactOpen === event.currentTarget.id) {
            document.getElementById(this.state.contactOpen).style.marginRight = '0px'
            document.getElementById(this.state.contactOpen).style.marginLeft = '0px'
            document.getElementById(this.state.callOpen).style.width = '0'
            this.setState({ contactOpen: '' })
            return
        }
        console.log('passing moblie')
        let valueX = event.changedTouches[0].pageX - this.state.swipeDownMOBILE
        let valueY = event.changedTouches[0].clientY - this.state.swipeYmobile
        console.log(Math.abs(Math.round(valueY)))
        if (Math.abs(Math.round(valueX)) <= 10) {
            // console.log(event.changedTouches[0].pageY)
            // console.log(this.state.swipeYmobile)

            if (Math.abs(Math.round(valueY)) > 10) return
            return this.props.history.push(`/contactos/detalles/${document.getElementById(event.currentTarget.id).getAttribute('contact')}`)
        }
        this.checkSwipe(event, event.changedTouches[0].pageX, 'mobile')
    }

    // pc swipe///////////////////////
    swipeDownPC = event => {
        if (this.props.disable) return
        // console.log(event.clientX)

        this.setState({ swipeDownPC: event.clientX })

    }
    swipeUpPC = event => {
        if (this.props.disable) return
        event.preventDefault();
        // console.log(event.clientX)
        if (this.state.contactOpen === event.currentTarget.id) {
            document.getElementById(this.state.contactOpen).style.marginRight = '0px'
            document.getElementById(this.state.contactOpen).style.marginLeft = '0px'
            document.getElementById(this.state.callOpen).style.width = '0'
            this.setState({ contactOpen: '' })
            return
        }
        //console.log('passing pc')
        if (event.clientX === this.state.swipeDownPC) {
            return this.props.history.push(`/contactos/detalles/${document.getElementById(event.currentTarget.id).getAttribute('contact')}`)
        }
        this.checkSwipe(event, event.clientX, 'pc')
    }


    //check swipe////////////////////////////
    checkSwipe = (event, swipeUp, type) => {
        // console.log(event.currentTarget.attributes.call.value)
        let value;
        if (type === 'pc') value = this.state.swipeDownPC
        if (type === 'mobile') value = this.state.swipeDownMOBILE
        if (value > swipeUp + 80) {
            if (this.state.contactOpen) {
                document.getElementById(this.state.contactOpen).style.marginRight = '0px'
                document.getElementById(this.state.contactOpen).style.marginLeft = '0px'
                document.getElementById(this.state.callOpen).style.width = '0'
            }
            this.setState({ contactOpen: event.currentTarget.id, callOpen: event.currentTarget.attributes.call.value })
            //document.getElementById(event.currentTarget.id).style.marginRight = '5em'
            document.getElementById(event.currentTarget.id).style.marginLeft = '-5em'
            document.getElementById(event.currentTarget.attributes.call.value).style.width = '5em'

        }

    }

   

    render() {
        return (
            <div className='contacts'>
                {this.props.contacts.map((contact, index) => (
                    <div className='contacts-contact' key={index}>
                        <div className='contact-info' style={index % 2 === 0 ? {background: 'rgb(68, 68, 68)'}:null} contact={contact.id} id={`contact${index}`} call={`call${index}`} onMouseDown={this.swipeDownPC} onMouseUp={this.swipeUpPC} onTouchStart={this.swipeDownMOBILE} onTouchEnd={this.swipeUpMOBILE}>
                            <div>{contact.nombre} {contact.apellido}</div>
                            <div>{contact.id_vendedor}</div>
                            <div>{contact.telefono}</div>
                            <div>{contact.status}</div>
                        </div>
                        <div id={`call${index}`} cont={`contact${index}`} onClick={()=>window.open(`tel:${contact.telefono}`, '_self')}><i className="fas fa-phone fa-3x"></i></div>
                    </div>
                ))}
            </div>
        )
    }
}

export default CONTACTS_INFO