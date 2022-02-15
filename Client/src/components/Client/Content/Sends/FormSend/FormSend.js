import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, FastField } from 'formik';
import InputField from '../../../../Common/CustomFields/InputFields/InputFields';
import MyTextArea from '../../../../Common/CustomFields/TextAreaFields/TextAreaFields';
import SendApi from '../../../../../api/Send/sendApi';
import './FormSend.css';

const FormAdd = () => {

    const initialValues = {
        name: '',
        address: '',
        phone: '',
        text: '',
        clothes: '',
        car: '',
        mark: '',
        vegetable: '',
        rice: '',
        noodles: '',
        milk: '',
        egg:'',
        status: false
    }

    const onSubmit = async (data) => {
        console.log(data);
        await SendApi.addSend({...data})
    }

    return (
        <>
            <section className="section">
                {/* <div className="card"> */}
                    <div className="body-form-add">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(data)=>{onSubmit(data)}}
                    >
                            {formikProps => {
                                return ( 
                                    <Form>
                                        <div className="input-group">
                                            <FastField label="Áo quần" component={InputField} name="clothes" placeholder="Nhập số bộ" />
                                        </div>
                                        <div className="input-group">                                           
                                            <FastField label="Khẩu trang" component={InputField} name="mark" placeholder="Nhập số hộp" />
                                        </div>
                                        <div className="input-group">                                          
                                            <FastField label="Rau củ quả" component={InputField} name="vegetable" placeholder="Nhập số kg" />
                                        </div>
                                        <div className="input-group">                                          
                                            <FastField label="Gạo" component={InputField} name="rice" placeholder="Nhập số kg" />
                                        </div>
                                        <div className="input-group">                                          
                                            <FastField label="Mì gói" component={InputField} name="noodles" placeholder="Nhập số thùng" />
                                        </div>
                                        <div className="input-group">                                         
                                            <FastField label="Sữa" component={InputField} name="milk" placeholder="Nhập số hộp" />
                                        </div>
                                        <div className="input-group">                                          
                                            <FastField label="Trứng" component={InputField} name="egg" placeholder="Nhập số quả" />
                                        </div>
                                        <div className="input-group">                                        
                                            <FastField label="Xe tải" component={InputField} name="car" placeholder="Nhập số chiếc" />
                                        </div>
                                        <h5>Thông tin liên lạc</h5>
                                        <div className="input-group">
                                            <FastField label="Họ và tên" component={InputField} name="name" placeholder="Nhập họ và tên" />
                                        </div>
                                        <div className="input-group">
                                            <FastField label="Địa chỉ" component={InputField} name="address" placeholder="Nhập địa chỉ" />
                                        </div>
                                        <div className="input-group">
                                            <FastField label="Số điện thoại" component={InputField} name="phone" placeholder="Số điện thoại" />
                                        </div>
                                        <div style={{display: 'none'}}>
                                            <FastField component={InputField} name="status" placeholder="Số điện thoại" />
                                        </div>
                                        <MyTextArea label="Ghi chú" name="text"/>
                                        <div className="auth-button-footer ">
                                            <button type="reset" className="btn btn-danger mr-5">Xóa</button>
                                            <button type="submit" value="submit" className="btn btn-primary ">Lưu</button>
                                        </div>
                                    </Form>
                                )
                            }}
                         </Formik>
                    </div>
                {/* </div> */}
            </section>
        </>
    )
}

FormAdd.propTypes = {
    onSubmit: PropTypes.func
}
FormAdd.defaultProps = {
    onSubmit: null,
}
export default FormAdd;