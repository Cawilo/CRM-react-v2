import React, { Component } from 'react'
// eslint-disable-next-line
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
// import Modal from '../../Global;Comp/Modal';
import './style.css'


class PROJECTS_INFO extends Component {

    constructor(props) {
        super(props)
        this.child = React.createRef();
        this.state = {
            toSaveImage: [],

            ImgProyecto: '',

        }
    }

    copyDirection = (event) => {
        var textField = document.createElement('textarea')
        textField.innerText = event.currentTarget.value
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }

    grabImage = (event) => {
        console.log(event.currentTarget)
        const { name } = event.currentTarget;
        let imgobj = {
            nombre: event.target.files[0].name,
            data: '',
        }
        //console.log(event.target.files[0])
        let images = []
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
            images.push(imgobj)
            this.setState({ toSaveImage: images, ImgProyecto: name }, this.openModal)
            // console.log(name)
            

        }
        img.src = URL.createObjectURL(event.target.files[0]);
        

    }

    openModal = () => {
        console.log(this.state.ImgProyecto)
        this.child.current.openModal();
    }

    
    

    render() {
        return (
            <div className='project-info'>
                <div>
                    <div className='projectSection'>
                        <div>Invoice</div>
                        <div>{this.props.info[0][0].invoice}</div>
                    </div>
                    <div className='projectSection'>
                        <div>Proyecto</div>
                        <div>{this.props.info[0][0].nombre_contacto} {this.props.info[0][0].apellido_contacto}</div>
                    </div>
                </div>
                <div className='projectSection'>
                    <div>Vendedor</div>
                    <div>{this.props.info[0][0].nombre_vendedor}</div>
                </div>
                <div className='projectSection'>
                    <div>Vehiculos</div>

                    {this.props.info[1].map((vehicle, index) => (
                        <div key={index} className={vehicle.id !== '0' ? 'project-vehicle' : null}>
                            <div>
                                {vehicle.id !== '0' ? (<img src="http://topturfmiami.system4book.com/img/iconos/tru.png" className="truckImage" alt="truck" />) : null}
                                <div>{vehicle.marca} {vehicle.modelo}</div>
                            </div>
                            {vehicle.productos.map((producto, index) => (
                                producto.id !== '0' ? (
                                    <div key={index} className='project-products' style={producto.planificacion === '1' ? { background: '#29851b' } : { background: '#1e649e' }}>
                                        <div>
                                            <div>{producto.cantidad}</div>
                                            <div>{producto.planificacion === '2' ? (Math.round((producto.cantidad / 0.6) * 10) / 10) : (null)}</div>
                                        </div>
                                        <div className='project-product-name'>{producto.nombre_producto}</div>

                                    </div>
                                ) : null
                            ))}
                        </div>
                    ))}
                </div>
                <div className='projectSection'>
                    <div>Direccion</div>
                    <div className='project-direction'>
                        <a href={`https://www.google.com/maps/search/${this.props.info[0][0].direccion}`}>{this.props.info[0][0].direccion}</a>
                        {this.props.info[0][0].direccion ? (
                            <div>
                                <button value={this.props.info[0][0].direccion} onClick={this.copyDirection}><i className="fas fa-copy"></i></button>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className='projectSection'>
                    <div>Labor</div>
                    {this.props.info[3].map((labor, index) => (
                        <div key={index} className='project-labor'>
                            <img alt='labor' src={`http://topturfmiami.system4book.com/repositorio/usuarios/${labor.foto}`} />
                            <div>{labor.nombre}</div>
                        </div>
                    ))}
                </div>
                <div className='projectSection'>
                    <div>Block</div>
                    <div className='project-block'>{ReactHtmlParser(this.props.info[0][0].block)}</div>
                </div>
                <div className='projectSection'>
                    <div>Imagenes</div>
                    {this.props.info[6].map((img, index) => (
                    <div key={index} className='project-image'>
                        <div>{img.texto}</div>
                        <img alt='img' src={`http://topturfmiami.system4book.com/repositorio/img/${img.nombre}`}/>
                    </div>
                    ))}
                    {/* <label htmlFor="file-upload"  className="custom-file-upload"  >
                        <i className="fas fa-camera fa-2x"></i>
                    </label>
                    <input id="file-upload" type="file" accept="image/*" name={this.props.info[0][0].nombre_contacto} onChange={this.grabImage} /> */}
                </div>
                {/* <Modal
                    ref={this.child}
                >
                    <div className='project-images-modal'>
                        <div>Proyecto: {this.props.p}</div>
                        <textarea id='project-images-modal-textarea'/>
                        <canvas style={{ width: '100%' }} id="canvas"></canvas>
                    </div>
                </Modal> */}
            </div>
        )
    }
}

export default PROJECTS_INFO