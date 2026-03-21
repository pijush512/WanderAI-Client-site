import Swal from 'sweetalert2';

export const toast = (message: string, icon: 'success' | 'error' | 'warning' | 'info') => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  
  Toast.fire({
    icon: icon,
    title: message
  });
};

export const showAlert = (title: string, text: string, icon: 'success' | 'error') => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonColor: '#2563eb', // আপনার ব্লু থিমের সাথে মিল রেখে
  });
};