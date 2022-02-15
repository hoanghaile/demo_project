import React from "react";
import TitleBreadcrumb from '../../Common/TitleBreadcrumb/TitleBreadcrumb';
import {RiUserReceived2Line, RiHeartAddLine, RiCheckFill} from 'react-icons/ri'
import './HomePage.css'

const HomePage = () => {
    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Trang chủ" pathHome="/admin" />
                <section className="section">
                     <div className="card shadow-sm mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 col-sm-6 pd-card">
                                    <div className="box-card box-danger text-white">
                                        <div className="d-flex justify-content-between card-body">                               
                                            <div className="width-box">
                                                <h3>1234</h3>
                                                <h6>Tổng số hộ muốn nhận</h6>
                                            </div>
                                            <div className="width-box ">
                                                <RiUserReceived2Line className="box-icon" />
                                            </div>                                          
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 pd-card">
                                    <div className="box-card box-primary text-white">
                                        <div className="d-flex justify-content-between card-body">                               
                                            <div className="width-box">
                                                <h3>123</h3>
                                                <h6>Tổng số hộ muốn cho</h6>
                                            </div>
                                            <div className="width-box ">
                                                <RiHeartAddLine className="box-icon" />
                                            </div>                                          
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 pd-card">
                                    <div className="box-card box-success text-white">
                                        <div className="d-flex justify-content-between card-body">                               
                                            <div className="width-box">
                                                <h3>123</h3>
                                                <h6>Tổng số hộ đã nhận</h6>
                                            </div>
                                            <div className="width-box ">
                                                <RiCheckFill className="box-icon" />
                                            </div>                                          
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>   
                </section>
            </div>
            
        </>
    )
}
export default HomePage;