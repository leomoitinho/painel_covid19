import React from 'react';
//import axios from 'axios';

import Estados from './Components/Estados';
import Estado from './Components/Estado';
import Pais from './Components/Brasil';
import Cidades from './Components/Cidades';
import Footer from './Components/Footer';

//function App() {
export default class App extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Estado />
          </div>
          <div className="col">
            <Pais />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Cidades />
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
