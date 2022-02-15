import React, {useState} from "react";
import { Modal, Button } from "react-bootstrap";
import { IoMdAdd } from 'react-icons/io';
import FormTake from '../../Takes/FormTake/FormTake';
import './Take.css';

const Take = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return (
        <>
          <button className="button-add" onClick={handleShow}>
              <IoMdAdd className="icon-add"/>Muốn nhận
          </button>
          <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Muốn nhận gì ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormTake/>
            </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Xóa
            </Button>
            <Button variant="primary">Gửi</Button>
          </Modal.Footer> */}
          </Modal>
        </>
  )    
}

export default Take;