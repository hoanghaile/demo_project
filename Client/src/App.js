import React from 'react';
import { BrowserRouter as Route, Switch, Router } from 'react-router-dom';
import ClientPage from './page/client/clientPage';
import AdminPage from './page/admin/AdminPage';

import './assets/css/App.css';
import './assets/css/Bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './assets/css/style.css';
import './assets/vendors/iconly/bold.css';
import './assets/vendors/bootstrap-icons/bootstrap-icons.css';
import './assets/vendors/perfect-scrollbar/perfect-scrollbar.css';

import Auth from './components/Auth/AuthProvider';
import ForgetPass from './page/ForgetPass/ForgetPass';
import AuthContextProvider from './components/contexts/authContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router>
          <Switch>
            {/* <Redirect from="/admin" to="/login"/> */}
            <Route exact path='/' component={ClientPage} />
            <ProtectedRoute path='/admin' component={AdminPage}/>
            <Route path='/login' render={props => <Auth {...props} authRoute='login'/>}/>
            <Route path='/forget-password' component={ForgetPass} />
            <AdminPage />
          </Switch>
        </Router>
      </AuthContextProvider>
    </>
  );
}
export default App;