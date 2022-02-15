import React from "react";
// import PropTypes from 'prop-types';
import { useField } from "formik";
import './TextAreaFields.css'


const MyTextArea = ({ label, ...props }) => {

    const [field, meta] = useField(props);
    return (
        <>
            <label className="label-field" htmlFor={props.id || props.name}>{label}</label>
            <textarea className="text-area" {...props}{...field}  />
            {meta.touched && meta.errors ? (<div className="error">{meta.error}</div>) : null}
        </>
    )
}
export default MyTextArea;