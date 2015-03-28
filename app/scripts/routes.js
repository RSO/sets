import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import App from './pages/app.jsx';
import Home from './pages/home.jsx';

var routes = (
  <Route name="app" path="/" handler={ App }>
    <DefaultRoute handler={ Home } />
  </Route>
);

export default routes;
