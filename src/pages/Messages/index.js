import React, { Component } from 'react';
import axios from 'axios';
// eslint-disable-next-line
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './style.css';
// import { loadProgressBar } from 'axios-progress-bar'


const axiosWithoutProgress = axios.create()




const token = ("; " + document.cookie).split("; s4book_id_user=").pop().split(";").shift();
class Messages extends Component {

    constructor(props) {
        super(props)
        this.timer = null;
        this.state = {
            messages: [],

            scroolAdj: true
        }
    }


    componentDidMount = () => {
        this.updateMessages()
        this.timer = setInterval(() => {
            this.updateMessages()
        }, 3000);
        
        
    }

    componentWillUnmount = () => {
        clearTimeout(this.timer);
    }

    

    updateMessages = () => {
        
        axiosWithoutProgress.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_message.php?i=msg&e=${token}`)
            .then(res => {
                console.log(res.data)
                this.setState({ messages: res.data })
                if(this.state.scroolAdj === true) {
                    
                    this.scrollToBottom();
                    this.setState({scroolAdj: false})
                }
            })
    }





    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: 'auto' });
    }


    render() {
        return (
            <div className='messages'>
                <div className='messages-container'>
                    {this.state.messages.map((msg, index) => (
                        <div key={index} className={`msg ${this.props.user.id === msg.id_trabajador ? 'msg-yours':''}`}>
                            <div>{msg.nombre_trabajador}</div>
                            <div>{ReactHtmlParser(msg.mensaje)}</div>
                        </div>
                    ))}

                </div>
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
                <div className='messages-sender'>
                    <input
                        onFocus={() => setTimeout(() => {
                            this.scrollToBottom()
                        }, 150)}
                    />
                    <button>Send</button>
                </div>
            </div>
        )
    }



}

export default Messages
