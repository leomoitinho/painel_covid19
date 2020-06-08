import React from 'react';
import axios from 'axios';

import Estados from './Components/Estados';
import Estado from './Components/Estado';
import Pais from './Components/Brasil';
import Cidades from './Components/Cidades/index';
import Cidades2 from './Components/Cidades/cidade2';
import Cidades3 from './Components/Cidades/cidade3';
import Cidades4 from './Components/Cidades/cidade4';
import Footer from './Components/Footer';

//function App() {
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      estado: "",
      ufs: [],
      cidades: []
    };

    this.onChangeEstado = this.onChangeEstado.bind(this)
    if (localStorage.getItem("myCidade11") === null) {
      localStorage.setItem('myCidade11', JSON.stringify({"state":"RJ"}));
    }
    if (localStorage.getItem("myCidade21") === null) {
      localStorage.setItem('myCidade21', JSON.stringify({"city":"Niteroi"}));
    }
    if (localStorage.getItem("myCidade12") === null) {
      localStorage.setItem('myCidade12', JSON.stringify({"state":"RJ"}));
    }
    if (localStorage.getItem("myCidade22") === null) {
      localStorage.setItem('myCidade22', JSON.stringify({"city":"Niteroi"}));
    }
    if (localStorage.getItem("myCidade13") === null) {
      localStorage.setItem('myCidade13', JSON.stringify({"state":"RJ"}));
    }
    if (localStorage.getItem("myCidade23") === null) {
      localStorage.setItem('myCidade23', JSON.stringify({"city":"Niteroi"}));
    }
    if (localStorage.getItem("myCidade14") === null) {
      localStorage.setItem('myCidade14', JSON.stringify({"state":"RJ"}));
    }
    if (localStorage.getItem("myCidade24") === null) {
      localStorage.setItem('myCidade24', JSON.stringify({"city":"Niteroi"}));
    }
  }

  async componentDidMount() {
    let teste2 = "RJ";
    await axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/'+ teste2 +'')
        .then(res => {
        //const ufs = JSON.stringify([res.data]);
        const ufs = res.data;
        this.setState({ ufs });
      })

      await axios.get('https://brasil.io/api/dataset/covid19/caso/data/?is_last=True&state='+ teste2 +'')
      .then(res => {
        const cidades = res.data.results;
        this.setState({ cidades });
      })
      
  }

  onChangeEstado(event) {
    let estado = event.target.value;
    //let nam = event.target.name;
    //let val = event.target.value;
    //let estado = this.state.uf;
    //this.setState({[nam]: val});
    
    axios.get('https://brasil.io/api/dataset/covid19/caso/data/?is_last=True&state='+ estado +'')
      .then(res => {
        const cidades = res.data.results;
        this.setState({ cidades });
      })
  }

  onChangePainel(event) {
    let estado = event.target.value;
    axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/'+ estado +'')
        .then(res => {
        //const ufs = JSON.stringify([res.data]);
        const ufs = res.data;
        this.setState({ ufs });
      })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Estado estado={this.state.ufs} />
          </div>
          <div className="col">
            <Pais />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Cidades />
            <Cidades2 />
            <Cidades3 />
            <Cidades4 />
          </div>
          <div className="col">
            <Estados />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

//export default App;
