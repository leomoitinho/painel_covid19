import React from 'react';
import axios from 'axios';

//function App() {
export default class Cidades extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      cidades: [],
    };
  }

  async componentDidMount() {
    await axios.get('https://brasil.io/api/dataset/covid19/caso/data/?is_last=True&state=PR')
      .then(res => {
        const cidades = res.data.results;
        this.setState({ cidades });
      })
  }

  render() {
      let DV = this.state.cidades.filter(e => e.city === "Dois Vizinhos");
      let PB = this.state.cidades.filter(e => e.city === "Pato Branco");
      let FB = this.state.cidades.filter(e => e.city === "Francisco Beltrão");
      let CTB = this.state.cidades.filter(e => e.city === "Curitiba");
    return (
      <div>
        {DV.map(e => 
            <div className="card" style={{ height: '12rem' ,marginTop: '20px' }}>
                <div className="card-body">
                    <h2 className="card-title">{e.city}</h2>
                </div>
                <div>
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
                                <td><h4>{e.confirmed}</h4></td>
                                <td><h4>{e.deaths}</h4></td>
                                <td><h4>{e.estimated_population_2019}</h4></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )}
        {FB.map(e => 
            <div className="card" style={{ height: '12rem' ,marginTop: '20px' }}>
                <div className="card-body">
                    <h2 className="card-title">{e.city}</h2>
                </div>
                <div>
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
                                <td><h4>{e.confirmed}</h4></td>
                                <td><h4>{e.deaths}</h4></td>
                                <td><h4>{e.estimated_population_2019}</h4></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )}
        {PB.map(e => 
            <div className="card" style={{ height: '12rem' ,marginTop: '20px' }}>
                <div className="card-body">
                    <h2 className="card-title">{e.city}</h2>
                </div>
                <div>
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
                                <td><h4>{e.confirmed}</h4></td>
                                <td><h4>{e.deaths}</h4></td>
                                <td><h4>{e.estimated_population_2019}</h4></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )}
        {CTB.map(e => 
            <div className="card" style={{ height: '12rem' ,marginTop: '20px' }}>
                <div className="card-body">
                    <h2 className="card-title">{e.city}</h2>
                </div>
                <div>
                    <table className="table table-sm table-responsive text-center">
                        <thead>
                            <tr>
                                <td><h4>Casos</h4></td>
                                <td><h4>Mortes</h4></td>
                                <td><h4>População</h4></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><h4>{e.confirmed}</h4></td>
                                <td><h4>{e.deaths}</h4></td>
                                <td><h4>{e.estimated_population_2019}</h4></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )}

      </div>
    )
  }
}

//export default App;
