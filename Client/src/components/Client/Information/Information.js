import React,{useEffect, useState} from 'react';
import { Modal } from 'react-bootstrap';
// import img from '../../../assets/images/Vietnam.png';
// import { BiWorld } from 'react-icons/bi';
import CovidApi from '../../../api/Covid/covidApi';
import './Information.css';

const Information = () => {
    const [dataCovid, setDataCovid] = useState([])
    const [searchData, setSearchData] = useState("")
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    useEffect(() => {
        const CovidData = async () => {
            const res = await CovidApi.getVietNam()
            // console.log(res?.data);
            setDataCovid(res?.data)
        }
        CovidData()
    },[])

    return (
        <>
            <button className="btn-dialog" variant="primary" onClick={handleShow}>
                COVID-19
            </button>
            <Modal  show={show} onHide={handleClose}  id="style-scrollbar" >
                <Modal.Header closeButton>
                <Modal.Title>Cập nhật tình hình COVID-19</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        <input onChange={(e)=>setSearchData(e.target.value)} className="form-control input-content mb-input" placeholder="Nhập tên quốc gia"/>
                    </div>
                    <div className="div-dialog height-content scrollbar">
                        <div className="information-content">
                            <div className="information-box">
                            </div>
                            <table className="infor-table">
                                <tbody>
                                    {dataCovid
                                        ?.filter((item) => {
                                            if (searchData === "") {
                                            return item
                                            } else if (item?.country.toLowerCase().includes(searchData.toLowerCase())) {
                                                return item
                                            } else {
                                                return false
                                            }
                                    })
                                    ?.map((item, index) => (
                                        <tr key={index} className="border-top-table">
                                            <td style={{msWordBreak: "break-word"}}>
                                                {/* <span className="">
                                                    <img className="infor-img" src={item?.country?.countryInfo?.flag} alt={item?.country?.countryInfo?.flag} />
                                                </span> */}
                                                <span>{item?.country}</span>
                                            </td>
                                            <td className="border-infor">
                                                <div className="div-table-1">Tổng ca nhiễm</div>
                                                <div className="div-table-2">
                                                    <span>{item?.cases }&nbsp;N</span>
                                                </div>
                                                <div className=""></div>
                                            </td>
                                            <td className="border-infor-right">
                                                <div className="div-table-1">Ca tử vong</div>
                                                <div className="div-table-2">
                                                    <span>{item?.deaths }&nbsp;N</span>
                                                </div>
                                                <div className=""></div>
                                            </td>
                                        </tr>
                                    ))} 
                                </tbody>
                            </table>
                        </div>
                        {/* <div className="information-content ">
                            <div className="information-box">
                                <span className="">
                                    <BiWorld className="icon-world"/>
                                    <img className="infor-img" src={img} alt="img" />
                                </span>
                                <span>Thế giới</span>
                            </div>
                            <table className="infor-table ">
                                <tbody>
                                    <tr>
                                        <td className="border-infor">
                                            <div className="div-table-1">Tổng số ca nhiễm</div>
                                            <div className="div-table-2">
                                                <span>631&nbsp;N</span>
                                            </div>
                                            <div className=""></div>
                                        </td>
                                        <td className="border-infor-right">
                                             <div className="div-table-1">Tổng số ca tử vong</div>
                                            <div className="div-table-2">
                                                <span>15.279</span>
                                            </div>
                                            <div className=""></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> */}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Information;