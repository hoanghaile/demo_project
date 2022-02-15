import React from 'react';
//import PropTypes from 'prop-types';
import { useField } from "formik";

const SelectField = (label, ...props) => {
    return (
        <>
            <label className="label-field" htmlFor={props.id || props.name}>{label}</label>
            <select className="custom-select"></select>
        </>
    )
}
export default SelectField;