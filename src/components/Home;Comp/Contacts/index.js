import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'
import './style.css';
import NoItems from '../NoItems';
import LoadingBlock from '../LodingBlock';
import SeeMore from '../SeeMore';

const token = ("; " + document.cookie).split("; s4book_id_user=").pop().split(";").shift();
class HOME_CONTACTS extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contacts: [],
            date: moment().format('YYYY-MM-DD').toString(),

            user: this.props.user,

            options: [],
            selected: 'todos'
        }
    }

    componentDidMount = () => {
        console.log(this.state.user)
        this.populateSelect()
        // console.log(this.state.user.id)
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        }, this.updateContacts);
    };

    populateSelect = () => {
        axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=ven&e=${token}`)
            .then(res => {
                // console.log('/////Sellers////')
                // console.log(res.data)
                for (let i = 0; i < res.data.length; i++) { if (this.state.user.id === res.data[i].id) this.setState({ selected: this.state.user.id }) }
                this.setState({ options: res.data })
                this.updateContacts()
            })
    }

    updateContacts = () => {
        this.setState({ contacts: [] })
        if (this.state.user.id_rol_verf === 'seller') this.setState({ selected: this.state.user.id })
        axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=grid&f1=${this.state.date}&f2=${this.state.date}&ven=${this.state.selected}&text=&e=${token}`)
            .then(res => {
                console.log('////Contacts////')
                console.log(res.data)
                if (res.data === 0) return this.setState({ contacts: false })
                for (let i = 0; i < res.data.length; i++) {
                    let telefono = this.formatPhoneNumber(res.data[i].telefono)
                    res.data[i].telefono = telefono
                }
                this.setState({ contacts: res.data })
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

    goPage = event => {
        console.log(event.currentTarget.attributes.value.value)
        this.props.history.push(`/contactos/detalles/${event.currentTarget.attributes.value.value}`)
    }

    render() {
        return (
            <div className='container-block'>
                <div>
                    <div className='container-block-title'>Contactos</div>
                    <div className='container-block-extra'>
                        {this.state.user.id_rol_verf === 'admin' ? (
                            <select value={this.state.selected} onChange={this.handleInputChange} name='selected'>
                                <option value='todos'>Todos</option>
                                {this.state.options.map((option, index) => (
                                    <option key={index} value={option.id}>{option.nombre}</option>
                                ))}
                            </select>
                        ) : <div>{this.state.user.nombre}</div>}
                    </div>
                </div>
                <div className='container-block-contacts'>
                    {this.state.contacts.length ? (
                        this.state.contacts.slice(0, 5).map((contact, index) => (
                            <div key={index} className='container-block-contacts-c' value={contact.id} onClick={this.goPage}>
                                <div>{contact.nombre} {contact.apellido}</div>
                                <a href={`tel:${contact.telefono}`}>{contact.telefono}</a>
                                <div>{contact.status}</div>
                            </div>
                        ))
                    ) : this.state.contacts === false ? (<NoItems />) : (
                        <div>
                            <LoadingBlock />
                            <LoadingBlock />
                            <LoadingBlock />
                            <LoadingBlock />
                            <LoadingBlock />
                        </div>
                    )}
                    {this.state.contacts.length ? (<SeeMore history={this.props.history} page={`contactos`} value={`${this.state.date}/${this.state.selected}`} />) : (null)}
                </div>
            </div>
        )
    }
}

export default HOME_CONTACTS    