import Swal from "sweetalert2";

export const loginSuccess = ({info}) => {
  return info === null ? null :  (
    Swal.mixin({
      toast: true,
      icon: 'success',
      position: 'top-end',
      showConfirmButton: false,
      title: 'Đăng nhập thành công',
      timerProgressBar: true,
      timer: 2000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
  )
}



export const loginWarning = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
loginWarning.fire({
    icon: 'warning',
    title: 'Đăng nhập thất bại'
})