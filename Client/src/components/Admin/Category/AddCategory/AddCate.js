import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IoMdPersonAdd, IoMdAdd } from 'react-icons/io';
import FormAddCate from '../FormAddCate/FormAddCate';
const AddCate = () => {
    const [lgShow, setLgShow] = useState(false);
    return (
        <>
            <Button onClick={() => setLgShow(true)}><IoMdAdd className="add-icon"/> Thêm</Button>
            <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Thêm hàng hóa
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <FormAddCate/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddCate;