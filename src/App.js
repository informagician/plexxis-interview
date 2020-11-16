import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './styles/reset.css';
import './styles/index.css';

import Header from './components/Header';
import Side from './components/Side';
import Dashboard from './components/Dashboard';
import List from './components/employees/List';
import Add from './components/employees/Add'
import Update from './components/employees/Update';
import BranchList from './components/branches/BranchList';
import ReactTable from './components/employees/ReactTable';

const App = () => {
  const [ employees, setEmployees ] = useState([])

  return (
    <div>
    <Header />
      <div className="page">
        <Router>
          <Side />
          <div className="wrapper">
            <Switch>
              <Route path="/" exact>
                <Dashboard />
              </Route>
              <Route path="/employees" exact>
                <List setEmployees={setEmployees} employees={employees} />
              </Route>
              <Route exact path="/employees/add">
                <Add />
              </Route>
              <Route exact path="/employees/:id">
                <Update />
              </Route>
              <Route exact path="/branches">
                <BranchList />
              </Route>
              <Route exact path="/react-table">
                <ReactTable setEmployees={setEmployees} employees={employees}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
};

export default App;
