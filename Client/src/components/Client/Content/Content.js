import React from 'react';
import './Content.css';
import { BsSearch } from "react-icons/bs";
import Take from './Takes/Take/Take';
import Send from './Sends/Send/Send';
import Map from '../map/map';


const Content = () => {
    return(
        <>
            <section >
                
                <div className="content box-sos" style={{zIndex:2}} >
                    <div className="box-search">
                        <input className="form-control input-content" placeholder="Nhập địa chỉ... " />
                        <BsSearch className="search-Icons"/>
                    </div>
                    <div className="box-item">
                        <div className="row box-item-1 ">
                            <div className="col-4 col-lg-4">
                                <div className="box-item-info box-red hover-box">12345 Nhận</div>
                            </div>
                            <div className="col-4 col-lg-4">
                                <div className="box-item-info box-Orange hover-box">5344 Cho</div>
                            </div>
                            <div className="col-4 col-lg-4 ">
                                <div className="box-item-info box-green hover-box">4064 Đã nhận</div>
                            </div>
                        </div>
                    </div>
                    <div className="box-add-send">
                        <div className="row box-item-1">
                            <div className="col-6">
                                <div className="box-add"><Take/></div>
                            </div>
                            <div className="col-6">
                                <div className="box-send"><Send/></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ height: '100vh', width: '100%', position: "absolute" }}> 
                    <Map/>
                </div>
            </section>
        </>
    )
}

export default Content;