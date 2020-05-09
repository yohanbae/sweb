import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
// import Smile from "./Smile";
import Main from "./Component/Main/";
import Shop from "./Component/Shop/";
import About from "./Component/About";
import Initial from "./Component/Initial";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <Router>
      <Switch>
        <Route exact path="/" component={Main} />        
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/about" component={About} />
        <Route exact path="/initial" component={Initial} />

      </Switch>
      <ToastContainer transition={Slide} position={toast.POSITION.BOTTOM_LEFT} />
      </Router>
  );
}

export default App;
