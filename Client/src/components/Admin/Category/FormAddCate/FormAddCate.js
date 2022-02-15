import React from "react";
import PropTypes from 'prop-types';
import { Formik, Form, FastField } from 'formik';
import InputField from "../../../Common/CustomFields/InputFields/InputFields";
import CateApi from "../../../../api/Category/categoryApi";

const FormAddCate = () => {
    const initialValues = {
        name: ''
    }     
    const onSubmit = async (data) => {
        // console.log(data, 23432432432);
        await CateApi.addCategory({ ...data });
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={(data)=>onSubmit(data)}
            >
                {formikProps => {
                    return (
                        <Form>
                            <div className="row">
                                <div className="col-sm-6 ">
                                    <div className="col-sm p-4">
                                        <div className="input-group pad-add ">
                                            <FastField label="Tên mặt hàng" component={InputField} name="name" placeholder="Nhập tên mặt hàng" />
                                        </div>
                                    </div>
                                </div>
                                <div className="auth-button-footer pad-4">
                                <button type="reset" className="btn btn-danger mr-5">Xóa</button>
                                <button type="submit" className="btn btn-primary ">Lưu</button>
                            </div>
                            </div>
                        </Form>       
                    )
                }}
            </Formik>
        </>
    )
}
 

FormAddCate.propTypes = {
    onsubmit: PropTypes.func
}
FormAddCate.defaultProps = {
    onsubmit: null
}

export default FormAddCate;