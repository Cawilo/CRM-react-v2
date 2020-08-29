import React, { Component } from 'react';
import './style.css'
import ModalImage from '../ModalImage';
import axios from 'axios'

const token = ("; " + document.cookie).split("; s4book_id_user=").pop().split(";").shift()
class CONTACTDETAILS_IMAGES extends Component {

    constructor(props) {
        super(props)
        this.child = React.createRef();
        this.state = {
            toSaveImage: [],

            imgText: ''
        }

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    grabImage = (event) => {
        console.log(event.currentTarget)
        console.log(event.target.files[0].name)
        //const { name } = event.currentTarget;
        let imgobj = {
            nombre: event.target.files[0].name,
            data: '',
        }
        //console.log(event.target.files[0])
        //let images = []
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var maxW = 600;
        var maxH = 600;
        // eslint-disable-next-line
        var img = new Image;
        img.onload = () => {
            var iw = img.width;
            var ih = img.height;
            var scale = Math.min((maxW / iw), (maxH / ih));
            var iwScaled = iw * scale;
            var ihScaled = ih * scale;
            canvas.width = iwScaled;
            canvas.height = ihScaled;
            ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
            imgobj.data = canvas.toDataURL("image/jpeg", 0.5)

            this.setState({ toSaveImage: imgobj }, this.child.current.openModal())
            //this.child.current.openModal()
            // console.log(name)


        }
        img.src = URL.createObjectURL(event.target.files[0]);





    }

    closeModalImg = () => {
        setTimeout(() => {
            let canvas = document.getElementById('canvas')
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.setState({ imgText: "", toSaveImages: [] })
            document.getElementById('file-upload').value = null
        }, 500);
    }

    saveImage = () => {
        
        let img = [{
            nombre: this.state.toSaveImage.nombre,
            not: this.state.imgText,
            data: this.state.toSaveImage.data
        }]
        var data = new FormData();
        data.append('i', 'img');
        data.append('contacto', this.props.infoCont.id);
        data.append('img', JSON.stringify(img));
        data.append('e', token);
        axios.post("https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_contacts.php", data)
            .then(res => {
                this.props.updateImgs()
            })
        this.child.current.closeModal()
        
        setTimeout(() => {
            var canvas = document.getElementById("canvas");
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.setState({ toSaveImages: [], imgText: "" })
        }, 500);
    }

    render() {
        return (
            <div className='contactdetails-block'>
                <form>
                    <div>
                        <div>Imagenes</div>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <i className="fas fa-camera fa-2x"></i>
                        </label>
                        <input id="file-upload" type="file" name="image" accept="image/*" onChange={this.grabImage} />
                    </div>
                    <div>
                        {this.props.info.map((img, index) => (
                            <div key={index} className='contactdetails-images'>
                                <div>{img.texto}</div>
                                <img alt='img' className='contactdetails-img' src={`http://topturfmiami.system4book.com/repositorio/img/${img.nombre}`} />
                            </div>
                        ))}
                    </div>
                </form>
                <ModalImage
                    ref={this.child}
                    closeModalImg={this.closeModalImg}
                >
                    <div>
                        <div className='contactdetails-modal-editor'>
                            <textarea
                                value={this.state.imgText}
                                onChange={this.handleInputChange}
                                name='imgText'
                            />
                            <button onClick={this.saveImage}>Guardar</button>
                        </div>
                        <canvas onClick={this.closeModalImg} id="canvas"></canvas>
                    </div>
                </ModalImage>
            </div>
        )
    }
}

export default CONTACTDETAILS_IMAGES