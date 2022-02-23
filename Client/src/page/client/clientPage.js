import React from 'react';
import {withRouter} from 'react-router'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Client from '../../components/Client/Home';
// import SideBar from '../../components/Client/Home';

const ClientPage = () => {
    return (
        <Router>
            <div id="app">
                {/* <SideBar/> */}
                {/* <div id="main"> */}
                    <Switch>
                        <Route path="/" component={Client} />
                    </Switch>
                {/* </div> */}
            </div>
        </Router>
    );
};
export default withRouter(ClientPage);