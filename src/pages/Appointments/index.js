import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment'
import './style.css';
import APPOINTMENTS_INFO from '../../components/Appointments;Comp/Info';
import Modal from '../../components/Global;Comp/Modal';
import LoadingBlock from '../../components/Appointments;Comp/LoadingBlock';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'


const token = ("; " + document.cookie).split("; s4book_id_user=").pop().split(";").shift()
class Appointments extends Component {

    constructor(props) {
        super(props)
        this.timer = null;
        this.child = React.createRef();
        this.state = {
            appointments: [],
            appoToday: [],
            appoTomorrow: [],

            appoDetails: {},
            appoDetailsHour: '',
            appoDetailsDate: '',

            apposCalendar: []
        }
        this.openAppointment = this.openAppointment.bind(this)
    }


    componentDidMount = () => {
        this.updateAppointments()
    }

    componentWillUnmount = () => {
        clearTimeout(this.timer);
    }


    updateAppointments = () => {
        axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=citas_all&e=${token}`)
            .then(res => {
                let contacts = []
                for (let i = 0; i < res.data.length; i++) {

                    res.data[i].hora_agenda = moment(res.data[i].hora_agenda, 'HH:mm').format('hh:mm a')
                    if (res.data[i].hora_agenda.charAt(0) === "0") res.data[i].hora_agenda = res.data[i].hora_agenda.slice(1)
                    res.data[i].fecha_agenda_format = this.formatDate(res.data[i].fecha_agenda)
                    res.data[i].telefono = this.formatPhoneNumber(res.data[i].telefono)

                    if (this.props.user.id_rol_verf === 'seller') {
                        if (this.props.user.id === res.data[i].id_vendedor) {

                            res.data[i].id_vendedor_n = this.assignSeller(res.data[i].id_vendedor)
                            this.groupAppointments(res.data[i])
                            contacts.push(res.data[i])
                        }
                    } else {
                        res.data[i].id_vendedor_n = this.assignSeller(res.data[i].id_vendedor)
                        this.groupAppointments(res.data[i], i, res.data.length)
                        contacts = res.data
                    }
                }
                console.log(contacts)
                this.setState({ appointments: contacts }, this.afterLoad)
            })
    }

    afterLoad = () => {
        setTimeout(() => {
            if (("; " + document.cookie).split("; appointmentScroll=").pop().split(";").shift() && document.getElementById(("; " + document.cookie).split("; appointmentScroll=").pop().split(";").shift())) {
                const y = document.getElementById(("; " + document.cookie).split("; appointmentScroll=").pop().split(";").shift()).getBoundingClientRect().top + window.pageYOffset + -90;
                window.scrollTo({ top: y, behavior: 'smooth' });
                setTimeout(() => {
                    document.getElementById(("; " + document.cookie).split("; appointmentScroll=").pop().split(";").shift()).style.filter = 'brightness(170%)'
                    setTimeout(() => {
                        document.getElementById(("; " + document.cookie).split("; appointmentScroll=").pop().split(";").shift()).style.filter = 'brightness(100%)'
                    }, 500);
                }, 600);
            }
        }, 500)
        this.fullCalendar()
    }

    groupAppointments = (date, i, length) => {
        if (date.fecha_agenda === moment().format('YYYY-MM-DD').toString()) {
            let today = this.state.appoToday
            today.push(date)
            this.setState({ appoToday: today })

            if (i + 1 === length) {
                if (!this.state.appoToday.length) this.setState({ appoToday: false })
            }
        }
        if (date.fecha_agenda === moment().add(1, 'days').format('YYYY-MM-DD').toString()) {
            let tomorrow = this.state.appoTomorrow
            tomorrow.push(date)
            this.setState({ appoTomorrow: tomorrow })
            //console.log(i)

        }
        if (i + 1 === length) {
            if (!this.state.appoTomorrow.length) this.setState({ appoTomorrow: false })
        }
        if (i + 1 === length) {
            if (!this.state.appoToday.length) this.setState({ appoToday: false })
        }
    }

    formatPhoneNumber = (str) => {
        let cleaned = ('' + str).replace(/\D/g, '');
        let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            let intlCode = (match[1] ? '+1 ' : '')
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        return str
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

    formatDate = (value) => {
        let date = value
        let year = date.substr(0, 4);
        let month = date.substr(5, 2);
        let day = date.substr(8, 9);
        return (`${month}/${day}/${year}`)
    }

    openAppointment = (id, contact, phone, ubication) => {
        console.log(contact)
        axios.post(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=cita_edit&id=${id}&e=${token}`)
            .then(res => {
                console.log(res.data)
                res.data[0].contacto = contact
                res.data[0].telefono = phone
                res.data[0].direccion = ubication
                res.data[0].vendedor = this.assignSeller(res.data[0].id_trabajador)
                this.setState({ appoDetails: res.data[0], appoDetailsHour: res.data[0].hora_agenda, appoDetailsDate: res.data[0].fecha_agenda }, this.child.current.openModal())

            })

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        }, this.showSave);
    };

    showSave = () => {
        document.getElementById('appodetails-save').style.transform = 'scale(1)'
    }

    saveChangesAppointment = () => {
        axios.post(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=cita_update&id=${this.state.appoDetails.id}&f=${moment().format('YYYY-MM-DD').toString()}&f2=${this.state.appoDetailsDate}&h=${moment().format("HH:mm:ss")}&h2=${this.state.appoDetailsHour}&n1=${this.state.appoDetails.observaciones || ''}&n2=${this.state.appoDetails.observaciones2 || ''}&contacto=${this.state.appoDetails.id_contacto}&status=${this.state.appoDetails.status}&e=${token}`)
            .then(res => {

            })
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }


    fullCalendar = () => {
        let appos = this.state.appointments
        let apposFull = []
        for (let i = 0; i < appos.length; i++) {
            //console.log(appos[i].id_cita)
            let color;
            if (appos[i].id_vendedor === "58") { color = "#D60606" }
            else if (appos[i].id_vendedor === "64") { color = "#FE0AFB" }
            else if (appos[i].id_vendedor === "53") { color = "#8891C2" }
            else if (appos[i].id_vendedor === "57") { color = "#2A55FF" }
            else if (appos[i].id_vendedor === "158") { color = "#607D8B" }
            else if (appos[i].id_vendedor === "148") { color = "#2ba11b" }
            else { color = "#a3a3a3" }
            let obj = {
                date: appos[i].fecha_agenda,
                title: appos[i].vendedor + ' ' + appos[i].hora_agenda,
                id_cita: appos[i].id_cita,
                color: color,
                ubication: appos[i].direccion,
                phone: appos[i].telefono,
                contact: appos[i].nombre + ' ' + appos[i].apellido
            }
            apposFull.push(obj)


        }
        this.setState({ apposCalendar: apposFull })
    }

    adjustValues = calEvent => {
        this.openAppointment(calEvent.event._def.extendedProps.id_cita, calEvent.event._def.extendedProps.contact, calEvent.event._def.extendedProps.phone, calEvent.event._def.extendedProps.ubication)
    }


    render() {
        return (
            <div>
                {this.state.appointments.length ? (
                    <div>
                        <APPOINTMENTS_INFO
                            appoToday={this.state.appoToday}
                            appoTomorrow={this.state.appoTomorrow}
                            openAppointment={this.openAppointment}
                        />
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            eventOrder="time"
                            initialView="dayGridMonth"
                            contentHeight="auto"
                            events={this.state.apposCalendar}
                            eventClick={this.adjustValues}
                        />
                    </div>
                ) : (<div>
                    <LoadingBlock />
                    <LoadingBlock />
                    <LoadingBlock />
                    <LoadingBlock />
                    <LoadingBlock />
                </div>)}

                <Modal
                    ref={this.child}
                >
                    <div className='appointment-modal'>
                        <div>{this.state.appoDetails.contacto}</div>
                        <input
                            type='time'
                            value={this.state.appoDetailsHour}
                            onChange={this.handleInputChange}
                            name='appoDetailsHour'
                        />
                        <input
                            type='date'
                            value={this.state.appoDetailsDate}
                            onChange={this.handleInputChange}
                            name='appoDetailsDate'
                        />
                        <a href={`https://www.google.com/maps/search/${this.state.appoDetails.direccion}`}>{this.state.appoDetails.direccion}</a>
                        <div>{this.state.appoDetails.observaciones}</div>
                        <div><div onClick={() => window.open(`tel:${this.state.appoDetails.telefono}`, '_self')}>{this.state.appoDetails.telefono}<i className="fas fa-phone fa-1x"></i></div></div>
                        <div>{this.state.appoDetails.vendedor}</div>
                        <div><div><button id='appodetails-save' onClick={this.saveChangesAppointment}>Guardar</button></div></div>
                        <div onClick={() => this.props.history.push('/contactos/detalles/' + this.state.appoDetails.id_contacto)}>Ir a contacto  <i className="fas fa-user"></i></div>
                    </div>
                </Modal>
            </div>
        )
    }



}

export default Appointments