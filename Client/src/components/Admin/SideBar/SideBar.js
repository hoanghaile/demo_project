import React, { useContext, useState } from "react";
import { BsChevronDown } from 'react-icons/bs';
import { RiLogoutBoxRLine,RiDashboard3Line } from 'react-icons/ri';
import { BsCardList, BsFolderSymlink } from 'react-icons/bs';
import {MdClear} from 'react-icons/md'
import {BiUserCircle} from 'react-icons/bi'
import { useRouteMatch, Link, NavLink } from 'react-router-dom';
import { AuthContext } from "../../contexts/authContext";
import LogoutAlter from "../../Common/Alert/CustomAlert";
import './SideBar.css';

const SideBar = () => {
    let matchList = useRouteMatch("/admin/danh-sach");
    let matchUser = useRouteMatch("/admin/quan-tri");
    let matchInfor = useRouteMatch("/admin/ho-so");
    let matchProduct = useRouteMatch("/admin/hang-hoa")
    const {
        authState: {
            user: {username}
        },logoutUser
    } = useContext(AuthContext)
    const logout = () => logoutUser()
    const [open, setOpen] = useState(false);
    
    return (
        <>
            <div id="sidebar" className="active">
                <div className="sidebar-wrapper active shadow">
                    <div className="sidebar-header">
                        <div className="d-flex justify-content-between">
                            <div className="logo">
                                <small style={{ fontSize: "1.1rem", marginLeft: "10px" }}>SMALL-PROJECT</small>
                            </div>
                            <div className="toggle">
                                <div style={{ cursor: "pointer" }} className="sidebar-hide d-xl-none d-block">
                                    <i className="bi bi-x bi-middle"></i>
                                    <MdClear />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-menu">
                        <nav className=" navbar-expand-sm ">
                            <ul className="menu">
                                <li className="sidebar-title">Bảng điều khiển </li>
                                <NavLink to="/admin" className="sidebar-item" activeClassName="active">
                                    <p className="sidebar-link" >
                                        <RiDashboard3Line className="icon-side"/>
                                        <span>Trang chủ</span>
                                    </p>
                                </NavLink>
                                <li className={"sidebar-item " + (matchList ? "active" : "")} style={{ cursor: 'pointer' }}>
                                    <p className="sidebar-link" >
                                        <BsCardList className="icon-side"/>
                                        <span>Danh sách</span>
                                        <BsChevronDown className="has-sub"/>
                                    </p>
                                    <ul className="submenu">
                                        <li className="submenu-item ">
                                            <Link to="/admin/danh-sach/danh-sach-nhan">Muốn Nhận</Link>
                                        </li>
                                        <li className="submenu-item ">
                                            <Link to="/admin/danh-sach/danh-sach-cho">Muốn Cho</Link>
                                        </li>
                                        {/* <li className="submenu-item ">
                                            <Link to="">Đã nhận</Link>
                                        </li> */}
                                    </ul>
                                </li>
                                <li className={"sidebar-item " + (matchUser ? "active" : "")} style={{ cursor: 'pointer' }}>
                                    <p className='sidebar-link' >
                                        <BiUserCircle className="icon-side"/>
                                        <span>Quản trị nhân viên</span>
                                        <BsChevronDown className="has-sub"/>
                                    </p>
                                <ul className="submenu">
                                    <li className="submenu-item ">
                                            <Link to="/admin/quan-tri/danh-sach-admin">Danh sách admin</Link>
                                        </li>
                                        <li className="submenu-item ">
                                            <Link to="/admin/quan-tri/danh-sach-nhan-vien">Danh sách nhân viên</Link>
                                        </li>
                                    </ul>
                            </li>
                            <li className={"sidebar-item " + (matchProduct ? "active" : "")} style={{ cursor: 'pointer' }}>
                                    <p className='sidebar-link' >
                                        <BiUserCircle className="icon-side"/>
                                        <span>Quản trị hàng hóa</span>
                                        <BsChevronDown className="has-sub"/>
                                    </p>
                                     <ul className="submenu">
                                        <li className="submenu-item ">
                                            <Link to="/admin/quan-tri/hang-hoa">Danh sách</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className={"sidebar-item " + (matchInfor ? "active" : "")} style={{cursor: 'pointer'}} > 
                                    <p className='sidebar-link'>
                                        <BsFolderSymlink className="icon-side"/>
                                        <span>Hồ sơ</span>
                                        <BsChevronDown className="has-sub"/>
                                    </p>
                                    <ul className="submenu">
                                        <li className="submenu-item ">
                                            <Link to="/admin/doi-mat-khau">Đổi mật khẩu</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="sidebar-item " style={{ cursor: 'pointer' }}>
                                <p className='sidebar-link'
                                    onClick={LogoutAlter}
                                >
                                        <RiLogoutBoxRLine className="icon-side" />
                                        <span>Đăng xuất</span>
                                        <span>{username}</span>
                                    </p>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <button className="sidebar-toggler btn x"><i data-feather="x"></i></button>
                </div>
            </div>
        </>
    )
}
export default SideBar;