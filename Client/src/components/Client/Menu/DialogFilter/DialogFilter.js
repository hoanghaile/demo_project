import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const DialogFilter = () => {
    const [show, setShow] = useState(false);
    return (
        <>
        <Button variant="outline-primary" className="button-filter" onClick={() => setShow(true)}>
           Lọc
        </Button>

            <Modal
                size="xl"
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                   Danh sách
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Vật phẩm</th>
                            </tr>
                        </thead>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
  )    
}

export default DialogFilter;