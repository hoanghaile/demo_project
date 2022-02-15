import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Formik, Form, FastField, Field } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import TitleBreadcrumb from "../../../Common/TitleBreadcrumb/TitleBreadcrumb";
import InputField from '../../../Common/CustomFields/InputFields/InputFields';
import MyTextArea from '../../../Common/CustomFields/TextAreaFields/TextAreaFields';
import BtnBack from '../../../Common/BtnBack';
import sendApi from '../../../../api/Send/sendApi';

const EditSend = () => {
    const history = useHistory();
    const { id } = useParams();
    let initialValues = {
        _id: '',
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
   
    const [updateSend, setUpdateSend] = useState(initialValues);

    useEffect(() => {
        const loadData = async () => {
            const res = await sendApi.getById(id)
            // console.log(res?.data);
            setUpdateSend(res?.data?.sends)
        };
        loadData();
    }, [id])
    
    const onSubmit = async (data) => {
        try {
            const res = await sendApi.updateSend(data._id, data)
            setUpdateSend(res?.data?.sends)
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Sửa thông tin cho" />
                
                <BtnBack onClick={()=>history.goBack()}/>
                <section className="section">
                    <div className="card">
                        <div className="card-body">
                        {updateSend._id !== "" ?
                        <Formik
                            initialValues={updateSend}
                            onSubmit={(data) => { onSubmit(data) }}
                        >
                            {formikProps => {
                                return (
                                    <Form>
                                        <div className="row">
                                            <div className="col-sm-6 ">
                                                <div className="col-sm p-4">
                                                    <div className="input-group">
                                                        <FastField label="Họ và tên" component={InputField} name="name" placeholder="Nhập họ và tên" />
                                                    </div>
                                                    <div className="input-group">
                                                        <FastField label="Địa chỉ" component={InputField} name="address" placeholder="Nhập địa chỉ" />
                                                    </div>
                                                    <div className="input-group">
                                                        <FastField label="Số điện thoại" component={InputField} name="phone" placeholder="Số điện thoại" />
                                                    </div>
                                                    <div className="input-group">
                                                        <Field as="select" name="status" className="form-group-table form-select mb-3"> 
                                                            <option value={true} label="Đã cho" />
                                                            <option value={false } label="Chưa cho"/>
                                                        </Field>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 ">
                                                <div className="col-sm p-4">
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
                                                
                                                    <MyTextArea label="Ghi chú" name="text" disabled={true} />
                                                </div>
                                            </div>
                                            <div className="auth-button-footer ">
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
EditSend.propTypes = {
    onsubmit: PropTypes.func
}
EditSend.defaultProps = {
    onsubmit: null
}

export default EditSend;