import React from 'react';
import axios from 'axios';

//function App() {
export default class Cidades4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      cidades: [],
      cidades2: [],
      cidades3: [],
      value: ""
    };
    this.onChangeCidade1 = this.onChangeCidade1.bind(this);
  }

  async componentDidMount() {
    let uf = "PR";
    let cid_teste = "Dois Vizinhos";
    //console.log(uf);
    let teste2 = JSON.parse(localStorage.getItem("myCidade24"));
    if (teste2) {
      cid_teste = teste2.city;
    }
    let teste = JSON.parse(localStorage.getItem("myCidade14"));
    if (teste) {
      uf = teste.state;
    }
    
    await axios.get('https://brasil.io/api/dataset/covid19/caso/data/?is_last=True&state='+ uf +'')
      .then(res => {
        const cidades = res.data.results;
        this.setState({ cidades });
      })
      if (localStorage.getItem("myCidade14") === null) {
        localStorage.setItem('myCidade14', JSON.stringify(this.state.cidades));
      }
      
      let cidade1 = this.state.cidades.filter(cid => cid.city === cid_teste);
      
      this.setState({ cidades: cidade1 });
      this.setState({ cidades2: cidade1 });
      this.setState({ cidades3: cidade1 });
  }

  onChangeCidade = e => {
    let estado = e.target.value;
    localStorage.setItem('myCidade14', JSON.stringify({"state":estado}));
    axios.get('https://brasil.io/api/dataset/covid19/caso/data/?is_last=True&state='+ estado +'')
        .then(res => {
        this.setState({ cidades2: res.data.results });
      })
  }

  onChangeCidade1 = e => {
    
    if (localStorage.getItem("myCidade24") === null) {
      localStorage.setItem('myCidade24', JSON.stringify({"city":e.target.value}));
    }
    this.setState({value: e.target.value});
    this.state.cidades2.filter(cid => cid.city === this.state.value);
    
    localStorage.setItem('myCidade24', JSON.stringify({"city":e.target.value}));
        
  }

  render() {
      
      let cid1 = JSON.parse(localStorage.getItem("myCidade24"));
      let state1 = JSON.parse(localStorage.getItem("myCidade14"));
      let C1 = this.state.cidades2.filter(cid => cid.city === cid1.city);
      
      console.log(this.state.cidades3);
    return (
      <div>
      
        <div className="card" style={{ height: '14rem' ,marginTop: '20px' }}>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h2 className="card-title">{cid1.city} <br /> <h6>{state1.state}</h6></h2>
              </div>
              <div className="col-3">
                <select className="form-control" onChange={this.onChangeCidade}>
                  <option value="RJ">--</option>
                  <option>AC</option>
                  <option>AL</option>
                  <option>AM</option>
                  <option>AP</option>
                  <option>BA</option>
                  <option>CE</option>
                  <option>DF</option>
                  <option>ES</option>
                  <option>GO</option>
                  <option>MA</option>
                  <option>MT</option>
                  <option>MS</option>
                  <option>MG</option>
                  <option>PA</option>
                  <option>PB</option>
                  <option>PE</option>
                  <option>PI</option>
                  <option>PR</option>
                  <option>RJ</option>
                  <option>RN</option>
                  <option>RS</option>
                  <option>RO</option>
                  <option>RR</option>
                  <option>SC</option>
                  <option>SP</option>
                  <option>SE</option>
                  <option>TO</option>
                </select>
              </div>
              <div className="col-4">
                <select className="form-control" onChange={this.onChangeCidade1}>
                  <option key="0" value="--">--</option>
                  {this.state.cidades2.map((c, i) => 
                    <option key={i} value={c.city}>{c.city}</option>
                  )}
                </select>
              </div>
            </div>
          </div>
          {C1.map((cid, i) =>
            <div key={i} className="table-responsive">
              <table className="table table-sm text-center">
                <thead>
                  <tr>
                    <td><h4>Casos</h4></td>
                    <td><h4>Mortes</h4></td>
                    <td><h4>População</h4></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><h4>{cid.confirmed}</h4></td>
                    <td><h4>{cid.deaths}</h4></td>
                    <td><h4>{cid.estimated_population_2019}</h4></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        
      </div>
    )
  }
}

//export default App;
