import React, { Component } from 'react';
import './style.css';

class APPOINTMENTS_INFO extends Component {

    constructor(props) {
        super(props)
        this.state = {
            appointmentOpen: '',
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
        if (this.state.appointmentOpen === event.currentTarget.id) {
            document.getElementById(this.state.appointmentOpen).style.marginRight = '0px'
            document.getElementById(this.state.appointmentOpen).style.marginLeft = '0px'
            document.getElementById(this.state.callOpen).style.width = '0'
            this.setState({ appointmentOpen: '' })
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
            return this.props.openAppointment(event.currentTarget.attributes.idappo.value, event.currentTarget.attributes.nameappo.value, event.currentTarget.attributes.phoneappo.value, event.currentTarget.attributes.ubicationappo.value)
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
        if (this.state.appointmentOpen === event.currentTarget.id) {
            document.getElementById(this.state.appointmentOpen).style.marginRight = '0px'
            document.getElementById(this.state.appointmentOpen).style.marginLeft = '0px'
            document.getElementById(this.state.callOpen).style.width = '0'
            this.setState({ appointmentOpen: '' })
            return
        }
        //console.log('passing pc')
        if (event.clientX === this.state.swipeDownPC) {
            return this.props.openAppointment(event.currentTarget.attributes.idappo.value, event.currentTarget.attributes.nameappo.value, event.currentTarget.attributes.phoneappo.value, event.currentTarget.attributes.ubicationappo.value)
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
            if (this.state.appointmentOpen) {
                document.getElementById(this.state.appointmentOpen).style.marginRight = '0px'
                document.getElementById(this.state.appointmentOpen).style.marginLeft = '0px'
                document.getElementById(this.state.callOpen).style.width = '0'
            }
            this.setState({ appointmentOpen: event.currentTarget.id, callOpen: event.currentTarget.attributes.call.value })
            //document.getElementById(event.currentTarget.id).style.marginRight = '5em'
            document.getElementById(event.currentTarget.id).style.marginLeft = '-5em'
            document.getElementById(event.currentTarget.attributes.call.value).style.width = '5em'

        }

    }

    render() {
        return (
            <div>
                {this.props.appoToday.length ? (
                <div className='appointments-block'>
                    <div>HOY</div>
                    <div>
                        {this.props.appoToday.map((appo, index) => (
                            <div key={index} className='appointments' id={appo.id_cita}>
                                <div className='appointments-appo' style={index % 2 === 0 ? { background: 'rgb(68, 68, 68)' } : { background: 'rgb(29, 29, 29)' }} appointment={appo.id_cita} id={`appointment${index}`} call={`call${index}`} idappo={appo.id_cita} nameappo={`${appo.nombre} ${appo.apellido}`} phoneappo={appo.telefono} ubicationappo={appo.direccion} onMouseDown={this.swipeDownPC} onMouseUp={this.swipeUpPC} onTouchStart={this.swipeDownMOBILE} onTouchEnd={this.swipeUpMOBILE}>
                                    <div>{appo.nombre} {appo.apellido}</div>
                                    <div>{appo.hora_agenda}</div>
                                    <div>{appo.fecha_agenda_format}</div>
                                    <div>{appo.observaciones || <br />}</div>
                                    <div>{appo.telefono}</div>
                                    <div>{appo.id_vendedor_n}</div>
                                </div>
                                <div id={`call${index}`} cont={`appointment${index}`} onClick={() => window.open(`tel:${appo.telefono}`, '_self')}><i className="fas fa-phone fa-3x"></i></div>
                            </div>
                        ))}
                    </div>
                </div>
                ):null}
                {this.props.appoTomorrow.length ? (
                <div className='appointments-block'>
                    <div>MAÑANA</div>
                    <div>
                        {this.props.appoTomorrow.map((appo, index) => (
                            <div key={index} className='appointments' id={appo.id_cita}>
                                <div className='appointments-appo' style={index % 2 === 0 ? { background: 'rgb(68, 68, 68)' } : { background: 'rgb(29, 29, 29)' }} appointment={appo.id_cita} id={`appointment${index + this.props.appoToday.length}`} call={`call${index + this.props.appoToday.length}`} idappo={appo.id_cita} nameappo={`${appo.nombre} ${appo.apellido}`} phoneappo={appo.telefono} ubicationappo={appo.direccion} onMouseDown={this.swipeDownPC} onMouseUp={this.swipeUpPC} onTouchStart={this.swipeDownMOBILE} onTouchEnd={this.swipeUpMOBILE}>
                                    <div>{appo.nombre} {appo.apellido}</div>
                                    <div>{appo.hora_agenda}</div>
                                    <div>{appo.fecha_agenda_format}</div>
                                    <div>{appo.observaciones || <br />}</div>
                                    <div>{appo.telefono}</div>
                                    <div>{appo.id_vendedor_n}</div>
                                </div>
                                <div id={`call${index + this.props.appoToday.length}`} cont={`appointment${index + this.props.appoToday.length}`} onClick={() => window.open(`tel:${appo.telefono}`, '_self')}><i className="fas fa-phone fa-3x"></i></div>
                            </div>
                        ))}
                    </div>
                </div>
                ):null}
            </div>
        )
    }
}

export default APPOINTMENTS_INFO