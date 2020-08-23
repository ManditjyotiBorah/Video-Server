import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import manage from './components/manage.component';
import list from './components/list.component';
import watch from './components/watch.component';
import login from './components/login.component';
function App() {
  return (
    <Router>
      <Route path='/' exact component={list}></Route>
      <Route path='/login' exact component={login}></Route>
      <Route path='/manage' exact component={manage}></Route>
      <Route path='/watch/:id' exact component={watch}></Route>
    </Router>
  );
}

export default App;
