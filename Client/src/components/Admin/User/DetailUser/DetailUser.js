import React,{useState} from "react";
import { Button, Modal } from 'react-bootstrap';
import img from "../../../../assets/images/userface.jpg";
import './DetailUser.css'

const DetailUser = ({display, setDisplay, data}) => {
    return (
        <>
            <Modal size="lg" show={display} onHide={() => setDisplay(false)} aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Đây là {data?.fullname}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-sm-6 ">
                            <div className="img-user">
                                <img src={img} alt="img-user"/>
                            </div>
                            <div className="infor-user">
                                <h6>Họ tên: <span className="text-detail">{data?.fullname}</span></h6>
                                <h6>Tên đăng nhập: <span className="text-detail">{ data?.username }</span></h6>
                                <h6>Số điện thoại: <span className="text-detail">{data?.phone}</span></h6>
                                <h6>Email: <span className="text-detail">{data?.email}</span></h6>
                                
                            </div>
                        </div>
                        <div className="col-sm-6 ">
                            <div className="detail-user">
                                <h6>Giới tính: <span className="text-detail">{data?.gender}</span></h6>
                                <h6>Địa chỉ: <span className="text-detail">{data?.address}</span></h6>
                                <h6>CMND/CCCD/PASSPORT: <span className="text-detail">{data?.passport}</span></h6>
                                <h6>Quốc tịch: <span className="text-detail">{data?.nationality}</span></h6>
                                <h6>Dân tộc: <span className="text-detail">{data?.nation}</span></h6>
                                <h6>Chức vụ: <span className="text-detail">{data?.position}</span></h6>
                                <h6>Trạng thái: <span className="text-detail">{data?.work ? "Đang làm việc":"nghĩ việc"}</span></h6>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default DetailUser;