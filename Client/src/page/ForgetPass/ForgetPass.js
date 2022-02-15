import React, { useState, useRef } from "react";
import PropTypes from 'prop-types';
import * as Yup from "yup";
import { Formik, Form, FastField } from "formik";
import InputField from '../../components/Common/CustomFields/InputFields/InputFields';
import '../Login/Login.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import ChangePassForm from '../changePassForm/ChangePassForm';
import img from '../../assets/images/react.png';
import mailApi from "../../api/Mail/mailApi";

const ChangePass = () => {
    
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("email không được bỏ trống")
    })
    const initialValues = {
        email:''
    }
    //const emailRef = useRef(initialValues);
    const [mailData, setMailData] = useState([])
    const [otpForm, setOtpFrom] = useState(true)
    const onSubmit = async (data) => {
       try {
           const res = await mailApi.sendMail({...data})
            console.log(res?.data?.otp?.email);
            setMailData(res?.data?.otp?.email)
           let record = res?.data
           if (record.success === true) {
               toast.success(record.message)
               setOtpFrom(false)
           } else {
               toast.success(record.message)
           }
       } catch (err) {
           console.log(err);
           toast.error("Email không tồn tại")
       }
    }

    return (
        <>
            <div id="auth">
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
                <div className="row container-login100">
                    {otpForm ? 
                        <div className="wrap-login100">
                            <Formik
                                validationSchema={validationSchema}
                                initialValues={initialValues}
                                onSubmit={(e) => { onSubmit(e) }}
                            
                            >
                                {formikProps => {
                                    return (
                                        <Form>
                                            <div className="login100-form validate-form">
                                                <span className="login100-form-title p-b-43">Quên Mật khẩu</span>
                                                <p>Nhập email của bạn và chúng tôi sẽ gửi cho bạn liên kết đặt lại mật khẩu.</p>
                                                <div className="wrap-input100 validate-input">
                                                    <div className="input-group pad-login">
                                                        <FastField component={InputField} name="email" placeholder="Nhập email" />
                                                    </div>
                                                </div>
                                                <div className="flex-sb-m w-full p-t-3 p-b-32">
                                                    {/* <div className="contact100-form-checkbox">
                                                    <input type="checkbox" className="input-checkbox100" id="ckb1" />
                                                    <label className="label-checkbox100" htmlFor="ckb1">Ghi nhớ</label>
                                                </div> */}
                                                    <div>
                                                        <Link to="/login" className="txt1">Đăng nhập</Link>
                                                    </div>
                                                </div>
                                                <div className="container-login100-form-btn">
                                                    <button type="submit" className="login100-form-btn">Gửi</button>
                                                </div>
                                            </div>
                                        </Form>
                                    )
                                }}
                            </Formik>
                            <div className="login100-more">
                                <img src={img} alt="backgroup-login" />
                            </div>
                        </div>
                        :<><ChangePassForm email={mailData} /></>
                    }
                </div>
            </div>
        </>
    )
}

ChangePass.propTypes = {
    onsubmit: PropTypes.func
}
ChangePass.defaultProps = {
    onsubmit: null
}

export default ChangePass;