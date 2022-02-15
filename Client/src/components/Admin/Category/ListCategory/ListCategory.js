import React, {useEffect, useState} from "react";
import { BsSearch } from "react-icons/bs";
import { FiDelete, FiEdit } from 'react-icons/fi';
import { useHistory } from 'react-router';
import TitleBreadcrumb from '../../../Common/TitleBreadcrumb/TitleBreadcrumb';
import { Link } from 'react-router-dom';
// import AddUser from "../AddUser/AddUser";
import AddCategory from '../AddCategory/AddCate'
import CateApi from "../../../../api/Category/categoryApi";
import Swal from "sweetalert2";

const ListCategory = () => {
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
    // const history = useHistory();
    const [listCate, setListCate] = useState([])
    useEffect(() => {
        getList()
    }, [])
    

     const getList = async () => {
            const res = await CateApi.getAll()
            console.log(res.data.category);
            setListCate(res?.data?.category)
    }
    
    const deleteCate = async (id) => {
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
                 CateApi.deleteCategory(id)
                .then(()=>getList())
            }
        })
    }

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Danh sách hàng hóa" pathHome="admin" />
                {
                    <section className="section">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="row justify-content-between mb-4">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="box-search">
                                            <input className="form-control input-content" placeholder="Nhập họ tên, địa chỉ, số điện thoại..." />
                                            <BsSearch className="search-Icon" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 text-right">
                                        <div className="dt-buttons btn-group">
                                            <button type="button" className="btn button-outline">
                                                <span>XLSX</span>
                                            </button>
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
                                        <AddCategory/>
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
                                                <th>Tên Hàng</th>
                                                {/* <th>Trạng thái</th> */}
                                                <th>Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listCate?.map((cate, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{cate?.name}</td>
                                                    <td>
                                                        <Link to={`/admin/quan-tri/edit-category/${cate?._id}`}>
                                                            <FiEdit className="font-icon mr-10" />
                                                        </Link>
                                                        <FiDelete className="font-icon" onClick={()=>deleteCate(cate?._id)} />
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                }
            </div>
        </>
    )
}

export default ListCategory;
