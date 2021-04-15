import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Visualisations from './Components/Visualisations/Visualisations'
import RainfallViz from './Components/RainfallViz/RainfallViz';
function App() {
  return (
    <div className="App" style={{ height:"100vh", width:"100vw"}}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Visualisations />
          </Route>
          <Route exact path="/rainfall">
            <RainfallViz />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;