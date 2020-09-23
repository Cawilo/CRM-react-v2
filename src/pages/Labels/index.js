import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

const token = ("; " + document.cookie).split("; s4book_id_user=").pop().split(";").shift();
class Labels extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            tags: [0]
        }

        this.handleChangePro = this.handleChangePro.bind(this);
    }


    componentDidMount = () => {
        this.populatedProducts()
    }

    populatedProducts = () => {
        axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_products.php?i=labels&e=${token}`)
            .then(res => {
                this.setState({ products: res.data })
            })
    }

    addtag = () => {
        let tags = this.state.tags
        tags.push(tags.length)
        this.setState({ tags: tags })

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleChangePro(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value })

    }

    deleteTag = (tagD) => {
        let tags = this.state.tags
        let nonumber = true
        tags.splice(tagD, 1, "dwa")
        this.setState({ tags: tags, [`weight${tagD}`]: undefined })
        for (let i = 0; i < tags.length; i++) {
            if (typeof tags[i] === "number") {
                nonumber = false
            }
        }
        if (nonumber === true) {
            this.addtag(0)
        }
    }

    generetePDF = (event) => {
        event.preventDefault()
        let etq = []
        //let obj = `[[${this.state.weight0},${this.state.length0},%22${this.state.product0}%22]]`
        for (let i = 0; i < this.state.tags.length; i++) {
            etq.push([])
            etq[i].push(this.state[`weight${i}`], this.state[`length${i}`], this.state[`product${i}`])
        }

        for (let i = 0; i < etq.length; i++) {


            if (etq[i][0] === undefined) {
                etq[i][0] = "not"
            }

        }

        let cmp = []
        for (let i = 0; i < etq.length; i++) {
            if (etq[i][0] !== "not") {
                cmp.push(etq[i])
            }
        }

        let js = JSON.stringify(cmp)


        window.location.href = `http://topturfmiami.system4book.com/php/etiquetas.php?prod=${js}`
    }

    render() {
        return (
            <div>
                <div className="labels-container">
                    <form onSubmit={this.generetePDF}>
                        {this.state.tags.filter(tag => typeof tag === "number").map((tag, index) => (
                            <div key={index} id={tag} className="labels-adjust">
                                <div>
                                    <label>Width</label>
                                    <br />
                                    <input
                                        required
                                        value={this.state[`weight${tag}`] || ""}
                                        onChange={this.handleInputChange}
                                        name={`weight${tag}`}
                                    />
                                </div>
                                <div>
                                    <label>Length</label>
                                    <br />
                                    <input
                                        required
                                        value={this.state[`length${tag}`] || ""}
                                        onChange={this.handleInputChange}
                                        name={`length${tag}`}
                                    />
                                </div>
                                <div>
                                    <label>Product</label>
                                    <select required value={this.state[`product${tag}`] || ""} name={`product${tag}`} onChange={this.handleChangePro}>
                                        <option value="" disabled="disabled" hidden="hidden"></option>
                                        {this.state.products.map((product, index) => (
                                            <option key={index} value={product.nombre}>{product.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                <button onClick={() => this.deleteTag(tag)} type="button" className="labels-delete">
                                    <svg className="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
                                    </svg>
                                </button>
                                </div>
                            </div>
                        ))}
                        <div className="labels-print">
                            <button onClick={this.addtag} type="button">
                                <svg className="bi bi-plus" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
                                    <path fillRule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z" />
                                </svg>
                            </button>
                            <button type="submit">
                                <svg className="bi bi-file-earmark-break" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M9 1H4a2 2 0 0 0-2 2v6h1V3a1 1 0 0 1 1-1h5v2.5A1.5 1.5 0 0 0 10.5 6H13v3h1V6L9 1zm5 11h-1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1H2v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1zM0 10.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default Labels