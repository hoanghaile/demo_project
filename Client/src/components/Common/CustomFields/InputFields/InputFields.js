import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'react-bootstrap';
import './InputFields.css';


InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
}
InputField.defaultProps = {
    label: '',
    placeholder: '',
    disabled: false,
    options: [],
    type: 'text',
}

function InputField(props) {
    
    const {
        field, form, label, placeholder, value, type
    } = props;
    const { name } = field;
    const { errors, touched } = form;
    const ShowError = errors[name] && touched[name];
    return (
        <FormGroup className="input-field">
            {label && <label htmlFor={name} className="label-field">{label}</label>}
            <input value={value} type={type} className="auth-input form-control" {...field} placeholder={placeholder} />
            {ShowError && <p className="p-field">{errors[name]}</p>}
        </FormGroup>
    )
}

export default InputField;