import React from 'react';
import { useHistory } from 'react-router';

const BtnBack = () => {

    let history = useHistory()

    return (
        <button className="btn btn-primary mb-3" onClick={()=>history.goBack()}    >
            Quay lại
        </button>
    )
}

export default BtnBack;