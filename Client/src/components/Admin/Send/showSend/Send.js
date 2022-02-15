import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import {IoMdClose} from 'react-icons/io'
import { Button } from "react-bootstrap";
import { FiDelete, FiEdit } from 'react-icons/fi';
import TitleBreadcrumb from '../../../Common/TitleBreadcrumb/TitleBreadcrumb';
import { removeAccents } from '../../../Common/CheckWord/CheckWord';
import Swal from "sweetalert2";
import ExportXLSX from '../../../Common/export/export'
import {FcCheckmark} from 'react-icons/fc'
import ReactPaginate from 'react-paginate';
import sendApi from '../../../../api/Send/sendApi';
import './Send.css';


const Send = () => {
    const [search, setSearch] = useState("")
    const [dataExport, setDataExport] = useState([])
    const [showSend, setShowSend] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const userPerPage = 20;
    const pagesVisited = pageNumber * userPerPage;
    const pageCount = Math.ceil(showSend.length / userPerPage);
    const onPageChange = ({ selected }) => {
        setPageNumber(selected);
    }
    const sttList = pageNumber * userPerPage;

    useEffect(() => {
        getList()
    },[])
    const getList = async () => {
        const res = await sendApi.getAll()
        setShowSend(res?.data?.sends)
        // console.log(8887777)
        const exportSend = res?.data?.sends.map((e, index) => {
            return {
                "STT": index + 1,
                "Họ và tên": e.name,
                "SĐT": e.phone,
                "Địa chỉ": e.address,
                "Áo quần": e.clothes,
                "Rau củ quả": e.vegetable,
                "Gạo": e.rice,
                "Mì gói": e.noodles,
                "Sữa": e.milk,
                "Trứng": e.egg,
                "Xe": e.car,
                "Trạng thái": e.status ? "Đã cho" : "Chưa cho" 
            }
        })
        setDataExport(exportSend)
    }

    const deleteSend = (id) => {
        return Swal.fire({
            icon: 'warning',
            title: "Bạn muốn xóa chứ",
            text: "Tất cả thông tin sẽ bị xóa vĩnh viễn",
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            confirmButtonColor: "#435ebe",
            denyButtonText: `Không`,
        }).then((res) => {
            if (res.isConfirmed) {
                sendApi.deleteSend(id).then(()=>getList())
            }
        })
    }

    const handleStatus = async (_id, data) => {
        let dataStatus = data.status;
        await sendApi.updateStatus(_id, { ...data, status: !dataStatus })
        getList();
    }
// console.log(showSend,99988888)
    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Danh sách muốn cho" pathHome="admin" />
                {
                    <section className="section">
                        <div className="card shadow-sm ">
                            <div className="card-body">
                                <div className="row justify-content-between mb-4">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="box-search">
                                            <input className="form-control input-content" placeholder="Nhập họ tên, địa chỉ, số điện thoại..." onChange={(e)=>setSearch(e.target.value)} />
                                            <BsSearch className="search-Icon" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 text-right">
                                        <div className="dt-buttons btn-group">
                                            
                                                <ExportXLSX data={dataExport } filename="Danh sách cho"/>
                                           
                                            
                                                <button type="button" className="btn button-outline">
                                                    <span>Copy</span>
                                                </button>
                                           
                                            
                                                <button type="button" className="btn button-outline">
                                                    <span>PDF</span>
                                                </button>
                                                                             
                                        </div>
                                    </div>
                                </div>
                                <div className="tableShow scrollTable overflow-auto table-responsive-lg">
                                    <table className=" received">
                                        <thead>
                                            <tr>
                                                <th >#</th>
                                                <th >Họ tên</th>
                                                <th >SĐT</th>
                                                <th >Địa chỉ</th>
                                                <th>Khẩu trang</th>
                                                <th>Áo quần</th>
                                                <th>Rau củ quả</th>
                                                <th>Gạo</th>
                                                <th>Mì gói</th>
                                                <th>Sữa</th>
                                                <th>Trứng</th>
                                                <th>Xe</th>
                                                <th>Ghi chú</th>
                                                <th>Trạng thái</th>
                                                <th>Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {showSend
                                                ?.slice(pagesVisited, pagesVisited + userPerPage)
                                                ?.filter((item) => {
                                                    //console.log(item.phone = item.phone.toString())
                                                    let query = removeAccents(search.toLowerCase())
                                                    //item.phone = item.phone.toString()
                                                    if (search === "") {
                                                        return item
                                                    } else if ( item?.phone.toLowerCase().includes(query) || item?.name.toLowerCase().includes(query)
                                                    ) {
                                                        return item
                                                    } else {
                                                        return false
                                                    }
                                                })
                                                ?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{ sttList +  index + 1}</td>
                                                    <td>{item?.name }</td>
                                                    <td>{item?.phone }</td>
                                                    <td>{item?.address}</td>
                                                    <td>{item?.mark}</td>
                                                    <td>{item?.clothes}</td>
                                                    <td>{item?.vegetable}</td>
                                                    <td>{item?.rice}</td>
                                                    <td>{item?.noodles}</td>
                                                    <td>{item?.milk}</td>
                                                    <td>{item?.egg}</td>
                                                    <td>{item?.car}</td>
                                                    <td><textarea className="form-control" rows="2" defaultValue={item?.text } disabled={true}/></td>
                                                    <td style={{width:"150px"}}>
                                                            {item?.status ? <Button onClick={() => handleStatus(item?._id, item)} variant="outline-success" style={{ fontSize: '14px' }}><FcCheckmark/> Đã cho</Button>
                                                                : <Button onClick={() => handleStatus(item?._id, item)} variant="outline-danger" style={{ fontSize: '14px' }}><IoMdClose/> Chưa cho</Button>
                                                            }
                                                              
                                                        {/* <Form>
                                                    <Form.Check
                                                        type="switch"
                                                        id="custom-switch"
                                                        label="Chưa Nhận"
                                                    />
                                                </Form> */}
                                                    </td>
                                                    <td>
                                                        <Link to={`/admin/danh-sach/edit-send/${item?._id}`}>
                                                            <FiEdit className="font-icon mr-10" />
                                                        </Link>
                                                        <FiDelete className="font-icon " onClick={()=>deleteSend(item?._id)} />
                                                    </td>
                                            </tr>
                                            )) } 
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <ReactPaginate
                                previousLabel={"Trước"}
                                nextLabel={"Sau"}
                                pageCount={pageCount}
                                onPageChange={onPageChange}
                                previousClassName={"previousBttns"}
                                containerClassName={"paginationBttns"}
                                nextLinkClassName={"nextBttns"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />
                        </div>
                    </section>
                }
            </div>
        </>
    )  
}

export default Send;