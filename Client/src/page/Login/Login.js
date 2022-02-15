import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
// import { Formik, Form, FastField } from "formik";
// import * as yup from 'yup';
// import InputField from '../../components/Common/CustomFields/InputFields/InputFields';
import "./Login.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/contexts/authContext";
import img from "../../assets/images/react.png";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  console.log("Hello world");
  document.title = "Đăng nhập";

  // const initialValues = {
  //     username: '',
  //     password: ''
  // }
  // const validationSchema = yup.object().shape({
  //     username: yup.string()
  //         .required('Vui lòng nhập tên người dùng')
  //         .min(8, 'Tên người dùng không được ít hơn 8 ký tự')
  //         .max(20, 'Tên người dùng hông được lớn hơn 20 ký tự'),
  //     password: yup.string()
  //         .required('Vui lòng nhập mật khẩu')
  //         .min(6, 'Mật khẩu không được ít hơn 6 ký tự')
  //         .max(20, 'Mật khẩu không được lớn hơn 20 ký tự')
  // })

  // const history = useHistory()
  const [errors, setErrors] = useState({});
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  // const [alert, setAlert] = useState(null)
  const { username, password } = loginForm;
  const onHandleChange = (data) =>
    setLoginForm({
      ...loginForm,
      [data.target.name]: data.target.value,
    });
  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        // history.push('/admin')
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="auth">
        <div className="row container-login100">
          <div className="wrap-login100">
            <Form onSubmit={login}>
              <div className="login100-form validate-form">
                <span className="login100-form-title p-b-43">Đăng nhập</span>
                <div className="wrap-input100 validate-input">
                  <div className="input-group pad-login">
                    {/* <FastField component={InputField} name="username" placeholder="Nhập tên người dùng"/> */}
                    <Form.Group>
                      <Form.Control
                        isInvalid={errors.email}
                        type="text"
                        placeholder="Nhập tên người dùng"
                        name="username"
                        value={username}
                        onChange={onHandleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="input-group pad-login">
                    {/* <FastField type="password" component={InputField} name="password" placeholder="Nhập mật khẩu" /> */}
                    <Form.Group>
                      <Form.Control
                        isInvalid={errors.password}
                        type="password"
                        name="password"
                        placeholder="Nhập password người dùng"
                        value={password}
                        onChange={onHandleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
                <div className="flex-sb-m w-full p-t-3 p-b-32">
                  <div className="contact100-form-checkbox">
                    <input
                      type="checkbox"
                      className="input-checkbox100"
                      id="ckb1"
                    />
                    <label className="label-checkbox100" htmlFor="ckb1">
                      Ghi nhớ
                    </label>
                  </div>
                  <div>
                    <Link to="/forget-password" className="txt1">
                      Quên mật khẩu ?
                    </Link>
                  </div>
                </div>
                <div className="container-login100-form-btn">
                  <button type="submit" className="login100-form-btn">
                    Đăng nhập
                  </button>
                </div>
              </div>
            </Form>
            <div className="login100-more">
              <img src={img} alt="backgroup-login" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
Login.propTypes = {
  onSubmit: PropTypes.func,
};
Login.defaultProps = {
  onSubmit: null,
};
export default Login;
