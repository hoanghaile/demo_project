import React,{useState} from 'react';
import { Modal, Button } from "react-bootstrap";
import { BsDash } from 'react-icons/bs';
import FormSend from '../FormSend/FormSend';
import './Send.css'

const Send = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button className="button-add" onClick={handleShow}>
              <BsDash className="icon-send"/>Muốn cho
            </button>
          <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Bạn muốn cho gì ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormSend/>
            </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Xóa
            </Button>
            <Button variant="primary">Lưu</Button>
          </Modal.Footer> */}
          </Modal>
        </>
    )
}

export default Send