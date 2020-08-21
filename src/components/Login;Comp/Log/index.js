import React, { Component } from 'react';
import './style.css'
import axios from 'axios';

class LOGIN_LOG extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',

            validate: false,
            disable: false
        }
    }

    login = (event) => {
        event.preventDefault();
        this.setState({disable: true})
        axios.post("https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_mobile.php/?i=l&usuario=" + this.state.username + "&clave=" + this.state.password)
            .then(res => {
                if (res.data === 1 || res.data === 2 || res.data === 3) {
                    this.setState({ validate: true, disable: false })
                } else {
                    console.log(res.data)
                    let date = new Date();
                    date.setTime(date.getTime() + (149 * 24 * 60 * 60 * 1000));
                    let expiry = '; expires=' + date.toUTCString();
                    document.cookie = `s4book_id_user=${res.data}${expiry}; path=/`
                    window.location.reload()
                }
            })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <form onSubmit={this.login}>
                <div>
                    <input
                        placeholder='Usuario'
                        type='text'
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        name='username'
                        required
                        disabled={this.state.disable}
                        style={this.state.validate ? {outline: "rgb(185, 46, 46) solid 1px"}:null}
                        onClick={()=>this.setState({validate: false})}
                    />
                </div>
                <div>
                    <input
                        placeholder='Clave'
                        type='password'
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        name='password'
                        required
                        disabled={this.state.disable}
                        style={this.state.validate ? {outline: "rgb(185, 46, 46) solid 1px"}:null}
                        onClick={()=>this.setState({validate: false})}
                    />
                </div>
                <div>
                    <button type='submit'>Ingresar</button>
                    <div>
                        <button type='button' onClick={this.props.forgot}>Se te olvidó tu contraseña ?</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default LOGIN_LOG