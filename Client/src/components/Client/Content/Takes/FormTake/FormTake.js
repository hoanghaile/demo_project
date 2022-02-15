import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, FastField } from 'formik';
import InputField from '../../../../Common/CustomFields/InputFields/InputFields';
import MyTextArea from '../../../../Common/CustomFields/TextAreaFields/TextAreaFields';
import takeApi from '../../../../../api/Take/takeApi';
import { CheckWord } from '../../../../Common/CheckWord/CheckWord'
// import './FormAddSend.css';

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
        await takeApi.addTake({...data})
    }
    const CheckText = (e) => {
        let res = CheckWord(e.target.value)
        e.target.value = res
    }

    return (
        <>
            <section className="section">
                {/* <div className="card"> */}
                    <div className="body-form-add">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(data) => onSubmit(data)}
                    >
                            {formikProps => {
                                return ( 
                                    <Form>
                                        <div className="input-group">
                                            <FastField label="Áo quần" component={InputField} value={0} name="clothes" placeholder="Nhập số bộ" />
                                        </div>
                                        <div className="input-group">                                           
                                            <FastField label="Khẩu trang" component={InputField} value={0} name="mark" placeholder="Nhập số hộp" />
                                        </div>
                                        <div className="input-group">                                          
                                            <FastField label="Rau củ quả" component={InputField} value={0} name="vegetable" placeholder="Nhập số kg" />
                                        </div>
                                        <div className="input-group">                                          
                                            <FastField label="Gạo" component={InputField} value={0} name="rice" placeholder="Nhập số kg" />
                                        </div>
                                        <div className="input-group">                                          
                                            <FastField label="Mì gói" component={InputField} value={0} name="noodles" placeholder="Nhập số thùng" />
                                        </div>
                                        <div className="input-group">                                         
                                            <FastField label="Sữa" component={InputField} value={0} name="milk" placeholder="Nhập số hộp" />
                                        </div>
                                        <div className="input-group">                                          
                                            <FastField label="Trứng" component={InputField} value={0} name="egg" placeholder="Nhập số quả" />
                                        </div>
                                        <div className="input-group">                                        
                                            <FastField label="Xe tải" component={InputField} value={0} name="car" placeholder="Nhập số chiếc" />
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
                                        <MyTextArea label="Ghi chú" name="text"  onChange={(e)=>CheckText(e)}/>
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