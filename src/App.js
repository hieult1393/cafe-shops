import React, { useState } from 'react';
import {
  Switch, Route, Link,
  BrowserRouter as Router,
  useRouteMatch
} from 'react-router-dom';
import './App.css';
import ShopsManager from './ShopsManager';
import ShopsList from './ShopsList';

const App = () => {
  const NavRoute = ({ path, label }) => {
    let match = useRouteMatch({ path, exact: true });
    return <li className={match ? 'active' : ''}>
      <Link to={path}>{label}</Link>
    </li>
  };

  return (
    <Router>
      <div style={{}}>
        <div style={{ width: '100%' }}>
          <ul className="routes-list">
            <NavRoute path="/manager" label="Shops Manager"/>
            <NavRoute path="/shops" label="Shops"/>
          </ul>
        </div>

        <div style={{ width: '100%' }}>
          <Switch>
            <Route exact path="/manager" component={ShopsManager}/>
            <Route exact path="/shops" component={ShopsList}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
 