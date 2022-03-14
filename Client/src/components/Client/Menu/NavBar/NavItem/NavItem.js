import React from 'react';
import { Offcanvas } from 'react-bootstrap';
// import Collape from "../collape/Collape";

const NavItem = () => {
    return (
        <>
            <Offcanvas.Body>
                {/* <Collape /> */}

                <h3>
                    Liên Hệ
                </h3>
                <p><strong>Địa chỉ:</strong>&nbsp;Hóc Môn, Tp. Hồ Chí Minh.</p>
                <p><strong>Email:</strong>&nbsp;<a href='mailto:nckt9a.lehoanghai.@gmail.com' >nckt9a.lehoanghai.@gmail.com.</a></p>
                <p><strong>Số điện thoại:</strong>&nbsp;(+84)933511342.</p>
            </Offcanvas.Body>
        </>
    )
}

export default NavItem;