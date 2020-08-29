import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

const token = ("; " + document.cookie).split("; s4book_id_user=").pop().split(";").shift()
class CONTACTDETAILS_INFO extends Component {

    constructor(props) {
        super(props)
        this.timer = null;
        this.state = {
            nombre: this.props.info.nombre,
            apellido: this.props.info.apellido,
            telefono: this.props.info.telefono,
            email: this.props.info.email,
            direccion: this.props.info.direccion

        }
    }

    componentWillUnmount = () => {
        clearTimeout(this.timer)
    }



    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        }, this.showSave);
    };

    showSave = () => {
        document.getElementById('contactdetails-info-save').style.transform = 'scale(1)'
    }


    saveChanges = event => {
        event.preventDefault()
        console.log(this.props.match.params.id)
        axios.post(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=edit&id=${this.props.match.params.id}&nombre=${this.state.nombre}&apellido=${this.state.apellido}&email=${this.state.email}&telefono=${this.state.telefono}&direccion=${this.state.direccion}&e=${token}`)
            .then(res => {
                console.log(res.data)
                if (res.data === 1) {
                    document.getElementById('contactdetails-info-id').style.background = 'rgb(58, 145, 47)'
                    document.getElementById('contactdetails-info-save').style.transform = 'scale(0)'
                    this.timer = setTimeout(() => {
                        document.getElementById('contactdetails-info-id').style.background = 'rgb(46, 46, 46)'
                    }, 500);
                    this.props.updateNav(this.state.nombre, this.state.telefono, this.state.apellido)
                } else {
                    document.getElementById('contactdetails-info-id').style.boxShadow = 'inset 0px 0px 0px 3px rgb(189, 58, 51)'
                    document.getElementById('contactdetails-info-save').style.transform = 'scale(0)'
                    setTimeout(() => {
                        document.getElementById('contactdetails-info-id').style.boxShadow = 'inset 0px 0px 0px 0px rgb(189, 58, 51)'
                    }, 3000);
                }
            })
    }

    render() {
        return (
            <div className='contactdetails-block' id='contactdetails-info-id'>
                <form onSubmit={this.saveChanges}>
                    <div>
                        <div>INFO</div>
                        <div><button id='contactdetails-info-save'>Guardar</button></div>
                    </div>

                    <div className='contactdetails-info'>

                        <div>
                            <div>Nombre</div>
                            <input
                                value={this.state.nombre}
                                onChange={this.handleInputChange}
                                name='nombre'
                                required
                            />
                        </div>
                        <div>
                            <div>Apellido</div>
                            <input
                                value={this.state.apellido || ''}
                                onChange={this.handleInputChange}
                                name='apellido'
                            />
                        </div>
                        <div>
                            <div>Telefono</div>
                            <input
                                value={this.state.telefono || ''}
                                onChange={this.handleInputChange}
                                name='telefono'
                                required
                            />
                        </div>
                        <div>
                            <div>Email</div>
                            <input
                                value={this.state.email || ''}
                                onChange={this.handleInputChange}
                                name='email'
                            />
                        </div>
                        <div>
                            <div>Direccion</div>
                            <input
                                value={this.state.direccion || ''}
                                onChange={this.handleInputChange}
                                name='direccion'
                            />
                        </div>


                    </div>
                </form>
            </div>
        )
    }
}

export default CONTACTDETAILS_INFO