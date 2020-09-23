import React, { Component } from 'react';
import './style.css'


const weeks = [19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]

let years = []
let anoActual = new Date().getFullYear()
for(let i=0; i<8;i++){
    years.push(anoActual - [i])
}

class Pay extends Component {

    constructor(props) {
        super(props)
        this.state = {
            valueYear: '',
            valueWeek: '',
            pays: []
        }

        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangeWeek = this.handleChangeWeek.bind(this);
    }

    handleChangeYear(event) {
        this.setState({valueYear: event.target.value});
        
    }
    handleChangeWeek(event) {
        this.setState({valueWeek: event.target.value});
        
    }


    render() {
        return (
            <div>
                <form>
                    <div className='pay-adjuster'>
                        <select className="dropDownPay" value={this.state.valueYear} onChange={this.handleChangeYear} required disabled={this.state.inputDisable}>
                            <option value="" disabled="disabled" hidden="hidden">Año</option>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <select className="dropDownPay" value={this.state.valueWeek} onChange={this.handleChangeWeek} required disabled={this.state.inputDisable}>
                            <option value="" disabled="disabled" hidden="hidden">Semana</option>
                            {weeks.map(week => (
                                <option key={week} value={week}>{week}</option>
                            ))}
                        </select>

                        {/* <button type="submit" id="submitConsultar" disabled={this.state.inputDisable}>Consultar</button> */}
                    </div>
                </form>
            </div>
        )
    }


}

export default Pay