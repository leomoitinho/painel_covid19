import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'; 

export default class Cidades2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false, 
      cidades: [],
      cidades2: [],
      cidades3: [],
      show: false,
      value: ""
    };
    this.onChangeCidade1 = this.onChangeCidade1.bind(this);
  }

  async componentDidMount() {
    let uf = "PR";
    let cid_teste = "Dois Vizinhos";
    //console.log(uf);
    let teste2 = JSON.parse(localStorage.getItem("myCidade22"));
    if (teste2) {
      cid_teste = teste2.city;
    }
    let teste = JSON.parse(localStorage.getItem("myCidade12"));
    if (teste) {
      uf = teste.state;
    }
    
    await axios.get('https://brasil.io/api/dataset/covid19/caso/data/?is_last=True&state='+ uf +'')
      .then(res => {
        const cidades = res.data.results;
        this.setState({ cidades });
      })
      if (localStorage.getItem("myCidade12") === null) {
        localStorage.setItem('myCidade12', JSON.stringify(this.state.cidades));
      }
      
      let cidade1 = this.state.cidades.filter(cid => cid.city === cid_teste);
      
      this.setState({ cidades: cidade1 });
      this.setState({ cidades2: cidade1 });
      this.setState({ cidades3: cidade1 });
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  onChangeCidade = e => {
    let estado = e.target.value;
    localStorage.setItem('myCidade12', JSON.stringify({"state":estado}));
    axios.get('https://brasil.io/api/dataset/covid19/caso/data/?is_last=True&state='+ estado +'')
        .then(res => {
        this.setState({ cidades2: res.data.results });
      })
  }

  onChangeCidade1 = e => {
    
    if (localStorage.getItem("myCidade22") === null) {
      localStorage.setItem('myCidade22', JSON.stringify({"city":e.target.value}));
    }
    this.setState({value: e.target.value});
    this.state.cidades2.filter(cid => cid.city === this.state.value);
    
    localStorage.setItem('myCidade22', JSON.stringify({"city":e.target.value}));
    this.setState({ showing: false });
    this.hideModal();
  }

  Filtros = () => {
    return (
      <div>
        <table className="table">
          <tr>
            <td>
              <p>Estado</p>
              <select className="form-control col" onChange={this.onChangeCidade}>
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
            </td>
            <td>
              <p>Cidade</p>
              <select className="form-control col" onChange={this.onChangeCidade1}>
                <option key="0" value="--">--</option>
                  {this.state.cidades2.map((c, i) => 
                    <option key={i} value={c.city}>{c.city}</option>
                  )}
              </select>
            </td>
          </tr>
        </table>
      </div>
    )
  }

  render() {
    const { showing } = this.state;
    
    let cid1 = JSON.parse(localStorage.getItem("myCidade22"));
    let state1 = JSON.parse(localStorage.getItem("myCidade12"));
    let C1 = this.state.cidades2.filter(cid => cid.city === cid1.city);
      
    //console.log(this.state.cidades3);
    return (
      <div>
        <div className="card" style={{ height: '15rem' ,marginTop: '20px' }}>
          <div className="card-body">
            { showing ? this.Filtros() : null }
            <div className="row">
              <div className="table-responsive col">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td>
                        <h2 className="card-title text-truncate">{cid1.city}</h2><h6>{state1.state}</h6>
                      </td>
                      <td className="text-right">
                          <button className="btn btn-outline-dark" onClick={this.showModal}><span className="material-icons">build</span></button>
                          <Modal show={this.state.show} onHide={this.hideModal}>
                              <Modal.Header closeButton>
                                  <Modal.Title>Escolha a Cidade</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                  <div className="center">{this.Filtros()}</div>
                              </Modal.Body>
                          </Modal>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        {C1.map((cid, i) =>
                          <div key={i} className="table-responsive">
                            <table className="table table-sm text-center">
                              <thead>
                              <tr>
                                  <td><h4>Casos</h4></td>
                                  <td><h4>Mortes</h4></td>
                                  <td>
                                  <h4>População</h4></td>
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
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
