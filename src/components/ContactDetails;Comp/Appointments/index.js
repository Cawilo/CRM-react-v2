import React, { Component } from 'react';
import './style.css';
import NoItems from '../NoItems';
import Modal from '../../Global;Comp/Modal';
import axios from 'axios';
import moment from 'moment';

const token = ("; " + document.cookie).split("; s4book_id_user=").pop().split(";").shift()
class CONTACTDETAILS_APPOINTMENTS extends Component {



    constructor(props) {
        super(props)
        this.child = React.createRef();
        this.state = {
            appoDetails: {},
            appoHour: '',
            appoDate: '',
            appoNote: ''
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    openAppoinment = event => {
        console.log(event.currentTarget.attributes.id.value)
        console.log(this.props.contactName)
        if (event.currentTarget.attributes.id.value !== '0') {
            axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=cita_edit&id=${event.currentTarget.attributes.id.value}&e=${token}`)
                .then(res => {
                    console.log(res.data)
                    res.data[0].id_trabajador = this.assignSeller(res.data[0].id_trabajador)
                    this.setState({
                        appoDetails: res.data[0],
                        appoHour: res.data[0].hora_agenda,
                        appoDate: res.data[0].fecha_agenda,
                        appoNote: res.data[0].observaciones,

                    }, this.child.current.openModal())
                })
        } else {
            this.setState({
                appoDetails: false,
                appoHour: '',
                appoDate: '',
                appoNote: '',
            }, this.child.current.openModal())

        }
    }


    assignSeller = (value) => {
        if (value === '53') return 'Camilo Caroso'
        if (value === '155') return 'Camilo Samuel'
        if (value === '56') return 'Camilo Urbina'
        if (value === '64') return 'Emanuel'
        if (value === '148') return 'Gabriel Caroso'
        if (value === '158') return 'Oriana Mayentis'
        if (value === '108') return 'Raul Capelan'
        if (value === '57') return 'Ruben Echeverria'
        if (value === '58') return 'Yormar Rincon'
        if (value === '0') return 'x'
    }

    createOrchangeAppo = event => {
        event.preventDefault()
        let id = this.state.appoDetails.id
        let contact = this.state.appoDetails.id_contacto
        let status = this.state.appoDetails.status
        if(id === undefined)id = 0 
        if(contact === undefined)contact = this.props.match.params.id
        if(status === undefined)status = 1
        axios.post(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=cita_update&id=${id}&f=${moment().format('YYYY-MM-DD').toString()}&f2=${this.state.appoDate}&h=${moment().format("HH:mm:ss")}&h2=${this.state.appoHour}&n1=${this.state.appoNote || ''}&n2=${''}&contacto=${contact}&status=${status}&e=${token}`)
        .then(res => {
            
        })
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }

    deleteAppointment = event => {
        console.log(event.currentTarget.value)
        axios.post(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=delete_app&id=${event.currentTarget.value}&e=${token}`)
        .then(res => {
            console.log(res.data)
            this.child.current.closeModal()
            this.props.updateAppointments()
        })
    }

    render() {
        return (
            <div className='contactdetails-block contactdetails-appointments'>
                <form>
                    <div>
                        <div>Citas</div>
                        <div className='contactdetails-createappo'><button type='button' id='0' onClick={this.openAppoinment}>Crear Cita</button></div>
                    </div>
                    {this.props.appoToday.length ? (
                        <div className='contactdetails-appowhatday'>
                            <div>Hoy</div>
                            <div className='contactdetails-appointments-container'>

                                {this.props.appoToday.map((appointment, index) => (
                                    <div key={index} id={appointment.id_cita} onClick={this.openAppoinment}>
                                        <div>{appointment.fecha_agenda}</div>
                                        <div>{appointment.hora_agenda}</div>
                                        <div>{appointment.id_trabajador}</div>
                                        <div>{appointment.observaciones}</div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    ) : null}
                    {this.props.appoTomorrow.length ? (
                        <div className='contactdetails-appowhatday'>
                            <div>Mañana</div>
                            <div className='contactdetails-appointments-container'>
                                {this.props.appoTomorrow.map((appointment, index) => (
                                    <div key={index} id={appointment.id_cita} onClick={this.openAppoinment}>
                                        <div>{appointment.fecha_agenda}</div>
                                        <div>{appointment.hora_agenda}</div>
                                        <div>{appointment.id_trabajador}</div>
                                        <div>{appointment.observaciones}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                    {this.props.appointments.length ? (
                        <div className='contactdetails-appointments-container'>

                            {this.props.appointments.map((appointment, index) => (
                                <div key={index} id={appointment.id_cita} onClick={this.openAppoinment}>
                                    <div>{appointment.fecha_agenda}</div>
                                    <div>{appointment.hora_agenda}</div>
                                    <div>{appointment.id_trabajador}</div>
                                    <div>{appointment.observaciones}</div>
                                </div>
                            ))}
                        </div>
                    ) : (<NoItems />)}
                </form>
                <Modal
                    ref={this.child}
                >
                    <form onSubmit={this.createOrchangeAppo}>
                        {this.state.appoDetails === false ? (<div id='appodetails-modal-titulo'>Crear Cita</div>) : null}
                        <div className='appodetails-modal'>
                            <div>{this.props.contactName}</div>
                            <input
                                type='time'
                                value={this.state.appoHour}
                                onChange={this.handleInputChange}
                                name='appoHour'
                                required
                            />
                            <input
                                type='date'
                                value={this.state.appoDate}
                                onChange={this.handleInputChange}
                                name='appoDate'
                                required
                            />
                            <div><textarea
                                type='text'
                                value={this.state.appoNote}
                                placeholder='observaciones'
                                onChange={this.handleInputChange}
                                name='appoNote'
                            /></div>
                            <div>{this.state.appoDetails.id_trabajador}</div>
                            <div>
                                {this.state.appoDetails !== false ? (<button type='button' value={this.state.appoDetails.id} onClick={this.deleteAppointment}><i className="fas fa-trash-alt"></i></button>):<div></div>}
                                <button type='submit'>{this.state.appoDetails !== false ? 'Guardar' : 'Crear'}</button>
                            </div>
                        </div>
                    </form>

                </Modal>
            </div>
        )
    }



}


export default CONTACTDETAILS_APPOINTMENTS