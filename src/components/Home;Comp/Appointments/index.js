import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment';
import './style.css';
import NoItems from '../NoItems';
import LoadingBlock from '../LodingBlock';
import SeeMore from '../SeeMore';

const token = ("; " + document.cookie).split("; s4book_id_user=").pop().split(";").shift();
class HOME_APPOINTMENTS extends Component {

    constructor(props) {
        super(props)
        this.state = {
            appointments: [],
            date: moment().format('YYYY-MM-DD').toString(),

            user: this.props.user
        }
    }

    componentDidMount = () => {
        this.updateAppointments()
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        }, this.updateAppointments);
    };

    updateAppointments = () => {
        this.setState({ appointments: [] })
        let appo = []
        axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=citas_all&e=${token}`)
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].fecha_agenda === this.state.date) {
                        appo.push(res.data[i])
                    }
                    res.data[i].hora_agenda = moment(res.data[i].hora_agenda, 'HH:mm').format('hh:mm a')
                    if (res.data[i].hora_agenda.charAt(0) === "0") res.data[i].hora_agenda = res.data[i].hora_agenda.slice(1)
                    // if (this.state.user.id_rol_verf === 'seller') {
                    //     if (this.state.user.id === res.data[i].id_vendedor) {
                    //         if (res.data[i].fecha_agenda === this.state.date) {
                    //             appo.push(res.data[i])
                    //         }
                    //         res.data[i].hora_agenda = moment(res.data[i].hora_agenda, 'HH:mm').format('hh:mm a')
                    //         if (res.data[i].hora_agenda.charAt(0) === "0") res.data[i].hora_agenda = res.data[i].hora_agenda.slice(1)
                    //     }
                    // } else {
                    //     if (res.data[i].fecha_agenda === this.state.date) {
                    //         appo.push(res.data[i])
                    //     }
                    //     res.data[i].hora_agenda = moment(res.data[i].hora_agenda, 'HH:mm').format('hh:mm a')
                    //     if (res.data[i].hora_agenda.charAt(0) === "0") res.data[i].hora_agenda = res.data[i].hora_agenda.slice(1)
                    // }
                }
                if (!appo.length) appo = false
                this.setState({ appointments: appo })


            })
    }

    goAppointment = event => {
        let date = new Date();
        date.setTime(date.getTime() + (8000));
        let expiry = '; expires=' + date.toUTCString();
        document.cookie = `appointmentScroll=${event.currentTarget.attributes.id_cita.value}${expiry}; path=/`
        this.props.history.push('/citas')
    }



    render() {
        return (
            <div className='container-block'>
                <div>
                    <div className='container-block-title' onClick={()=>this.props.history.push('/citas')}>Citas</div>
                    <div className='container-block-extra'><input
                        type='date'
                        className='input-date-block'
                        value={this.state.date}
                        onChange={this.handleInputChange}
                        name='date'
                    /></div>
                </div>
                <div className='container-block-appointments'>
                    {this.state.appointments.length ? (
                        this.state.appointments.slice(0, 5).map((appointment, index) => (
                            <div key={index} className='container-block-appointments-a' id_cita={appointment.id_cita} onClick={this.goAppointment}>
                                <div>{appointment.vendedor}</div>
                                <div>{appointment.hora_agenda}</div>
                                <div>{appointment.nombre} {appointment.apellido}</div>
                            </div>
                        ))
                    ) : this.state.appointments === false ? (<NoItems />) : (
                        <div>
                            <LoadingBlock />
                            <LoadingBlock />
                            <LoadingBlock />
                            <LoadingBlock />
                            <LoadingBlock />
                        </div>
                    )}
                    {this.state.appointments.length ? (<SeeMore history={this.props.history} page='citas' value='' />) : (null)}
                </div>
            </div>
        )
    }
}

export default HOME_APPOINTMENTS