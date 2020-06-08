import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'; 

//function App() {
export default class Estado extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      ufs: [],
      uf: [],
    };
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  async componentDidMount() {
    let estado = "RJ";
    await axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/'+ estado +'')
        .then(res => {
        const ufs = res.data;
        this.setState({ ufs });
      })
      if (localStorage.getItem("myEstado") === null) {
        localStorage.setItem('myEstado', JSON.stringify(this.state.ufs ));
      }
      let ufs = JSON.parse(localStorage.getItem("myEstado"));
      //this.setState((prevState, props) => ({ ufs: ufs }));
      this.setState({ ufs: ufs });
  }
 
  onChangeEstado = e => {
    let estado = e.target.value;
    //localStorage.clear();
    axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/'+ estado +'')
      .then(res => {
        const ufs = res.data;
        localStorage.setItem('myEstado', JSON.stringify(ufs));
        this.setState({ ufs: ufs });
      })
    this.hideModal();
  }

  Filtros = () => {
    return(
      <div>
        <select className="form-control" onChange={this.onChangeEstado}>
          <option>--</option>
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
    )
  }
   
  render() {
    //let f = this.state.ufs;
    //let estado = f.uf;
    return (
      <div>
        <div className="card" style={{ height: '13rem', marginTop: '20px' }}>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h1 className="card-title">{this.state.ufs.uf}</h1>
                    </div>
                    <div className="text-right col">
                        <img className="img-fluid" src={'https://devarthurribeiro.github.io/covid19-brazil-api/static/flags/'+ this.state.ufs.uf + '.png'} alt={this.state.ufs.state} />
                    </div>
                    <div className="text-right col-3">
                      <button className="btn btn-outline-dark" onClick={this.showModal}><span className="material-icons">build</span></button>
                      <Modal show={this.state.show} onHide={this.hideModal}>
                          <Modal.Header closeButton>
                              <Modal.Title>Escolha o Estado</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                              <div className="center">{this.Filtros()}</div>
                          </Modal.Body>
                      </Modal>
                    </div>
                </div>
                <h6 className="card-subtitle text-muted">{this.state.ufs.state}</h6>
                <div className="table-responsive">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <td>Casos</td>
                                <td>Mortes</td>
                                <td>Suspeitos</td>
                                <td>Descartados</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={this.state.ufs.state}>
                                <td><h3>{this.state.ufs.cases}</h3></td>
                                <td><h3>{this.state.ufs.deaths}</h3></td>
                                <td><h3>{this.state.ufs.suspects}</h3></td>
                                <td><h3>{this.state.ufs.refuses}</h3></td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
            </div>
        </div>
      </div>
    )
  }
}

//export default App;
