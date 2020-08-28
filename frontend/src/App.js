import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import Navigation from './containers/Navigation/Navigation';
import MainView from './containers/MainView/MainView';
import Modal from './components/Modal/Modal';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <header>
            <Navigation />
          </header>

          <main>
            <Modal></Modal>

            <MainView />
          </main>

          <footer></footer>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
