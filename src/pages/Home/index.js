import React, {Component} from 'react';
import './style.css';
import HOME_PROJECTS from '../../components/Home;Comp/Projects';
import HOME_CONTACTS from '../../components/Home;Comp/Contacts';
import HOME_APPOINTMENTS from '../../components/Home;Comp/Appointments';


class Home extends Component {

   


    render(){
        return(
            <div className='home-container'>
                <HOME_PROJECTS
                    history={this.props.history}
                />
                {this.props.user.id_rol_verf === 'admin' || this.props.user.id_rol_verf === 'seller' ? (
                <HOME_CONTACTS
                    history={this.props.history}
                    user={this.props.user}
                />
                ):null}
                {this.props.user.id_rol_verf ? (
                <HOME_APPOINTMENTS
                    history={this.props.history}
                    user={this.props.user}
                />
                ):null}
            </div>
        )
    }
}

export default Home