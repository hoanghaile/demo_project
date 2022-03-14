import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
import {Accordion } from 'react-bootstrap';
import './SideBar.css'
import CheckBox from '../Checkbox/Checkbox';
import DialogFilter from '../DialogFilter/DialogFilter';

const  Navbar =() =>{

  return (
    <>
      <div className="border-end bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom bg-light">Small-project</div>
        <div className="list-group list-group-flush">
            {/* <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="#!">Dashboard</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="#!">Shortcuts</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="#!">Overview</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="#!">Events</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="#!">Profile</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="#!">Status</Link> */}
          <div className="sidebar-menu list-group-item list-group-item-action list-group-item-light p-3">
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Nhu yếu phẩm</Accordion.Header>
                <CheckBox/>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Phương tiện vận tải</Accordion.Header>
                <CheckBox/>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <div className="border-top">
          <DialogFilter />
        </div>  
      </div>
    </>
  );
}

export default Navbar;