import React, { Component } from 'react';
import CONTACTS_INFO from '../../components/Contacts;Comp/Info';
import LoadingBlock from '../../components/Contacts;Comp/LoadingBlock';
import NoItems from '../../components/Contacts;Comp/NoItems';
import axios from 'axios'
import './style.css';

const token = ("; " + document.cookie).split("; s4book_id_user=").pop().split(";").shift()
class Contacts extends Component {


    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            contacts: [],
            user: this.props.user,
            date: this.props.match.params.date,
            options: [],
            selected: this.props.match.params.seller,
            buscar: '',
            disable: false
        }
    }

    componentDidMount = () => {
        this.populateSelect()
    }



    handleInputChangeBucar = event => {
        clearTimeout(this.timer);
        const { name, value } = event.target;
        this.setState({
            [name]: value
        }, this.setUpdateTime)
    };

    setUpdateTime = () => {
        this.timer = setTimeout(() => {
            this.updateContacts()
        }, 1000);
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        }, this.adjustUrl);
    };

    handleInputChangeDate = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        }, this.adjustUrl)
    };

    adjustUrl = () => {
        this.props.history.replace(`/contactos/${this.state.date}/${this.state.selected}`)
        this.updateContacts()
    }

    populateSelect = () => {
        axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=ven&e=${token}`)
            .then(res => {
                // console.log('/////Sellers////')
                //console.log(res.data)

                for (let i = 0; i < res.data.length; i++) { if (this.state.user.id === res.data[i].id) this.setState({ selected: this.state.user.id }) }
                this.setState({ options: res.data })
                this.updateContacts()
            })
    }

    

    updateContacts = () => {
        this.setState({ contacts: [] })
        let t = this.state.date
        if (this.state.buscar) t = ''
        if (this.state.user.id_rol_verf === 'seller') this.setState({ selected: this.state.user.id })
        axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=grid&f1=${t}&f2=${this.state.date}&ven=${this.state.selected}&text=${this.state.buscar}&e=${token}`)
            .then(res => {
                // console.log('////Contacts////')
                console.log(res.data)
                if (res.data === 0) return this.setState({ contacts: false })
                for (let i = 0; i < res.data.length; i++) {
                    let phone = this.formatPhoneNumber(res.data[i].telefono)
                    res.data[i].telefono = phone

                    let seller = this.assignSeller(res.data[i].id_vendedor)
                    res.data[i].id_vendedor = seller
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

    render() {
        return (
            <div>
                <div className='contacts-nav'>
                    <input
                        type='text'
                        placeholder='Buscar'
                        value={this.state.buscar}
                        onChange={this.handleInputChangeBucar}
                        name='buscar'
                        onFocus={() => this.setState({ disable: true })}
                        onBlur={() => this.setState({ disable: false })}
                    />
                    <input
                        type='date'
                        value={this.state.date}
                        onChange={this.handleInputChangeDate}
                        name='date'
                    />
                    {this.state.user.id_rol_verf === 'admin' ? (
                        <select value={this.state.selected} name='selected' onChange={this.handleInputChange}>
                            <option value='todos'>Todos</option>
                            {this.state.options.map((option, index) => (
                                <option key={index} value={option.id}>{option.nombre}</option>
                            ))}
                        </select>
                    ) : (
                            <div>{this.state.user.nombre}</div>
                        )}

                </div>
                {this.state.contacts.length ? (
                    <CONTACTS_INFO
                        contacts={this.state.contacts}
                        disable={this.state.disable}
                        history={this.props.history}
                    />
                ) : this.state.contacts === false ? (<NoItems/>) : (

                    <div className='contacts-loadingblock'>
                        <LoadingBlock />
                        <LoadingBlock />
                        <LoadingBlock />
                        <LoadingBlock />
                        <LoadingBlock />
                    </div>


                )}
            </div>
        )
    }




}

export default Contacts