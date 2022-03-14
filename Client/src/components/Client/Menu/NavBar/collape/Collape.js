import React, { useState } from "react";

import { Collapse } from "react-bootstrap";


const Collape = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <h3>Menu</h3>
            <a href="#" className="text-justify " onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="example-collapse-text">sadasdasd</a>
            <Collapse in={open}>
                <div aria-controls="example-collapse-text">
                    <ul>
                        <li><a href="#">fdsf</a></li>
                        <li><a href="#">fdsf</a></li>
                    </ul>
                </div>
            </Collapse >
        </>
    )

}

export default Collape;