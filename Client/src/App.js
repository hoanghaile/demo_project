import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import ClientPage from "./page/client/clientPage";
import AdminPage from "./page/admin/AdminPage";
import "bootstrap/dist/js/bootstrap.js";

import "./assets/css/App.css";
import "./assets/css/Bootstrap.css";
import "./assets/css/style.css";
import "./assets/vendors/iconly/bold.css";
import "./assets/vendors/bootstrap-icons/bootstrap-icons.css";
import "./assets/vendors/perfect-scrollbar/perfect-scrollbar.css";

import Auth from "./components/Auth/AuthProvider";
import ForgetPass from "./page/ForgetPass/ForgetPass";
import AuthContextProvider from "./components/contexts/authContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          {/* <Redirect from="/admin" to="/login"/> */}
          <Route exact path='/' component={ClientPage} />
          <ProtectedRoute path='/admin' component={AdminPage}/>
          <Route path='/login' render={props => <Auth {...props} authRoute='login' />}/>
          <Route path='/forget-password' component={ForgetPass} />
          <AdminPage />
        </Switch>
      </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}
export default App;

/**
 * react-router-dom v6
 * 
 * <Routes>
 * <Route path='/' element={<Layout />}>
 * <Route index element={<Homepage />} />
 * <Route path='/contact' element={<Contact />} />
 * <Route path='/admin' element={<AdminLayout />}></Route>
 * <Route path='*' element={<Page404 />} />
 * </Route>
 * </Routes>
 */