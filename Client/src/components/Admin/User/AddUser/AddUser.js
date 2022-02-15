import React,{useState} from "react";
import { Button, Modal } from 'react-bootstrap';
import { IoMdPersonAdd } from 'react-icons/io';
import FormAdd from '../FormAdd/FormAdd';
import './AddUser.css'

const AddUser = () => {
    const [lgShow, setLgShow] = useState(false);
    return (
        <>
            <Button onClick={() => setLgShow(true)}><IoMdPersonAdd className="add-icon"/> Thêm</Button>
            <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Thêm quản trị viên
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <FormAdd/>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default AddUser;