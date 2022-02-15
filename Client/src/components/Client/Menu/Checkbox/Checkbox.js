import React from 'react';
import { Accordion } from 'react-bootstrap';

const CheckBox = () => {
  // const [isCheckAll, setIsCheckAll] = useState(false);
  // const [isCheck, setIsCheck] = useState([]);
  // const handleCheckAll = (e) => {
  //   setIsCheckAll(!isCheckAll);
  //   setIsCheck(lis)
  // }
    return (
        <>
          <Accordion.Body>
            <ul className="ul-sidebar">
              <li className="li-sidebar">
                <input className="form-check-input" type="checkbox" id="0"/>
                <label className="form-check-label ml-5" htmlFor="0" >Tất cả</label>
              </li>
              <li className="li-sidebar">
                <input className="form-check-input" type="checkbox" id="1"/>
                <label className="form-check-label ml-5" htmlFor="1" >Quần áo</label>
              </li>
              <li className="li-sidebar">
                <input className="form-check-input" type="checkbox" id="2"/>
                <label className="form-check-label ml-5" htmlFor="2" >Khẩu trang</label>
              </li>
            </ul>
            </Accordion.Body>
        </>
    )
}
export default CheckBox;