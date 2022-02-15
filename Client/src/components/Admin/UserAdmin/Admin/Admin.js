import React, {useState, useEffect} from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router';
import {IoMdClose} from 'react-icons/io'
import {FcCheckmark} from 'react-icons/fc'
import ReactPaginate from 'react-paginate';
import Swal from "sweetalert2";
import { FiDelete, FiEdit } from 'react-icons/fi';
import TitleBreadcrumb from '../../../Common/TitleBreadcrumb/TitleBreadcrumb';
import { Button } from "react-bootstrap";
import ExportXLSX from '../../../Common/export/export';
import DetailAdmin from '../DetailAdmin/DetailAdmin';
import AddAdmin from "../AddAdmin/AddAdmin";
import { removeAccents } from '../../../Common/CheckWord/CheckWord';
import AdminApi from '../../../../api/Auth/authApi';
import './Admin.css'

const UserAdmin = () => {
    // const [lgShow, setLgShow] = useState(false);
    // const [isCheckAll, setIsCheckAll] = useState(false);
    // const [isCheck, setIsCheck] = useState([]);
    // const [list, setList] = useState([]);

    // const handleSelectAll = e => {
    //     setIsCheckAll(!isCheckAll)
    //     setIsCheck(list.map(tr => tr.id));
    //     if (isCheckAll) {
    //         setIsCheck([]);
    //     }
    // }
    // const handleClick = e => {
    //     const { id, checked } = e.target;
    //     setIsCheck([...isCheck, id]);
    //     if (!checked) {
    //         setIsCheck(isCheck.filter(item => item !== id));
    //     }
    // }
    // const { id } = useParams();
    // const history = useHistory();
    const [search, setSearch] = useState("")
    const [dataExport, setDataExport] = useState([])
    const [allUser, setAllUser] = useState([])
    const [lgShow, setLgShow] = useState(false);
    const [detail, setDetail] = useState({});
    const [pageNumber, setPageNumber] = useState(0);
    const userPerPage = 20;
    const pagesVisited = pageNumber * userPerPage;
    const pageCount = Math.ceil(allUser.length / userPerPage);

    const onPageChange = ({ selected }) => {
        setPageNumber(selected);
    }
    const sttUser = pageNumber * userPerPage;

    useEffect(() => {
        getAllUser();
    },[])
    const getAllUser = async () => {
        const res = await AdminApi.getAdmin()
        // console.log(res?.data?.admins);
        setAllUser(res?.data?.admins);
        const ExportAdmin = res?.data?.admins.map((e, index) => {
            return {
                "STT": index + 1,
                "Họ và tên": e.fullname,
                "Tên đăng nhập": e.username,
                "Số điện thoại": e.phone,
                "email": e.email,
                "Giới tính": e.gender,
                "Địa chỉ": e.address,
                "CCCD": e.passport,
                "Quốc tịch": e.nationality,
                "Dân tộc": e.nation,
                "Vị trí": e.position,
                "Trạng thái": e.work ? "Đang lầm việc" : "Nghĩ việc"
            }
        })
        setDataExport(ExportAdmin)
    }
    
    const getUsersId = async (userId) => {
        setLgShow(true);
        // console.log(userId,1212)
        const res = await AdminApi.getById(userId)
        setDetail(res?.data?.admins);
    }

    const deleteUser = async (id) => {
        console.log(id);
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
                AdminApi.deleteAdmin(id).then(() => getAllUser())
            }
        })
    }

    const handleStatus = async (_id, data) => {
        let dataWork = data.work;
        // console.log(data?.work);
        await AdminApi.updateStatus(_id, { ...data, work: !dataWork });
        getAllUser();
    }
    
    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Danh sách Admin" pathHome="admin" />
                {
                    <section className="section">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="row justify-content-between mb-4">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="box-search">
                                            <input className="form-control input-content" placeholder="Nhập họ tên, địa chỉ, số điện thoại..." onChange={(e) => setSearch(e.target.value)}  />
                                            <BsSearch className="search-Icon"  />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 text-right">
                                        <div className="dt-buttons btn-group">
                                            <ExportXLSX data={dataExport} filename="Danh sách quản trị viên"/>
                                            <button type="button" className="btn button-outline">
                                                <span>Copy</span>
                                            </button>
                                            <button type="button" className="btn button-outline">
                                                <span>PDF</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="pd-add">
                                        <AddAdmin userLoad={getAllUser}  />
                                    </div>
                                </div>
                                <div className="tableShow scrollTable overflow-auto table-responsive-lg">
                                    <table className=" received">
                                        <thead>
                                            <tr>
                                                <th>#
                                                    {/* <Checkbox
                                                type="checkbox"
                                                className="check-box"
                                                name="selectAll"
                                                id="selectAll"
                                                handleClick={handleSelectAll}
                                                isChecked={isCheckAll}

                                                /> */}
                                                </th>
                                                <th>Họ tên</th>
                                                <th>Số điện thoại</th>
                                                <th>Xem</th>
                                                <th>Trạng thái</th>
                                                <th>Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allUser
                                                ?.slice(pagesVisited, pagesVisited + userPerPage)
                                                ?.filter((item) => {
                                                    //console.log(item.phone = item.phone.toString())
                                                    let query = removeAccents(search.toLowerCase())
                                                    item.phone = item.phone.toString()
                                                    if (search === "") {
                                                        return item
                                                    } else if ( item?.phone.toLowerCase().includes(query) || item?.fullname.toLowerCase().includes(query)
                                                    ) {
                                                        return item
                                                    } else {
                                                        return false
                                                    }
                                                })
                                                ?.map((user, index) => (
                                                    <tr key={index}>
                                                        <td> {sttUser +  index + 1}
                                                            {/* <Checkbox
                                                                type="checkbox"
                                                                key={1}
                                                                name='check-1'
                                                                handleClick={handleClick}
                                                                isChecked={isCheck.includes(1)}
                                                            /> */}
                                                        </td>
                                                        <td>{user?.fullname}</td>
                                                        <td>{user?.phone }</td>
                                                        <td>
                                                            <button className="btn btn-primary" onClick={() => { getUsersId(user?._id) }}>Xem chi tiết</button>
                                                            {/* <DetailAdmin
                                                                onClick={() => { getUsersId(user?._id) }}
                                                                data={detail} display={lgShow} setDisplay={setLgShow}
                                                            /> */}
                                                        </td>
                                                        <td>
                                                            {user?.work ? <Button onClick={() => handleStatus(user?._id, user)} variant="outline-success" style={{ fontSize: '14px' }}><FcCheckmark/> Đang làm việc</Button>
                                                                : <Button onClick={() => handleStatus(user?._id, user)} variant="outline-danger" style={{ fontSize: '14px' }}><IoMdClose/> Nghĩ việc</Button>
                                                            }
                                                            {/* <Form>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch"
                                                                    label="Đang làm việc"
                                                                />
                                                            </Form> */}
                                                        </td>
                                                        <td> 
                                                            <Link to={`/admin/quan-tri/edit-admin/${user?._id}`}>
                                                                <FiEdit className="font-icon mr-10" />
                                                            </Link>
                                                            
                                                            <FiDelete className="font-icon " onClick={()=> deleteUser(user?._id)}/>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            <DetailAdmin data={detail} display={lgShow} setDisplay={setLgShow}/>
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
            {/* <EditAdmin
                className="font-icon mr-10"
                data={editAdmin}
                display={lgEdit}
                setDisplay={setLgEdit}
            /> */}
        </>
    )
}

export default UserAdmin;