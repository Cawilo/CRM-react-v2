import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { loadProgressBar } from 'axios-progress-bar';
import './App.css';
import axios from 'axios';
//Navs
import NavTop from './components/Nav;Comp/NavTop';
import NavSide from './components/Nav;Comp/NavSide';
//Pages auth
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contacts from './pages/Contacts';
import ContactDetails from './pages/ContactDetails';
import Appointments from './pages/Appointments';
//Pages notauth
import Login from './pages/Login';
import ForgotPass from './pages/ForgotPass';

const token = ("; " + document.cookie).split("; s4book_id_user=").pop().split(";").shift();
document.addEventListener("touchstart", function () { }, true)
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null,
      user: {}
    }
  }

  componentDidMount = () => {
    loadProgressBar();
    this.authKey()

  }



  authKey = () => {
    axios.post("https://afternoon-stream-55694.herokuapp.com/http://topturfmiami.system4book.com/services/service_mobile.php/?i=g&e=" + token)
      .then(res => {
        console.log(res.data)
        // res.data.id_rol = '1'
        // res.data.id = '158'
        if (typeof res.data === "object" && res.data.usuario) {
          if (res.data.id_rol === '1' || res.data.id_rol === '2') {
            res.data.id_rol_verf = 'admin'
          } else if (res.data.id_rol === '3') {
            res.data.id_rol_verf = 'seller'
          } else { res.data.id_rol_verf = 'worker' }
          this.setState({ isAuthenticated: true, user: res.data })
        } else {
          this.setState({ isAuthenticated: false })
        }
      })
  }

  openSide = () => {
    document.querySelector(".navSide").style.width = "10em"
    document.querySelector(".overlaySide").style.display = "block"
    setTimeout(function () {
      document.querySelector(".overlaySide").style.background = 'rgba(0, 0, 0, 0.1)'

      document.querySelector(".overlaySide").style['-webkit-backdrop-filter'] = 'blur(2px)'
      document.querySelector(".overlaySide").style.backdropFilter = 'blur(2px)'
    }, 100);
  }

  closeSide = () => {
    document.querySelector(".navSide").style.width = "0"
    document.querySelector(".overlaySide").style.background = 'rgba(0, 0, 0, 0.0)'
    document.querySelector(".overlaySide").style['-webkit-backdrop-filter'] = 'blur(2px)'
    document.querySelector(".overlaySide").style.backdropFilter = 'blur(0px)'
    setTimeout(function () { document.querySelector(".overlaySide").style.display = "none" }, 200);

  }



  Authenticated = () => (
    <Route>
      <NavTop
        openSide={this.openSide}
        title={window.location.pathname.split('/')[1]}
      />
      <NavSide
        closeSide={this.closeSide}
        user={this.state.user}
      />
      <div className='container'>
        <Switch>
          <Route exact path='/proyectos/:date' component={Projects} />

          <Route exact path='/contactos/detalles/:id' render={(props) => (
            this.state.user.id_rol_verf !== 'worker' ? (
              <ContactDetails {...props} user={this.state.user} />
            ) : (<Redirect to='/' />)
          )} />

          <Route exact path='/contactos/:date/:seller' render={(props) => (
            this.state.user.id_rol_verf !== 'worker' ? (
              <Contacts {...props} user={this.state.user} />
            ) : (<Redirect to='/' />)
          )} />

          <Route exact path='/citas' render={(props) => (
            this.state.user.id_rol_verf !== 'worker' ? (
              <Appointments {...props} user={this.state.user} />
            ) : (<Redirect to='/' />)
          )} />

          <Route exact path='/' render={(props) => (
            <Home {...props} user={this.state.user} />
          )} />

          <Redirect from='*' to='/' />
        </Switch>
      </div>
    </Route>
  )

  NotAuthenticated = () => (
    <div className='container'>

      <Switch>
        <Route exact path='/login/recuperar/:code' component={ForgotPass} />
        <Route exact path='/login' component={Login} />
        <Redirect from='*' to='/login' />
      </Switch>

    </div>
  )




  render() {
    return (
      <Router>
        <Switch>
          {this.state.isAuthenticated === true ? (
            <Route component={this.Authenticated} />
          ) : this.state.isAuthenticated === false ? (
            <Route component={this.NotAuthenticated} />
          ) : null}
        </Switch>
      </Router>
    )
  }



}




export default App;
