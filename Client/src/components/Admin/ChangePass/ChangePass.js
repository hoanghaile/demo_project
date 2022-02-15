import React, { useState, useContext, useEffect } from 'react';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { Formik, Form, FastField } from 'formik';
import {AuthContext} from '../../contexts/authContext'
import InputField from '../../Common/CustomFields/InputFields/InputFields';
import TitleBreadcrumb from '../../Common/TitleBreadcrumb/TitleBreadcrumb';
// import authApi from '../../../api/Auth/authApi';
import { ToastContainer, toast } from 'react-toastify';
import './ChangePass.css';
import { useHistory } from 'react-router-dom';
import { LOCAL_STORAGE_TOKEN_NAME } from '../../contexts/constants';
// import { useParams } from 'react-router';
import axios from 'axios';

const ChangePass = () => {
    const {
        authState: {
            user: { _id, fullname, password, username },
        },
    } = useContext(AuthContext)
    console.log(_id, fullname, password, username, 'full');
    // Usecontext
    // const [use,setUse]=useState()
    const history = useHistory()
    document.title = "Đổi mật khẩu"

    const validationSchema = Yup.object().shape({
        oldPass: Yup.string()
            .required('Vui lòng nhập mật khẩu')
            .min(6, 'Mật khẩu không được ít hơn 6 ký tự')
            .max(20, 'Mật khẩu không được lớn hơn 20 ký tự'),
        newPass: Yup.string()
            .required("Mật khẩu không được bỏ trống")
            .min(6, 'Mật khẩu không được ít hơn 6 ký tự')
            .max(20, 'Mật khẩu không được lớn hơn 20 ký tự'),
        comNewPass: Yup.string()
            .required("Mật khẩu nhập lại không được bỏ trống")
            .oneOf([Yup.ref('newPass'), null], 'Mật khẩu nhập lại không khớp')
    })
    const initialValues = {
        oldPass: '',
        newPass: '',
        comNewPass:''
    }
    // const arr=[]
    const onSubmit = async (data) => {
        try {
            // console.log(data);
            // await authApi.changePass({...data })
            const res = await axios.patch(`http://localhost:8000/auth/admin/change-pass/${_id}`, data)
            // ?.then(res => console.log(res, 666))
            let record = res?.data;
            if (record?.success === true) {
                toast.success("Đổi mật khẩu thành công");
                sessionStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
                Cookies.remove('_token');
                setTimeout(() => {
                    // history.push('/login')
                    window.location.href = '/login'
                },1500)
            } else {
                toast.error(record?.message)
            }
        } catch (err) {
            console.log(err);
            toast.error("Mật khẩu không tồn tại")
        }


    // comNewPass: "1234567"
    // newPass: "1234567"
    // oldPass: "123456"
    // [[Prototype]]: Object
        // const filteredByValue = Object.fromEntries(Object.entries(use).filter(([key, value]) => value._id === _id))
        // if (data?.oldPass === filteredByValue?.password) {
        //     // call api patch lên DB
        //     console.log(data?.oldPass);
        // } else {
        //      console.log('mật khẩu không đúng');
        // }
        //  await use?.admins?.map(ele => console.log(ele?._id == _id))
            // if (data?.usernme ===use?.username && data?.password ===use?.password) {
            //         // call api patch lên DB
            // } 
        //điều kiện là trả về nguyên obj user đã login { _id:1,username,pass....}
    }
    useEffect(() => {
        // const getById = async() => {
        //     await authApi.getAdmin()?.then(res=>setUse(res?.data?.admins))
        // }
        // getById()
    },[])

    return (
        <>
            <div className="page-heading">
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <TitleBreadcrumb title="Đổi mật khẩu" pathHome="admin" />
                <section className="section">
                    <div className="card mb-3">
                        <div className="row">
                            <div className="col-lg-6 col-12 w-80 mx-auto p-3 page-change">
                                <h2>Chào mừng bạn đến trang đổi mật khẩu</h2>
                                <p>Nhập mật khẩu của bạn và chúng tôi sẽ cài cho bạn mật khẩu mới.</p>
                                <Formik
                                    validationSchema={validationSchema}
                                    initialValues={initialValues}
                                    onSubmit={(data)=>onSubmit(data)}
                                >
                                    {formikProps => {
                                        return(
                                        <Form>
                                            <div className="input-group color-change">
                                                <FastField name="oldPass" label="Mật khẩu củ" component={InputField} placeholder="Nhập mật khẩu củ" />
                                            </div>
                                            <div className="input-group color-change ">
                                                <FastField name="newPass" label="Mật khẩu mới" component={InputField} placeholder="Nhập mật khẩu mới" />
                                            </div>
                                            <div className="input-group color-change ">
                                                <FastField name="comNewPass" label="Xác nhận mật khẩu mới" component={InputField} placeholder="Nhập lại mật khẩu mới" />
                                            </div>
                                            <button type="submit" className="w-btn btn btn-primary">Lưu</button>
                                        </Form>
                                        )}}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

ChangePass.propTypes = {
    onSubmit: PropTypes.func,
}
ChangePass.defaultProps = {
    onSubmit: null,
}
export default ChangePass;