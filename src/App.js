import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Visualisations from './Components/Visualisations/Visualisations'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Visualisations />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;