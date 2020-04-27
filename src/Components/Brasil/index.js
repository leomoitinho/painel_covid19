import React from 'react';
import axios from 'axios';

//function App() {
export default class Pais extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      country: [],
    };
  }

  async componentDidMount() {
    await axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil')
      .then(res => {
        const country = res.data.data;
        this.setState({ country });
      })
  }

  render() {
      //console.log(this.state.country);
      const b = this.state.country;
    return (
      <div>
        <div className="card" style={{ height: '12rem', marginTop: '20px' }}>
            <div className="card-body">
                <h1 className="card-title">{b.country}</h1>
                <h6 className="card-subtitle mb-2 text-muted">Total de casos do país</h6>
                    <table className="table table-sm table-responsive">
                        <thead>
                            <tr>
                                <td>Casos</td>
                                <td>Confirmados</td>
                                <td>Mortes</td>
                                <td>Curados</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><h3>{b.cases}</h3></td>
                                <td><h3>{b.confirmed}</h3></td>
                                <td><h3>{b.deaths}</h3></td>
                                <td><h3>{b.recovered}</h3></td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
        
      </div>
    )
  }
}

//export default App;
