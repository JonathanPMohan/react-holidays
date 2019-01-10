import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button className="btn btn-danger">HELP</button>
          <Button
            tag="a"
            color="info"
            size="large"
            href="http://google.com"
            target="_blank"
          >Reactstrap</Button>
        </header>
      </div>
    );
  }
}

export default App;
