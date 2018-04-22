import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Auth } from './pages/auth';
import { SelectSize } from './pages/select-size';
import { Big } from './pages/big';
import { Small } from './pages/small';
import { BigPage } from './pages/big/page';
import { SmallPage } from './pages/small/page';
import { CreateSmall } from './pages/small/create';


export const Routes = () => (
  <Switch>
    <Route render={() => <Auth />} path='/auth' exact />
    <Route render={() => <SelectSize />} path='/select-size' exact />
    <Route render={() => <Big />} path='/big-form' exact />
    <Route render={() => <Small />} path='/small-form' exact />
    <Route render={() => <CreateSmall />} path='/smalleventcreate' exact />
    <Route
      render={({ match }) => <BigPage id={match.params.id} />}
      path='/bigevent/:id'
      exact
    />
    <Route
      render={({ match }) => <SmallPage id={match.params.id} />}
      path='/smallevent/:id'
      exact
    />
    <Redirect to='/auth' />
  </Switch>
)