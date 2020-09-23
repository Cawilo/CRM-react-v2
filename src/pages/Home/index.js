import React, {Component} from 'react';
import './style.css';
import HOME_PROJECTS from '../../components/Home;Comp/Projects';
import HOME_CONTACTS from '../../components/Home;Comp/Contacts';
import HOME_APPOINTMENTS from '../../components/Home;Comp/Appointments';

import moment from 'moment';


class Home extends Component {

   


    render(){
        return(
            <div className='home-container'>
                {this.props.user.id_rol_verf === 'admin' || this.props.user.id_rol_verf === 'seller' ? (
                <div className='home-buttons'>
                    <button onClick={()=>this.props.history.push('/proyectos/'+moment().format('YYYY-MM-DD'))}>Proyectos</button>
                    <button onClick={()=>this.props.history.push('/citas')}>Citas</button>
                    <button onClick={()=>this.props.history.push('/contactos/'+moment().format('YYYY-MM-DD')+'/todos')}>Contactos</button>
                </div>
                ):null}
                {this.props.user.id_rol_verf === 'admin' || this.props.user.id_rol_verf === 'seller' ? (
                <HOME_CONTACTS
                    history={this.props.history}
                    user={this.props.user}
                />
                ):null}
                {this.props.user.id_rol_verf === 'admin' || this.props.user.id_rol_verf === 'seller' ? (
                <HOME_APPOINTMENTS
                    history={this.props.history}
                    user={this.props.user}
                />
                ):null}
                <HOME_PROJECTS
                    history={this.props.history}
                />
            </div>
        )
    }
}

export default Home