import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import moment from 'moment'

class NavSide extends Component {

    logout = () => {
        document.cookie = "s4book_id_user= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        window.location.reload()
    }

    render() {
        return (
            <div>
                <div onClick={this.props.closeSide} className="overlaySide"></div>
                <div className="navSide">
                    <Link to='/'><div onClick={this.props.closeSide}><i className="fas fa-home fa-sm"></i> Home</div></Link>

                    <Link to={'/proyectos/'+moment().format('YYYY-MM-DD').toString()}><div onClick={this.props.closeSide} className='navSide-pattern'><i className="fas fa-project-diagram fa-sm"></i> Proyectos</div></Link>

                    <Link to={this.props.user.id_rol_verf === 'seller' ? `/contactos/${moment().format('YYYY-MM-DD').toString()}/${this.props.user.id}`:`/contactos/${moment().format('YYYY-MM-DD').toString()}/todos`}>{this.props.user.id_rol_verf === 'admin' || this.props.user.id_rol_verf === 'seller'? (<div onClick={this.props.closeSide}><i className="fas fa-address-book fa-sm"></i> Contactos</div>):(null)}</Link>

                    <Link to='/citas'>{this.props.user.id_rol_verf === 'admin' || this.props.user.id_rol_verf === 'seller'? (<div onClick={this.props.closeSide} className='navSide-pattern'><i className="fas fa-calendar-alt fa-sm"></i> Citas</div>):(null)}</Link>

                    <Link to='/'><div><i className="fas fa-money-bill-wave fa-sm"></i> Pagos</div></Link>

                    <Link to='/'><div className='navSide-pattern'><i className="fas fa-envelope fa-sm"></i> Mensajeria</div></Link>

                    <Link to='/'><div><i className="fas fa-print fa-sm"></i> Etiquetas</div></Link>

                    <Link to='/'><div className='navSide-pattern' onClick={this.logout}><i className="fas fa-sign-out-alt fa-sm"></i> Log Out</div></Link>
                </div>
            </div>
        )
    }


}

export default NavSide