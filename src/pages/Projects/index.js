import React, { Component } from 'react';
import axios from 'axios';
import './style.css';
import PROJECTS_INFO from '../../components/Projects;Comp/Info';
import LoadingBlock from '../../components/Projects;Comp/LodingBlock';
import NoItems from '../../components/Projects;Comp/NoItems';

const token = ("; " + document.cookie).split("; s4book_id_user=").pop().split(";").shift();
class Projects extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: this.props.match.params.date,
            projects: []
        }
    }

    componentDidMount = () => {
        this.searchProjects()
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        }, this.adjust);
    };

    adjust = () => {
        this.props.history.replace(`/proyectos/${this.state.date}`)
        this.searchProjects()
    }



    searchProjects = () => {
        this.setState({ projects: [] })
        let projs = []
        axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_labor.php?i=labor&f=${this.state.date}&e=${token}`)
            .then(res => {
                console.log(res.data)
                if (res.data === 5) return this.setState({ projects: false })
                console.log(res.data)
                for (let i = 0; i < res.data[0].length; i++) {
                    let obj = {
                        id_project: res.data[0][i].id,
                        id_labor: res.data[0][i].id_labor,
                        type: res.data[0][i].tipo,
                    }
                    projs.push(obj)

                }
                this.updateProjects(projs)


            })
    }

    updateProjects = (projs) => {
        let p = []
        for (let i = 0; i < projs.length; i++) {

            axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_labor.php?i=proyecto&p=${projs[i].id_project}&f=${this.state.date}&tipo=${projs[i].type}&id_labor=${projs[i].id_labor}&e=${token}`)
                .then(res => {
                    console.log(res.data)
                    let vehiculos = res.data[1]
                    let productos = res.data[2]
                    console.log(productos)
                    for (let v = 0; v < vehiculos.length; v++) {
                        vehiculos[v].productos = []
                        for (let e = 0; e < productos.length; e++) {
                            if (productos[e].id_vehiculo === vehiculos[v].id_vehiculo) {
                                if (!productos[e].cantidad) productos[e].cantidad = '000'
                                vehiculos[v].productos.push(productos[e])

                                //console.log(productos[e].cantidad)

                                if (vehiculos[v].productos[e].cantidad.slice(-2) === "00") {
                                    vehiculos[v].productos[e].cantidad = vehiculos[v].productos[e].cantidad.substring(0, vehiculos[v].productos[e].cantidad.length - 3);
                                }

                            }
                        }
                    }
                    let trabajadores = res.data[3]
                    for (let i = 0; i < trabajadores.length; i++) {
                        if (trabajadores[i].foto === null || trabajadores[i].foto === "jpg") {
                            trabajadores[i].foto = "20180529120500.jpg"
                        }
                    }

                    let imagenes = res.data[6]
                    if (imagenes[0].id === "0") {
                        imagenes = []
                        res.data[6] = imagenes
                    }
                    p.push(res.data)
                    this.setState({ projects: p })
                    //console.log(this.state.projects)
                })
            //console.log(i)


        }


    }

    render() {
        return (
            <div className='project-container'>
                <div className='project-nav'><input type='date' value={this.state.date} onChange={this.handleInputChange} name='date' /></div>
                {this.state.projects.length ? (
                    this.state.projects.map((project, index) => (
                        <div className='projects-project' key={index}>
                            <PROJECTS_INFO info={project} index={index}/>
                        </div>
                    ))
                ) : this.state.projects === false ? (<NoItems />) : (
                    Array.apply(null, { length: 4 }).map((e, i) => (
                        <div className='projects-project' key={i}>
                            <LoadingBlock />
                            <LoadingBlock />
                            <LoadingBlock />
                            <LoadingBlock />
                            <LoadingBlock />
                        </div>
                    ))

                )}
            </div>
        )
    }
}

export default Projects