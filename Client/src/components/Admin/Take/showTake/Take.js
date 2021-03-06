import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { IoMdClose } from 'react-icons/io'
import {FcCheckmark} from 'react-icons/fc'
import { FiDelete, FiEdit } from 'react-icons/fi';
import { Button } from "react-bootstrap";
// import Checkbox from "../../../Common/Checkbox/Checkbox";
import TitleBreadcrumb from '../../../Common/TitleBreadcrumb/TitleBreadcrumb';
import { removeAccents } from '../../../Common/CheckWord/CheckWord';
import ExportXLSX from '../../../Common/export/export';
import ReactPaginate from 'react-paginate';
import Swal from "sweetalert2";
import takeApi from '../../../../api/Take/takeApi';
import './Take.css';


const Received = () => {
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
    const [showTake, setShowTake] = useState([]);
    const [dataExport, setDataExport] = useState([]);
    const [search, setSearch] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const userPerPage = 20;
    const pagesVisited = pageNumber * userPerPage;
    const pageCount = Math.ceil(showTake.length / userPerPage);
    const onPageChange = ({ selected }) => {
        setPageNumber(selected);
    }
    const sttList = pageNumber * userPerPage;

    useEffect(() => {
        takeList()
    },[])
    
    const takeList = async ()=> {
        const res = await takeApi.getAll();
        // console.log(res?.data?.takes);
        setShowTake(res?.data?.takes)

        const exportTake = res?.data?.takes.map((e, index) => {
            return {
                 "STT": index + 1,
                "H??? v?? t??n": e.name,
                "S??T": e.phone,
                "?????a ch???": e.address,
                "??o qu???n": e.clothes,
                "Rau c??? qu???": e.vegetable,
                "G???o": e.rice,
                "M?? g??i": e.noodles,
                "S???a": e.milk,
                "Tr???ng": e.egg,
                "Xe": e.car,
                "Tr???ng th??i": e.status ? "???? nh???n" : "Ch??a nh???n" 
            }
        })
        setDataExport(exportTake)
    }

    // const getTakeId = async (id) => {
    //     const res = await takeApi.getById(id)

    // }

    const deleteTake = (id) => {
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
                takeApi.deleteTake(id).then(()=>takeList())
            }
        })
    }
    const handleStatus = async (_id, data) => {
        let dataStatus = data.status;
        await takeApi.updateStatus(_id, { ...data, status: !dataStatus })
        takeList();
    }   

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Danh s??ch mu???n nh???n" pathHome="admin" />
                {
                    <section className="section">
                        <div className="card shadow-sm ">
                            <div className="card-body">
                                <div className="row justify-content-between mb-4">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="box-search">
                                            <input className="form-control input-content" placeholder="Nh???p h??? t??n, ?????a ch???, s??? ??i???n tho???i..." onChange={(e)=>setSearch(e.target.value) }/>
                                            <BsSearch className="search-Icon" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 text-right">
                                        <div className="dt-buttons btn-group">
                                            {/* <button type="button" className="btn button-outline">
                                                <span>XLSX</span>
                                            </button> */}
                                            <ExportXLSX data={dataExport} filename="Danh s??ch nh???n" />
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
                                                <th >#
                                                    {/* <Checkbox
                                                type="checkbox"
                                                className="check-box"
                                                name="selectAll"
                                                id="selectAll"
                                                handleClick={handleSelectAll}
                                                isChecked={isCheckAll}

                                                /> */}
                                                </th>
                                                <th >H??? t??n</th>
                                                <th >S??T</th>
                                                <th >?????a ch???</th>
                                                <th>Kh???u trang</th>
                                                <th>??o qu???n</th>
                                                <th>Rau c??? qu???</th>
                                                <th>G???o</th>
                                                <th>M?? g??i</th>
                                                <th>S???a</th>
                                                <th>Tr???ng</th>
                                                <th>Xe</th>
                                                <th>Ghi ch??</th>
                                                <th>Tr???ng th??i</th>
                                                <th>Ch???c n??ng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {showTake
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
                                                    <td>{sttList + index + 1}
                                                        {/* <Checkbox
                                                    type="checkbox"
                                                    key={1}
                                                    name='check-1'
                                                    handleClick={handleClick}
                                                    isChecked={isCheck.includes(1)}
                                                /> */}
                                                    </td>
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
                                                    <td>
                                                        <textarea className="form-control" rows="2" defaultValue={item?.text} disabled={true} />
                                                    </td>
                                                    <td style={{ width: "150px" }}>
                                                        {item?.status ? <Button onClick={() => handleStatus(item?._id, item)} variant="outline-success" style={{ fontSize: '14px' }}><FcCheckmark/> ???? nh???n</Button>
                                                                : <Button onClick={() => handleStatus(item?._id, item)} variant="outline-danger" style={{ fontSize: '14px' }}><IoMdClose/> Ch??a nh???n</Button>
                                                            }
                                                        {/* <Form>
                                                    <Form.Check
                                                        type="switch"
                                                        id="custom-switch"
                                                        label="Ch??a Nh???n"
                                                    />
                                                </Form> */}
                                                    </td>
                                                    <td>                                                     
                                                        <Link to={`/admin/quan-tri/edit-take/${item?._id}`}>
                                                            <FiEdit className="font-icon  mr-10" />
                                                        </Link>
                                                        <FiDelete className="font-icon" onClick={()=>deleteTake(item?._id)} />
                                                    </td>
                                                </tr>
                                            ))
                                            }
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

export default Received;