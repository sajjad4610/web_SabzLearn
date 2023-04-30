
import Swal from "sweetalert2";

export default function ToastMessage(message='',error='') {

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 7000,
    timerProgressBar: true,
    background:'#123459',
    color:'#fff',

    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  if(message){
    Toast.fire({
      icon: "success",
      title:message ,
    });
  }
  if(error){
    Toast.fire({
      icon: "error",
      title:error ,
    });
  }

}
