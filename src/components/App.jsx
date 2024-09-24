import React from 'react';
import { HashRouter as Router } from 'react-router-dom'
import '../App.scss'
import StoreProvider from '../store/StoreProvider';

import Header from './Header/Header'
import AsideMenu from './AsideMenu/AsideMenu';
import Content from './Content/Content';

function App() {
  return (
    <StoreProvider>
      <Header />
      <Router>
        <div className='content-wrapper'>
          <AsideMenu />
          <Content />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
