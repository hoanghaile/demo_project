import React, {useState, useEffect} from "react";
import { BsSearch } from "react-icons/bs";
// import { useParams } from 'react-router';
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import {IoMdClose} from 'react-icons/io'
import {FcCheckmark} from 'react-icons/fc'
import { FiDelete, FiEdit } from 'react-icons/fi';
import TitleBreadcrumb from '../../../Common/TitleBreadcrumb/TitleBreadcrumb';
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import { removeAccents } from '../../../Common/CheckWord/CheckWord';
import ExportXLSX from '../../../Common/export/export';
import './UserAdmin.css';
import DetailUser from '../DetailUser/DetailUser';
import ImportFile from '../../../Common/import/import';
import AddUser from "../AddUser/AddUser";
import UserApi from "../../../../api/User/userApi";

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
    }, [])
    
    const getAllUser = async () => {
        const res = await UserApi.getAll()
        // console.log(res?.data?.users);
        setAllUser(res?.data?.users);
        const exportUser = res?.data?.users.map((e, index) => {
            return {
                "STT": index + 1,
                "H??? v?? t??n": e.fullname,
                "S??? ??i???n tho???i": e.phone,
                "email": e.email,
                "Gi???i t??nh": e.gender,
                "?????a ch???": e.address,
                "CCCD": e.passport,
                "Qu???c t???ch": e.nationality,
                "D??n t???c": e.nation,
                "V??? tr??": e.position,
                "Tr???ng th??i": e.work ? "??ang l??m vi???c" : "Ngh?? l??m"
            }
        })
        setDataExport(exportUser)
    }
    const getUsersId = async (userId) => {
        setLgShow(true);
        // console.log(userId,1212)
        const res = await UserApi.getUserId(userId)
        setDetail(res?.data?.users);
        // console.log(res?.data);
    }

    const deleteUser = (id) => {
       
        return Swal.fire({
            icon: 'warning',
            title: "B???n mu???n x??a ch???",
            text: "T???t c??? th??ng tin s??? b??? x??a v??nh vi???n",
            showCancelButton: true,
            confirmButtonText: 'X??a',
            confirmButtonColor: "#435ebe",
            denyButtonText: `Kh??ng`,
        }).then((res) => {
            if (res.isConfirmed) {
                UserApi.deleteUser(id).then(() => getAllUser())
            }
        })
    }
    
    const handleStatus = async (_id, data) => {
        let dataWork = data.work;
        // console.log(data?.work);
        await UserApi.updateStatus(_id, { ...data, work: !dataWork });
        getAllUser();
    }

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Danh s??ch qu???n tr??? vi??n" pathHome="admin" />
                {
                    <section className="section">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="row justify-content-between mb-4">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="box-search">
                                            <input className="form-control input-content" placeholder="Nh???p h??? t??n, ?????a ch???, s??? ??i???n tho???i..." onChange={(e)=>setSearch(e.target.value)} />
                                            <BsSearch className="search-Icon" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 text-right">
                                        <div className="dt-buttons btn-group">
                                            <ImportFile getAllUser={getAllUser}/>
                                        </div>
                                        <div className="dt-buttons btn-group">
                                            <ExportXLSX data={dataExport} filename="Danh s??ch nh??n vi??n"/>
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
                                        <AddUser  />
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
                                                <th>H??? t??n</th>
                                                <th>S??? ??i???n tho???i</th>
                                                <th>Xem</th>
                                                <th>Tr???ng th??i</th>
                                                <th>Ch???c n??ng</th>
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
                                                    <td> { sttUser + index + 1}
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
                                                        <button className="btn btn-primary" onClick={() => { getUsersId(user?._id) }}>Xem chi ti???t</button>
                                                        {/* <DetailUser  /> */}
                                                    </td>
                                                    <td>
                                                        {user?.work ? <Button onClick={() => handleStatus(user?._id, user)} variant="outline-success" style={{ fontSize: '14px' }}><FcCheckmark/> ??ang l??m vi???c</Button>
                                                                : <Button onClick={() => handleStatus(user?._id, user)} variant="outline-danger" style={{ fontSize: '14px' }}><IoMdClose/> Ngh?? vi???c</Button>
                                                            }
                                                        {/* <Form>
                                                            <Form.Check
                                                                type="switch"
                                                                id="custom-switch"
                                                                label="??ang l??m vi???c"
                                                            />
                                                        </Form> */}
                                                    </td>
                                                    <td> 
                                                        <Link to={`/admin/quan-tri/edit-user/${user?._id}`}>
                                                            <FiEdit className="font-icon mr-10" />
                                                        </Link>
                                                        <FiDelete className="font-icon " onClick={()=> deleteUser(user?._id)}/>
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                             <DetailUser data={detail} display={lgShow} setDisplay={setLgShow}/>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <ReactPaginate
                                previousLabel={"Tr?????c"}
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

export default UserAdmin;