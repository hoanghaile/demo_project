import React from 'react';
import { BrowserRouter as  Router, Route, Switch } from 'react-router-dom';
import SideBar from '../../components/Admin/SideBar/SideBar';
import HomePage from '../../components/Admin/HomePage/HomePage';
import Header from '../../components/Common/Navbar/Navbar';
import ListCategory from '../../components/Admin/Category/ListCategory/ListCategory';
import Take from '../../components/Admin/Take/showTake/Take';
import EditTake from '../../components/Admin/Take/editTake/EditTake';
import EditSend from '../../components/Admin/Send/editSend/EditSend';
import EditAdmin from '../../components/Admin/UserAdmin/FormEdit/FormEdit';
import EditUser from '../../components/Admin/User/FormEdit/FormEdit';
import EditCategory from '../../components/Admin/Category/EditCategory/EditCategory';
import Send from '../../components/Admin/Send/showSend/Send';
import User from '../../components/Admin/User/User/UserAdmin';
import Admin from '../../components/Admin/UserAdmin/Admin/Admin';
import ChangePass from '../../components/Admin/ChangePass/ChangePass';

const AdminPage = () => {
    return (
        <>
            <Router>
                <div id="app">
                    <SideBar />
                    <div id="main">
                        <Header match="admin"/>
                        <Switch>                           
                            <Route path="/admin" exact component={HomePage} />
                            <Route path="/admin/danh-sach/danh-sach-nhan" exact component={Take} />
                            <Route path="/admin/quan-tri/edit-take/:id" exact component={EditTake}/>
                            <Route path="/admin/danh-sach/danh-sach-cho" exact component={Send} />
                            <Route path="/admin/danh-sach/edit-send/:id" exact component={EditSend}/>
                            <Route path="/admin/quan-tri/danh-sach-admin" exact component={Admin} />
                            <Route path="/admin/quan-tri/edit-admin/:id" exact component={EditAdmin} />
                            <Route path="/admin/quan-tri/edit-user/:id" exact component={EditUser} />
                            <Route path="/admin/quan-tri/edit-category/:id" exact component={EditCategory}/>
                            <Route path="/admin/quan-tri/danh-sach-nhan-vien" exact component={User} />
                            <Route path="/admin/quan-tri/hang-hoa" exact component={ListCategory} />
                            <Route path="/admin/doi-mat-khau" exact component={ChangePass} />
                        </Switch>
                    </div>
                </div>
            </Router>   
        </>
    )
}
export default AdminPage;