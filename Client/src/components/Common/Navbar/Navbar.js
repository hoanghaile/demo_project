import React, {useContext} from "react";
import { Link } from 'react-router-dom';
import {BsPersonSquare} from 'react-icons/bs';
import { GrSettingsOption, GrLogout } from 'react-icons/gr';
import img from '../../../assets/images/userface.jpg';
import LogoutAlter from "../Alert/CustomAlert";
import { AuthContext } from "../../contexts/authContext";
import './Navbar.css';

const Navbar = () => {
    const {
        authState: {
            user: { _id, fullname, password, username },
        },
    } = useContext(AuthContext)
    console.log(_id, fullname, password, username, 'full');
    //const logout = ()=> logoutUser()

    return (
        // <header>
            <nav className="navbar navbar-expand navbar-light px-0" style={{paddingTop: 0}}>
                <div className="container-fluid px-0" >
                    
                    <div className="burger-btn d-block " style={{cursor: "pointer"}}>
                        <i className="bi bi-justify fs-3"></i>
                        {/* <BsList/> */}
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">    
                        <div className="dropdown ms-auto mt-2">
                            <Link to="/" data-bs-toggle="dropdown" aria-expanded="false">
                                <div className="user-menu d-flex">
                                    <div className="user-img d-flex align-items-center">
                                        <div className="avatar avatar-md">
                                                <img src={img} alt=""/>
                                        </div>
                                    </div>     
                                    <div className="user-name text-end">
                                        <h6 className="text-gray-600">
                                            {fullname}
                                        </h6>
                                    </div>
                                </div>
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <h6 className="dropdown-header">Xin chào &nbsp;
                                        {fullname}
                                    </h6>
                                    </li>
                                <Link to="#">
                                    <p className="dropdown-item "><BsPersonSquare className="mr-5"/> Thông tin</p>        
                                </Link>
                                <Link to="#">
                                    <p className="dropdown-item"><GrSettingsOption className="mr-5"/> Đổi mật khẩu</p>        
                                </Link>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>    
                                <li>
                                    <Link to="#" className="dropdown-item"
                                        onClick={LogoutAlter}
                                    >
                                    <GrLogout className="mr-5" />
                                    <span>Đăng xuất</span>
                                    </Link>
                                </li>
                            </ul>    
                        </div>                 
                    </div>
                </div>
            {/* </div> */}
            </nav>
        // </header>
    )
}
export default Navbar;