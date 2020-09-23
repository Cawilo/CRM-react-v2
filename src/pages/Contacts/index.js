import React, { Component } from 'react';
import CONTACTS_INFO from '../../components/Contacts;Comp/Info';
import LoadingBlock from '../../components/Contacts;Comp/LoadingBlock';
import NoItems from '../../components/Contacts;Comp/NoItems';
import axios from 'axios'
import './style.css';
import Modal from '../../components/Global;Comp/Modal';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

const token = ("; " + document.cookie).split("; s4book_id_user=").pop().split(";").shift()
class Contacts extends Component {


    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.timer = null;
        this.state = {
            contacts: [],
            user: this.props.user,
            date: this.props.match.params.date,
            options: [],
            selected: this.props.match.params.seller,
            buscar: '',
            disable: false,


            newName: '',
            newLastName: '',
            newPhone: '',
            newEmail: '',
            newUbication: ''
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


    handleInputChangeNew = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    adjustUrl = () => {
        this.props.history.replace(`/contactos/${this.state.date}/${this.state.selected}`)
        this.updateContacts(0)
    }

    populateSelect = () => {
        axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=ven&e=${token}`)
            .then(res => {

                for (let i = 0; i < res.data.length; i++) { if (this.state.user.id === res.data[i].id) this.setState({ selected: this.state.user.id }) }
                this.setState({ options: res.data })
                this.updateContacts(0)
            })
    }



    updateContacts = value => {
        if(value === 0){this.setState({ contacts: [] })}
        let t = this.state.date
        if (this.state.buscar) t = ''
        if (this.state.user.id_rol_verf === 'seller') this.setState({ selected: this.state.user.id })
        axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=grid&f1=${t}&f2=${this.state.date}&ven=${this.state.selected}&text=${this.state.buscar}&e=${token}`)
            .then(res => {
                //console.log(res.data)
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
        if (value === '0') return 'Ningun Vendedor'
    }

    crearContacto = event => {
        event.preventDefault()
        axios.post("https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=edit&id=0&nombre=" + this.state.newName + "&apellido=" + this.state.newLastName + "&email=" + this.state.newEmail + "&telefono=" + this.state.newPhone + "&direccion=" + this.state.newUbication + "&e=" + token)
            .then(res => {
                this.child.current.closeModal()
                this.updateContacts()
            })
    }

    handleInputDic = newUbication => {
        this.setState({ newUbication });
    };

    handleSelect = newUbication => {
        console.log(newUbication)
        geocodeByAddress(newUbication)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
        this.setState({newUbication: newUbication})
    };

    openAddContact = () => {
        this.setState({
            newName: '',
            newLastName: '',
            newPhone: '',
            newEmail: '',
            newUbication: ''
        })
        this.child.current.openModal()
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
                        pickSeller={()=>this.updateContacts('pick')}
                    />
                ) : this.state.contacts === false ? (<NoItems />) : (

                    <div className='contacts-loadingblock'>
                        <LoadingBlock />
                        <LoadingBlock />
                        <LoadingBlock />
                        <LoadingBlock />
                        <LoadingBlock />
                    </div>


                )}
                <div id='contacts-addcontact' onClick={this.openAddContact}><i className="fas fa-user-plus fa-2x"></i></div>
                <Modal
                    ref={this.child}
                >
                    <form onSubmit={this.crearContacto}>
                        <div className='contacts-addcontact-modal'>
                            <div>Crear Contacto</div>
                            <div>
                                <input
                                    placeholder='Nombre (obligatorio)'
                                    value={this.state.newName}
                                    onChange={this.handleInputChangeNew}
                                    name='newName'
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    placeholder='Apellido'
                                    value={this.state.newLastName}
                                    onChange={this.handleInputChangeNew}
                                    name='newLastName'
                                />
                            </div>
                            <div>
                                <input
                                    placeholder='Telefono (obligatorio)'
                                    value={this.state.newPhone}
                                    onChange={this.handleInputChangeNew}
                                    name='newPhone'
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    placeholder='Email'
                                    value={this.state.newEmail}
                                    onChange={this.handleInputChangeNew}
                                    name='newEmail'
                                />
                            </div>
                            <div>
                                <PlacesAutocomplete
                                    value={this.state.newUbication || ''}
                                    onChange={this.handleInputDic}
                                    onSelect={this.handleSelect}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                            <input
                                                {...getInputProps({
                                                    placeholder: 'Search Places ...',
                                                    className: 'location-search-input input-location-addcont',
                                                })}
                                            />
                                            <div className="autocomplete-dropdown-container-add">
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map((suggestion, index) => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? { backgroundColor: '#bebebe', cursor: 'pointer', color: "black", padding: "0.3em" }
                                                        : { backgroundColor: '#ffffff', cursor: 'pointer', color: "black" };
                                                    return (
                                                        <div key={index}
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            </div>
                            <div>
                                <button type='submit'>Crear</button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }




}

export default Contacts