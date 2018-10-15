import React from 'react';
import { Route, Switch } from 'react-router';

// Import modules/routes
import Home from './home';
import About from './about';
import PollShow from './home/poll';
import PageNotFound from './common/components/PageNotFound';

export default (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="/polls/:id" component={PollShow} />
    <Route component={PageNotFound} />
  </Switch>
);