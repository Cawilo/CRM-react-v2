import React, { Component } from 'react';
import './style.css';
import moment from 'moment';
import ModalSms from '../ModalSms';
import axios from 'axios';

const token = ("; " + document.cookie).split("; s4book_id_user=").pop().split(";").shift()
class CONTACTDETAILS_SMS extends Component {

    constructor(props) {
        super(props)
        this.child = React.createRef();
        this.state = {
            details: {},

            message: '',
            idmessage: '',
            title: '',

            template: 'default',
            language: '1',

            enableInfo: false
        }

        this.handleChangeTem = this.handleChangeTem.bind(this);
        this.handleChangeLan = this.handleChangeLan.bind(this);
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    openModalSms = () => {
        //console.log('fseefs')
        this.setState({ details: {}, message: '', idmessage: '', title: '', template: 'default', language: '1', enableInfo: false })
        let details = {
            templatesTRANS: [],
            templates: []
        }
        axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_tracking.php?i=sms_templates&e=${token}`)
            .then(res => {
                console.log(res.data)
                for (let i = 0; i < res.data.length; i++) {



                    let messages = {
                        messageING: res.data[i].message,
                        messageESP: res.data[i].mensaje,
                        titleING: res.data[i].subject,
                        titleESP: res.data[i].asunto,
                        id: res.data[i].id
                    }
                    let template = {
                        id: res.data[i].id,
                        nombre: res.data[i].nombre
                    }
                    details.templatesTRANS.push(messages)
                    details.templates.push(template)
                }
                this.setState({ details: details, enableInfo: true }, this.child.current.openModal())
            })
        //this.child.current.openModal()
    }

    handleChangeTem(event) {
        this.setState({ template: event.target.value });
        //console.log(event.target.value)
        let tem = this.state.details.templatesTRANS
        for (let i = 0; i < tem.length; i++) {
            //console.log(tem[i])
            if (tem[i].id === event.target.value) {
                if (this.state.language === "1") {
                    //console.log(tem[i].messageESP)

                    let message = tem[i].messageESP

                    message = message.replace("[nombre_cliente]", this.props.info.nombre + ' ' + this.props.info.apellido)
                    message = message.replace("[nombre_vendedor]", this.props.user.nombre)
                    message = message.replace("[telefono_v]", this.props.user.telefono)
                    message = message.replace("[link_estimado]", '')
                    //console.log(message)
                    let title = tem[i].titleESP
                    title = title.replace("[id]", '')


                    this.setState({ message: message, idmessage: tem[i].id, title: title })
                } else if (this.state.language === "2") {
                    //console.log(tem[i].messageING)
                    let message = tem[i].messageING

                    message = message.replace("[nombre_cliente]", this.props.info.nombre + ' ' + this.props.info.apellido)
                    message = message.replace("[nombre_vendedor]", this.props.user.nombre)
                    message = message.replace("[telefono_v]", this.props.user.telefono)
                    message = message.replace("[link_estimado]", '')

                    let title = tem[i].titleING
                    title = title.replace("[id]", '')

                    this.setState({ message: message, idmessage: tem[i].id, title: title })
                }

            }
        }

    }

    handleChangeLan(event) {
        this.setState({ language: event.target.value });
        let tem = this.state.details.templatesTRANS
        if (this.state.language === "1") {
            for (let i = 0; i < tem.length; i++) {
                //console.log(tem[i])
                if (this.state.idmessage === tem[i].id) {
                    let message = tem[i].messageING

                    message = message.replace("[nombre_cliente]", this.props.info.nombre + ' ' + this.props.info.apellido)
                    message = message.replace("[nombre_vendedor]", this.props.user.nombre)
                    message = message.replace("[telefono_v]", this.props.user.telefono)
                    message = message.replace("[link_estimado]", '')

                    let title = tem[i].titleING
                    title = title.replace("[id]", '')
                    this.setState({ message: message, idmessage: tem[i].id, title: title })
                }
            }
        } else if (this.state.language === "2") {
            for (let i = 0; i < tem.length; i++) {
                //console.log(tem[i])
                if (this.state.idmessage === tem[i].id) {
                    let message = tem[i].messageESP

                    message = message.replace("[nombre_cliente]", this.props.info.nombre + ' ' + this.props.info.apellido)
                    message = message.replace("[nombre_vendedor]", this.props.user.nombre)
                    message = message.replace("[telefono_v]", this.props.user.telefono)
                    message = message.replace("[link_estimado]", '')

                    let title = tem[i].titleESP
                    title = title.replace("[id]", '')
                    this.setState({ message: message, idmessage: tem[i].id, title: title })
                }
            }
        }
    }

    sendMessage = event => {
        event.preventDefault()
        this.child.current.closeModal()
        let data = new FormData();
        data.append('i', 'sms_new');
        data.append('contacto', this.props.info.id);
        data.append('id', "0");
        data.append('f', moment().format('MM/DD/YYYY'));
        data.append('h', moment().format('HH:mm'));
        data.append('sms', this.state.message);
        data.append('asunto', this.state.title);
        data.append('e', token);
        axios.post('https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_tracking.php', data)
            .then(res => {
                this.props.updateSms()
            })
    }


    render() {
        return (
            <div className='contactdetails-block' id='contactdetails-sms-id'>
                <form>
                    <div>
                        <div>Sms</div>
                        <div id='contactdetails-sms-enviar'><button type='button' onClick={this.openModalSms}>Enviar Mensaje</button></div>
                    </div>
                    {this.props.smss !== false ? (
                        <div className='contactdetails-sms-container' id='contactdetails-sms-scroll'>

                            {this.props.smss.map((sms, index) => (
                                <div key={index}>
                                    <div>{sms.asunto}</div>
                                    <div>{sms.mensaje}</div>
                                    <div>{sms.nombre_vendedor}</div>
                                    <div>{moment(sms.fecha_mensaje).format('MM/DD/YYYY')}</div>
                                    <div>{moment(sms.hora_mensaje, 'HH:mm').format('A hh:mm')}</div>
                                </div>
                            ))}

                        </div>
                    ) : <div id='contactdetails-sms-noitems'>No tiene ningun mensaje <i className="far fa-folder-open"></i></div>}
                </form>
                <ModalSms
                    ref={this.child}
                >
                    <form onSubmit={this.sendMessage}>
                        {this.state.enableInfo === true ? (
                            <div className='contactdetails-sms-modal'>
                                <div>Enviar Mensaje</div>
                                <div>{this.props.info.nombre} {this.props.info.apellido}</div>
                                <div>{moment().format('MM/DD/YYYY')} {moment().format('hh:mm a')}</div>
                                <div>
                                    <select value={this.state.template} onChange={this.handleChangeTem}>
                                        <option disabled value='default'>Templates</option>
                                        {this.state.details.templates.map((template, index) => (
                                            <option key={index} value={template.id}>{template.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <select value={this.state.language} onChange={this.handleChangeLan}>
                                        <option value="1">Español</option>
                                        <option value="2">Ingles</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Asunto</label>
                                    <input
                                        value={this.state.title}
                                        onChange={this.handleInputChange}
                                        name='title'
                                    />
                                </div>
                                <div>
                                    <label>Mensaje</label>
                                    <textarea
                                        value={this.state.message}
                                        onChange={this.handleInputChange}
                                        name='message'
                                        rows='4'
                                    />
                                </div>
                                <div><button type='submit' >Enviar</button></div>
                            </div>
                        ) : null}
                    </form>
                </ModalSms>
            </div>
        )
    }
}

export default CONTACTDETAILS_SMS