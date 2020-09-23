import React, { Component } from 'react';
import ModalConfirmation from '../../Global;Comp/MoldalConfirmation';
import './style.css';
import axios from 'axios';


const token = ("; " + document.cookie).split("; s4book_id_user=").pop().split(";").shift()
class CONTACTDETAILS_ENDFUNCT extends Component {

    constructor(props){
        super(props)
        this.child = React.createRef();
    }

    openDeleteConfirmation = () => {
        this.child.current.openModal()
    }

    deleleContact = () => {
        axios.post(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php?i=delete&contacto=${this.props.info.id}&e=${token}`)
        .then(res => {
            if(res.data === 1){
                this.props.history.goBack()
            } else {
                this.child.current.closeModal()
            }
        })

    }


    render() {
        return (
            <div>
                <div className='contactdetails-endfunctionality'>
                    <div><button type='button' onClick={this.openDeleteConfirmation}>Borrar Contacto</button></div>
                </div>
                <ModalConfirmation
                    ref={this.child}
                    text='Estas seguro que quieres borrar esta contacto ?'
                    delete={this.deleleContact}
                />

            </div>
        )
    }
}

export default CONTACTDETAILS_ENDFUNCT