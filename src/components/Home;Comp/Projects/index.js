import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import './style.css';
import NoItems from '../NoItems';
import LoadingBlock from '../LodingBlock';
import SeeMore from '../SeeMore';

const token = ("; " + document.cookie).split("; s4book_id_user=").pop().split(";").shift();
class HOME_PROJECTS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: moment().format('YYYY-MM-DD').toString(),
            projects: []
        }
    }

    componentDidMount = () => {
        this.updateProjects()
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        }, this.updateProjects);
    };

    updateProjects = () => {
        this.setState({projects: []})
        axios.get(`https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_labor.php?i=labor&f=${this.state.date}&e=${token}`)
            .then(res => {
                if (res.data === 5) return this.setState({ projects: false })
                this.setState({ projects: res.data[0] })
            })
    }

    openGoogleMaps = event => {
        event.stopPropagation()
        window.location.href=`https://www.google.com/maps/search/${event.currentTarget.getAttribute('value')}`
    }

    goProject = event => {
        let date = new Date();
        date.setTime(date.getTime() + (8000));
        let expiry = '; expires=' + date.toUTCString();
        document.cookie = `projectScroll=${event.currentTarget.attributes.id.value}${expiry}; path=/`
        this.props.history.push(`/proyectos/${event.currentTarget.attributes.date.value}`)
    }


    render() {
        return (
            <div className='container-block'>
                <div>
                    <div className='container-block-title' onClick={()=>this.props.history.push('/proyectos/'+moment().format('YYYY-MM-DD').toString())}>Proyectos</div>
                    <div className='container-block-extra'><input
                        type='date'
                        value={this.state.date}
                        onChange={this.handleInputChange}
                        name='date'
                    /></div>
                </div>
                <div className='container-block-projects'>
                    {this.state.projects.length ? (
                        this.state.projects.slice(0, 5).map((project, index) => (
                            <div key={index} className='container-block-projects-p' date={this.state.date} id={project.id} onClick={this.goProject}>
                                <div>{project.invoice}</div>
                                <div>{project.nombre_contacto}</div>
                                <div value={project.direccion} onClick={this.openGoogleMaps}><i className="fas fa-map-marker-alt fa-2x"></i></div>
                            </div>
                        ))
                    ):this.state.projects === false ? (<NoItems />):(
                        <div>
                            <LoadingBlock/>
                            <LoadingBlock/>
                            <LoadingBlock/>
                            <LoadingBlock/>
                            <LoadingBlock/>
                        </div>
                    )}
                    
                </div>
                {this.state.projects.length ? (<SeeMore history={this.props.history} page='proyectos' value={this.state.date}/>):(null)}
            </div>
        )
    }
}

export default HOME_PROJECTS