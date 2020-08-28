import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import CardList from '../../components/CardList/CardList';
import authorDetails from '../../components/Details/authorDetails';
import bookDetails from '../../components/Details/bookDetails';
import authorEdit from '../../components/ItemEdit/authorEdit';
import bookEdit from '../../components/ItemEdit/bookEdit';

class MainView extends Component {
  render() {
    return (
      <Switch>
        <Route path='/Books' key='Books' exact component={CardList} />
        <Route path='/Authors' key='Authors' exact component={CardList} />
        <Route path='/Books/:id' exact component={bookDetails} />
        <Route path='/Authors/:id' exact component={authorDetails} />
        <Route
          path='/Books/edit/:id'
          key={'Books/edit'}
          exact
          component={bookEdit}
        />
        <Route
          path='/Authors/edit/:id'
          key={'Authors/edit'}
          exact
          component={authorEdit}
        />
      </Switch>
    );
  }
}

export default MainView;
