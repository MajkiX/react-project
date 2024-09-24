import React from 'react';
import { HashRouter as Router } from 'react-router-dom'
import '../App.scss'

import StoreProvider from '../store/StoreProvider';
import Header from './Header/Header'
import AsideMenu from './AsideMenu/AsideMenu';

function App() {
  return (
    <StoreProvider>
      <Header />
      <Router>
        <div className='content-wrapper'>
          <AsideMenu />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
