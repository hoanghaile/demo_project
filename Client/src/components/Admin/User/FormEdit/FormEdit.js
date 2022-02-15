import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import TitleBreadcrumb from '../../../Common/TitleBreadcrumb/TitleBreadcrumb';
// import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import { Formik, Form, FastField, Field } from 'formik';
import InputField from '../../../Common/CustomFields/InputFields/InputFields';
import UserApi from '../../../../api/User/userApi'
import BtnBack from '../../../Common/BtnBack';

const FormEdit = () => {
    // const [imgPreview, setImgPreview] = useState(null);
    // const [error, setError] = useState(false);
    
    
    // const uploadImage = (e) => {
    //     const formData = e.target.files[0];
    //     const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    //     if (formData && ALLOWED_TYPES.includes(formData.type)) {
    //         let reader = new FileReader();
    //         reader.onloadend = () => {
    //             setImgPreview(reader.result)
    //         }
    //         reader.readAsDataURL(formData);
    //     } else {
    //         setError(true)
    //     }
    // };
    const history = useHistory();
    const { id } = useParams();

    let initialValues = {
            _id:'',
            fullname: '',
            phone: '',
            email: '',
            gender: '',
            address: '',
            passport: '',
            nationality: '',
            nation: '',
            position: '',
            work: false
    }

    // const validationSchema =Yup.object().shape({
    //     fullname: Yup.string().required('vui lòng nhập tên người dùng')
    // })
    const [updateUser, setUpdateUser] = useState(initialValues);

    useEffect(() => {
        const loadData = async () => {
            const res = await UserApi.getUserId(id)
            setUpdateUser(res?.data?.users)
        };
        loadData()
    },[id])

    const onSubmit = async (data) => {
        // console.log(data, 2324324324);
        try {
            const res = await UserApi.updateUser(data._id, data)
            // console.log(res?.data?.admins, 222222);
            setUpdateUser(res?.data?.users)
            history.goBack() 
            // history.push(`/admin/quan-tri/danh-sach-admin`)
        } catch (err) {
           console.log(err);
        }
        
    }

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Sửa thông tin nhân viên" pathHome="admin" />
                <BtnBack onClick={()=>history.goBack()}/>
                <section className="section">
                    <div className="card">
                        
                        <div className="card-body">
                            {updateUser._id !== "" ?
                                 
                            <Formik
                                // validationSchema={validationSchema}
                                initialValues={updateUser}
                                onSubmit={(data) => { onSubmit(data) }}
                            >
                                {formikProps => {
                                    return (
                                        <Form>
                                            <div className="row">
                                                <div className="col-sm-6 ">
                                                    <div className="">
                                                        {/* <div className="card-box-img card-box text-center">
                                                            {error && <p className="errorMsg">Chọn file ảnh png, jpeg, jpg</p>}
                                                            <div
                                                                className="imgPreview"
                                                                style={{
                                                                    background: imgPreview
                                                                        ? `url("${imgPreview}") no-repeat center/cover`
                                                                        : "#d8dff7"
                                                                }}
                                                            >
                                                                {!imgPreview && (
                                                                    <>
                                                                        <p>Thêm ảnh đại diện</p>
                                                                        <label htmlFor="fileUpload" className="customFileUpload ">Chọn ảnh</label>
                                                                        <input name="image" type="file" id="fileUpload" onChange={uploadImage} />
                                                                    </>
                                                                )}
                                                            </div>
                                                            {imgPreview && (<button className="upload-img-button" onClick={() => setImgPreview(null)}>Xóa ảnh</button>)}
                                                        </div> */}
                                                    </div>
                                                    <div className="col-sm p-4">
                                                        <div className="input-group pad-add ">
                                                            <FastField label="Họ và tên" component={InputField} name="fullname" placeholder="Nhập họ tên" />
                                                        </div>
                                                        {/* <div className="input-group pad-add ">
                                                            <FastField label="Tên đăng nhập" component={InputField} name="username" placeholder="Nhập tên đăng nhập" />
                                                        </div> */}
                                                        <div className="input-group pad-add">
                                                            <FastField label="Số điện thoại" component={InputField} name="phone" placeholder="Nhập số điện thoại" />
                                                        </div>
                                                        {/* <div className="input-group pad-add ">
                                                            <FastField label="Mật khẩu" component={InputField} name="password" placeholder="Nhập Mật khẩu" />
                                                        </div> */}
                                                        <div className="input-group pad-add">
                                                            <FastField label="Email" component={InputField} name="email" placeholder="Nhập email" />
                                                        </div>
                                                        <div className="input-group pad-add">
                                                            <label className="label-field">Giới tính</label>
                                                            <Field label="" name="gender" as="select" className="form-group-table form-select">
                                                                <option label="Nhập giới tính" />
                                                                <option value="Nam" label="Nam" />
                                                                <option value="Nữ" label="Nữ" />
                                                            </Field>
                                                        </div>
                                                        <div className="input-group pad-add">
                                                            <FastField label="Địa chỉ" component={InputField} name="address" placeholder="Nhập địa chỉ" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 ">
                                                    <div className="col-sm p-4">
                                                        
                                                        <div className="input-group pad-add">
                                                            <FastField label="CMND/CCCD/PASSPORT" component={InputField} name="passport" placeholder="Nhập số CMND/CCCD/PASSPORT" />
                                                        </div>
                                                        <div className="input-group pad-add">
                                                            <FastField label="Quốc tịch" component={InputField} name="nationality" placeholder="Nhập quốc tịch" />
                                                        </div>
                                                        <div className="input-group pad-add">
                                                            <FastField label="Dân tộc" component={InputField} name="nation" placeholder="Nhập dân tộc" />
                                                        </div>
                                                        <div className="input-group pad-add">
                                                            <FastField label="Chức vụ" component={InputField} name="position" placeholder="Nhập chức vụ" />
                                                        </div>
                                                        <div className="input-group pad-add">
                                                            <label className="label-field">Trạng thái</label>
                                                            <Field label="" name="work" as="select" className="form-group-table form-select mb-3">
                                                                <option label="Nhập trạng thái" />
                                                                <option value={true} label="Đang làm việc" />
                                                                <option value={false} label="Nghĩ làm" />
                                                            </Field>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="auth-button-footer pad-4">
                                                    <button type="reset" className="btn btn-danger mr-5">Xóa</button>
                                                    <button type="submit" value="submit" className="btn btn-primary ">Lưu</button>
                                                </div>
                                            </div>
                                        </Form>
                                    )
                                }}
                            </Formik>
                            :<></>
                            }
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
FormEdit.propTypes = {
    onsubmit: PropTypes.func
}
FormEdit.defaultProps = {
    onsubmit: null
}

export default FormEdit;