import React from 'react';
import {withRouter} from 'react-router'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Client from '../../components/Client/Home';
// import SideBar from '../../components/Client/Home';

const ClientPage = () => {
    return (
        
            <div id="app">
                {/* <SideBar/> */}
            {/* <div id="main"> */}
                <Router>
                    <Switch>
                        <Route  path="/" component={Client} />
                    </Switch>
                 </Router>
                {/* </div> */}
            </div>
       
    );
};
export default withRouter(ClientPage);