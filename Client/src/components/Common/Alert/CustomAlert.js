import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {LOCAL_STORAGE_TOKEN_NAME} from '../../contexts/constants'

const LogoutAlter = () => {
    return (
        Swal.fire({
            icon: 'warning',
            title: 'Bạn muốn đăng xuất ?',
            showDenyButton: true,
            confirmButtonColor: '#1f1498',
            confirmButtonText: 'Thoát',
            denyButtonText:'Không',
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
                Cookies.remove('_token');
                window.location.href = '/login';
            }
        })
    )
}
export const ErrorAlert = (text) => {
    return (
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: text,
            confirmButtonText: 'Nhập lại!',
            confirmButtonColor: '#435ebe',
        })
    )
}
export const sucAlert = (text) => {
  return Swal.fire({
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 1500
    })
}

export default LogoutAlter;