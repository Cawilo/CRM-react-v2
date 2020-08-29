import React, { Component } from 'react';
import axios from 'axios';
import './style.css';
import CONTACTDETAILS_INFO from '../../components/ContactDetails;Comp/Info';
import CONTACTDETAILS_APPOINTMENTS from '../../components/ContactDetails;Comp/Appointments';
import LoadingBlock from '../../components/ContactDetails;Comp/LoadingBlock';
import CONTACTDETAILS_ENDFUNCT from '../../components/ContactDetails;Comp/EndFunct';
import CONTACTDETAILS_SMS from '../../components/ContactDetails;Comp/Sms';
import CONTACTDETAILS_IMAGES from '../../components/ContactDetails;Comp/Images';
import moment from 'moment';


const token = ("; " + document.cookie).split("; s4book_id_user=").pop().split(";").shift()
class ContactDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            details: [],

            appointments: [],
            appoToday: [],
            appoTomorrow: [],

            sms: [],


            loadAppo: false,
            loadDet: false,
            loadSms: false
        }
    }

    componentDidMount = () => {
        this.updateDetails()
        this.updateAppointments()
        this.updateSms()
    }

    // details

    updateDetails = () => {
        //console.log(this.props.match.params.id)
        axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=detail2&contacto=${this.props.match.params.id}&e=${token}`)
            .then(res => {
                //this.setState({details: []})
                if (res.data[0][0].id === '0') {
                    return this.props.history.goBack()
                }
                if (res.data[1][0].id === '0'){
                    res.data[1] = []
                }
                console.log(res.data)
                res.data[0][0].telefono = this.formatPhoneNumber(res.data[0][0].telefono)
                this.setState({ details: res.data, loadDet: true })
            })
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

    updateNav = (name, phone, lastname) => {
        this.setState(prevState => ({
            details: [
                [{
                    ...prevState.details,
                    nombre: name,
                    apellido: lastname,
                    telefono: this.formatPhoneNumber(phone),
                    nombre_vendedor: this.state.details[0][0].nombre_vendedor
                }]
            ]
        }))
    }


    // apointments

    updateAppointments = () => {
        axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=agenda&contacto=${this.props.match.params.id}&e=${token}`)
            .then(res => {
                this.setState({ appointments: [], appoToday: [], appoTomorrow: [] })
                //console.log(res.data)
                if (res.data === 10) {
                    this.setState({ appointments: false, loadAppo: true })
                } else {
                    this.SortAndFormatDate(res.data)

                    this.setState({ appointments: res.data, loadAppo: true })

                }

            })
    }

    SortAndFormatDate = (data) => {
        for (let i = 0; i < data.length; i++) {
            this.formatDate = (value) => {
                let date = value
                let year = date.substr(0, 4);
                let month = date.substr(5, 2);
                let day = date.substr(8, 9);
                return `${month}/${day}/${year}`
            }
            data[i].fecha_agenda = this.formatDate(data[i].fecha_agenda)
            data[i].hora_agenda = moment(data[i].hora_agenda, 'HH:mm').format('hh:mm a')
            data[i].id_trabajador = this.assignSeller(data[i].id_trabajador)
            if (data[i].hora_agenda.charAt(0) === "0") data[i].hora_agenda = data[i].hora_agenda.slice(1)

            if (data[i].fecha_agenda === moment().format('MM/DD/YYYY').toString()) {
                let today = this.state.appoToday;
                today.push(data[i])
                this.setState({ appoToday: today })

            }
            if (data[i].fecha_agenda === moment().add(1, 'days').format('MM/DD/YYYY').toString()) {
                let tomorrow = this.state.appoTomorrow;
                tomorrow.push(data[i])
                this.setState({ appoTomorrow: tomorrow })

            }
        }
        console.log(this.state.appoToday)
        console.log(this.state.appoTomorrow)

        data.sort((a, b) => {

            if (a.fecha_agenda < b.fecha_agenda) return 1;
            if (a.fecha_agenda > b.fecha_agenda) return -1;


            if (a.hora_agenda < b.hora_agenda) return -1;
            if (a.hora_agenda > b.hora_agenda) return 1;

            return 0
        })
    }

    assignSeller = value => {
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

    //Sms//////////////

    updateSms = () => {
        axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_tracking.php?i=sms_list&contacto=${this.props.match.params.id}&e=${token}`)
            .then(res => {
                if (res.data === 0) {
                    return this.setState({ sms: false, loadSms: true })
                }
                console.log(res.data)
                res.data[0].hora_mensaje = moment(res.data[0].hora_mensaje, 'HH:mm').format('a hh:mm')
                this.setState({ sms: res.data.reverse(), loadSms: true })
            })
    }

    // scrollSms = () => {
    //     let element = document.getElementById('contactdetails-sms-scroll');
    //     element.scrollTop = element.scrollHeight;
    // }


    render() {
        return (
            <div>
                <div>
                    {this.state.loadAppo === true && this.state.loadDet === true && this.state.loadSms === true ? (
                        <div className='contactdetails-nav'>
                            <div>{this.state.details[0][0].nombre} {this.state.details[0][0].apellido}</div>
                            <div onClick={() => window.open(`tel:${this.state.details[0][0].telefono}`, '_self')}>{this.state.details[0][0].telefono}<i className="fas fa-phone fa-1x"></i></div>
                            <div>{this.state.details[0][0].nombre_vendedor}</div>
                        </div>
                    ) : null}
                    {this.state.loadAppo === true && this.state.loadDet === true && this.state.loadSms === true ? (
                        <CONTACTDETAILS_INFO
                            info={this.state.details[0][0]}
                            match={this.props.match}
                            updateNav={this.updateNav}
                        />
                    ) : <LoadingBlock />}
                    {this.state.loadAppo === true && this.state.loadDet === true && this.state.loadSms === true ? (
                        <CONTACTDETAILS_APPOINTMENTS
                            appointments={this.state.appointments}
                            appoToday={this.state.appoToday}
                            appoTomorrow={this.state.appoTomorrow}
                            contactName={this.state.details[0][0].nombre + " " + this.state.details[0][0].apellido}
                            match={this.props.match}
                            updateAppointments={this.updateAppointments}
                        />
                    ) : <LoadingBlock />}
                    {this.state.loadAppo === true && this.state.loadDet === true && this.state.loadSms === true ? (
                        <CONTACTDETAILS_SMS
                            smss={this.state.sms}
                            info={this.state.details[0][0]}
                            user={this.props.user}
                            updateSms={this.updateSms}
                        />
                    ) : <LoadingBlock />}
                    {this.state.loadAppo === true && this.state.loadDet === true && this.state.loadSms === true ? (
                        <CONTACTDETAILS_IMAGES
                            info={this.state.details[1]}
                            infoCont={this.state.details[0][0]}
                            updateImgs={this.updateDetails}
                        />
                    ) : <LoadingBlock />}
                    {this.state.loadAppo === true && this.state.loadDet === true && this.state.loadSms === true ? (
                        <CONTACTDETAILS_ENDFUNCT
                            history={this.props.history}
                            info={this.state.details[0][0]}
                            user={this.props.user}
                        />
                    ) : null}
                </div>
            </div>
        )
    }



}

export default ContactDetails