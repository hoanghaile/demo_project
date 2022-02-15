import React from 'react';
import Cookies from 'js-cookie';
import { Formik, Form, FastField } from "formik";
import InputField from '../../components/Common/CustomFields/InputFields/InputFields';
import * as Yup from "yup";
import mailApi from '../../api/Mail/mailApi';
import PropTypes from 'prop-types';
import img from '../../assets/images/react.png'
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import {LOCAL_STORAGE_TOKEN_NAME} from '../../components/contexts/constants'

const ChangePassForm = (props) => {
    const history = useHistory();
    const initialValues = {
        otp: '',
        password: '',
        confirmPass:''
    }
    const validationSchema = Yup.object().shape({
        otp: Yup.string().required('Vui lòng nhập mã OTP')
            .max(4, 'Mã OTP không vượt quá 4 chữ số')
            .min(4, 'Mã OTP không ít hơn 4 chữ số'),
        password: Yup.string()
            .required('Vui lòng nhập mật khẩu')
            .min(6, 'Mật khẩu không được ít hơn 6 ký tự')
            .max(20, 'Mật khẩu không được lớn hơn 20 ký tự'),
        confirmPass: Yup.string()
            .required("Mật khẩu nhập lại không được bỏ trống")
        .oneOf([Yup.ref('password'), null], 'Mật khẩu nhập lại không khớp')

    })
    const onSubmit = async (data) => {
        // console.log(data, props);
        Object.assign(data, props)
        try {
            const res = await mailApi.changePass({ ...data })
            let record = res?.data
            
            if (record?.success === true ) {
                toast.success("Lấy lại mật khẩu thành công");
                setTimeout(() => {
                    // history.push('/login')
                    sessionStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
                    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
                    Cookies.remove('_token');
                    window.location.href = '/login';
                },1500)
            } else {
                toast.error(record.message)
            }
        } catch (err) {
            toast.error("Không tồn tại")
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
                    <div className="wrap-login100">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(e)=>onSubmit(e)}
                        >
                            {formikProps => {
                                return (
                                    <Form>
                                        <div className="login100-form validate-form">
                                                <span className="login100-form-title p-b-43">Đặt lại Mật khẩu</span>
                                                <p>Nhập mã OTP và đặt lại mật khẩu của bạn</p>
                                                <div className="wrap-input100 validate-input" style={{height: '90px'}}>
                                                    <div className="input-group ">
                                                        <FastField label="Nhập mã OTP" component={InputField} name="otp" placeholder="Mã OTP" />
                                                    </div>
                                                </div>
                                                <div className="wrap-input100 validate-input" style={{height: '90px'}}>
                                                    <div className="input-group ">
                                                        <FastField label="Nhập mật khẩu" component={InputField} name="password" placeholder="Mật khẩu" />
                                                    </div>
                                                </div>
                                                <div className="wrap-input100 validate-input" style={{height: '90px'}}>
                                                    <div className="input-group ">
                                                        <FastField label="Nhập lại mật khẩu" component={InputField} name="confirmPass" placeholder="Nhập lại mật khẩu" />
                                                    </div>
                                                </div>
                                                <div className="flex-sb-m w-full p-t-3 p-b-32">
                                                    {/* <div className="contact100-form-checkbox">
                                                    <input type="checkbox" className="input-checkbox100" id="ckb1" />
                                                    <label className="label-checkbox100" htmlFor="ckb1">Ghi nhớ</label>
                                                </div> */}
                                                    {/* <div>
                                                        <Link to="/login" className="txt1">Đăng nhập</Link>
                                                    </div> */}
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
                </div>
            </div>
        </>
    )
}

ChangePassForm.propTypes = {
    onsubmit: PropTypes.func
}
ChangePassForm.defaultProps = {
    onsubmit: null
}

export default ChangePassForm;