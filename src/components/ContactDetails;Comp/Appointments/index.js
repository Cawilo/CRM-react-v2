import React, { Component } from 'react';
import './style.css';
import NoItems from '../NoItems';

class CONTACTDETAILS_APPOINTMENTS extends Component {



    render() {
        return (
            <div className='contactdetails-block contactdetails-appointments'>
                <form>
                    <div>
                        <div>Citas</div>
                    </div>
                    {this.props.appoToday.length ? (
                    <div className='contactdetails-appowhatday'>
                        <div>Hoy</div>
                        <div className='contactdetails-appointments-container'>
                            
                            {this.props.appoToday.map((appointment, index) => (
                                <div key={index}>
                                    <div>{appointment.fecha_agenda}</div>
                                    <div>{appointment.hora_agenda}</div>
                                    <div>{appointment.id_trabajador}</div>
                                    <div>{appointment.observaciones}</div>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                    ):null}
                    {this.props.appoTomorrow.length ? (
                    <div className='contactdetails-appowhatday'>
                        <div>Mañana</div>
                        <div className='contactdetails-appointments-container'>
                            {this.props.appoTomorrow.map((appointment, index) => (
                                <div key={index}>
                                    <div>{appointment.fecha_agenda}</div>
                                    <div>{appointment.hora_agenda}</div>
                                    <div>{appointment.id_trabajador}</div>
                                    <div>{appointment.observaciones}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    ):null}
                    {this.props.appointments.length ? (
                    <div className='contactdetails-appointments-container'>
                        
                        {this.props.appointments.map((appointment, index) => (
                            <div key={index}>
                                <div>{appointment.fecha_agenda}</div>
                                <div>{appointment.hora_agenda}</div>
                                <div>{appointment.id_trabajador}</div>
                                <div>{appointment.observaciones}</div>
                            </div>
                        ))}
                    </div>
                    ):(<NoItems/>)}
                </form>
            </div>
        )
    }



}


export default CONTACTDETAILS_APPOINTMENTS