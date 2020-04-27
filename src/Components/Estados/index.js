import React from 'react';
import axios from 'axios';

//function App() {
export default class Estados extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      estados: [],
    };
  }

  async componentDidMount() {
    await axios.get('https://covid19-brazil-api.now.sh/api/report/v1')
      .then(res => {
        const estados = res.data.data;
        this.setState({ estados });
      })
  }

  render() {
    return (
      <div>
        <div className="card" style={{ marginTop: '20px' }}>
            <div className="card-body">
                <h5 className="card-title">Resumo dos Estados</h5>
                    <table className="table table-striped table-hover table-responsive">
                        <thead className="thead-dark">
                            <tr>
                                <td>UF</td>
                                <td>Casos</td>
                                <td>Mortes</td>
                                <td>Suspeitos</td>
                                <td>Descartados</td>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.estados.map((e, i) => 
                                <tr key={i}>
                                    <td><img className="img-fluid" src={'https://devarthurribeiro.github.io/covid19-brazil-api/static/flags/'+ e.uf + '.png'} alt={e.sate} /></td>
                                    <td>{e.cases}</td>
                                    <td>{e.deaths}</td>
                                    <td>{e.suspects}</td>
                                    <td>{e.refuses}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
            </div>
        </div>
      </div>
    )
  }
}

//export default App;
