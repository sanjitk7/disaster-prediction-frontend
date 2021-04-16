import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Visualisations from './Components/Visualisations/Visualisations'
import RainfallViz from './Components/RainfallViz/RainfallViz';
import EarthquakeViz from './Components/Earthquake/Earthquake';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    
    <div className="App" style={{ height:"100vh", width:"100vw"}}>
      <Router>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }} className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
        <Menu.Item key="1">
          Landslides
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="2">
          Rainfall
          <Link to="/rainfall" />
        </Menu.Item>
        <Menu.Item key="3">
          Earthquakes
          <Link to="/earthquake" />  
        </Menu.Item>
      </Menu>
    </Header>
        <Switch>
          <Route exact path="/">
            <Visualisations />
          </Route>
          <Route exact path="/rainfall">
            <RainfallViz />
          </Route>
          <Route exact path="/earthquake">
            <EarthquakeViz/>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;