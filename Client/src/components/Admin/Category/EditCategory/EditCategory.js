import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import TitleBreadcrumb from '../../../Common/TitleBreadcrumb/TitleBreadcrumb';
// import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import { Formik, Form, FastField, Field } from 'formik';
import InputField from '../../../Common/CustomFields/InputFields/InputFields';
import CategoryApi from "../../../../api/Category/categoryApi";
import BtnBack from '../../../Common/BtnBack';

const FormEdit = () => {
    
    const history = useHistory();
    const { id } = useParams();

    let initialValues = {
            _id:'',
            name: '',
    }
    const [updateCate, setUpdateCate] = useState(initialValues);

    useEffect(() => {
        const loadData = async () => {
            const res = await CategoryApi.getById(id)
            setUpdateCate(res?.data?.category)
        };
        loadData()
    },[id])

    const onSubmit = async (data) => {
        try {
            const res = await CategoryApi.updateCategory(data._id, data)
            setUpdateCate(res?.data?.category)
            history.goBack() 
            // history.push(`/admin/quan-tri/danh-sach-admin`)
        } catch (err) {
           console.log(err);
        }
        
    }

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Sửa thông tin Admin" pathHome="admin" />
                <BtnBack onClick={()=>history.goBack()}/>
                <section className="section">
                    <div className="card">
                        
                        <div className="card-body">
                            {updateCate._id !== "" ?                         
                            <Formik
                                // validationSchema={validationSchema}
                                initialValues={updateCate}
                                onSubmit={(data) => { onSubmit(data) }}
                            >
                                {formikProps => {
                                    return (
                                        <Form>
                                            <div className="row">
                                                <div className="col-sm-6 ">
                                                    <div className="">
                                                    </div>
                                                    <div className="col-sm p-4">
                                                        <div className="input-group pad-add ">
                                                            <FastField label="Họ và tên" component={InputField} name="name" placeholder="Nhập họ tên" />
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div className="    col-sm-6 ">
                                                    <div className="col-sm p-4">
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