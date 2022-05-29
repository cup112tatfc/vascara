import Layout from 'layout';
import React from 'react';
import './styles/globals.scss'
import { BrowserRouter } from 'react-router-dom';
import showPages from 'components/showPage/showPages';
import routers from 'routes/routers';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>{showPages(routers)}</Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
