import React from 'react';
import axios from 'axios';

//function App() {
export default class Estado extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      ufs: [],
    };
  }

  async componentDidMount() {
    await axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/pr')
    //await axios.get('http://localhost:3000/uf.json')
      .then(res => {
        //const ufs = JSON.stringify([res.data]);
        const ufs = res.data;
        this.setState({ ufs });
      })
  }
  //componentDidMount() {
  //  const url = 'https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/pr';
  //  axios.get(url).then(response => response.data)
  //  .then((data) => {
  //    this.setState({ ufs: data })
  //    console.log(this.state.ufs)
  //   })
  //}

  render() {
      //console.log(this.state.ufs);
      const f = this.state.ufs;
      //const titulo = <h1>{f.uf} {f.state}</h1>;
    return (
      <div>
        <div className="card" style={{ height: '12rem', marginTop: '20px' }}>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h1 className="card-title">{f.uf}</h1>
                    </div>
                    <div className="text-right col">
                        <img className="img-fluid" src={'https://devarthurribeiro.github.io/covid19-brazil-api/static/flags/'+ f.uf + '.png'} alt={f.sate} />
                    </div>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">{f.state}</h6>
                    <table className="table table-sm table-responsive">
                        <thead>
                            <tr>
                                <td>Casos</td>
                                <td>Mortes</td>
                                <td>Suspeitos</td>
                                <td>Descartados</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><h3>{f.cases}</h3></td>
                                <td><h3>{f.deaths}</h3></td>
                                <td><h3>{f.suspects}</h3></td>
                                <td><h3>{f.refuses}</h3></td>
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
