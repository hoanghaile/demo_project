import React from 'react';
import NavBar from './Menu/NavBar/NavBar';
import Content from './Content/Content';
// import SideBar from './Menu/SideBar/SideBar';
// import PageLoading from '../../components/PageLoad/PageLoad';
const HomeClient = () => {

    return (
      <>
        <div className="d-flex" id="wrapper">
            {/* <!-- Sidebar--> */}
            {/* <SideBar/> */}
            {/* <!-- Page content wrapper--> */}
            <div id="page-content-wrapper">
                {/* <!-- Top navigation--> */}
                    <NavBar/>
                {/* <!-- Page content--> */}
                <div className="container-fluid">
                    <Content />
                </div>
                {/* <PageLoading/> */}
            </div>
            
        </div>
      </>
    )
}
export default HomeClient;