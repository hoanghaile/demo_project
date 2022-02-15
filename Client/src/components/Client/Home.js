import React from 'react';
// import SideBar from './Menu/SideBar/SideBar';
import NavBar from './Menu/NavBar/NavBar';
import Content from './Content/Content';
// import ReactMapGL from '@goongmaps/goong-map-react';
// import '@goongmaps/goong-js/dist/goong-js.css';

const HomeClient = () => {
//     const [viewport, setViewPort] = useState({
//         width: '100vh',
//         height: '100vh',
//         latitude: 37.7577,
//         longitude: -122.4376,
//         zoom: 8,
//   })
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
                 
            </div>
        {/* <ReactMapGL {...viewport} onViewportChange={setViewPort}/> */}
            
        </div>
      </>
    )
}
export default HomeClient;