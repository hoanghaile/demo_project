import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsList } from 'react-icons/bs';
import Information from '../../Information/Information';

import imgLogo from '../../../../assets/images/H2.png'

import NavItem from "./NavItem/NavItem";

import './NavBar.css';

const NavBar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          {/* <button className="btn btn-light button-list" id="sidebarToggle"><BsList className="list-icon"/></button> */}
          <Button variant="white" onClick={handleShow}>
            <BsList className="list-icon" />
          </Button>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <img className='logo-navBar' src={imgLogo} alt="..." />
                Small-Project  </Offcanvas.Title>
            </Offcanvas.Header>
            <NavItem />
            {/* <Offcanvas.Body>
              Some text as placeholder. In real life you can have the elements you
              have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body> */}
          </Offcanvas>
          <div className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><Information /></div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item active"><Link className="nav-link" to="#"><Information /></Link></li>
              {/* <li className="nav-item"><a className="nav-link" href="#!">Link</a></li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" id="navbarDropdown" to="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</Link>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="#!">Action</Link>
                            <Link className="dropdown-item" to="#!">Another action</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="#!">Something else here</Link>
                        </div>
                    </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
export default NavBar;