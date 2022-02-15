import React from 'react';

const Checkbox = ({id, type, name, handleClick, isChecked}) => {
    return (
        <>
            <input
                id={id}
                name={name}
                type={type}
                handleClick={handleClick}
                isChecked={isChecked}
            />
        </>
    )
}
export default Checkbox;