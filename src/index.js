import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Login from './view/Login';
import Home from './view/Home';
import Popover from './view/Popover';
import Profile from './view/Profile';
import * as serviceWorker from './serviceWorker';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import Schedule from './view/Schedule'
import Booking from './view/Booking'
import Moviesdetail from './view/Moviesdetail'
import Myticket from './view/Myticket'

const Routing =(
    <Router>
            <Switch>
                <Route path="/myticket" component={Myticket} />
                <Route path="/moviesdetail" component={Moviesdetail} />
                <Route path="/schedule" component={Schedule} />
                <Route path="/Booking" component={Booking} />
                <Route path="/Profile" component={Profile} />
                <Route path="/" component={Home} />
            </Switch>
    </Router>
)

ReactDOM.render(Routing, document.getElementById('Home'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
