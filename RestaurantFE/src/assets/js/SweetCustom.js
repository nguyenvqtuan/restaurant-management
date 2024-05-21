import Swal from "sweetalert2";

export function success(title, message) {
    Swal.fire({
        title: title,
        text: message,
        icon: "success",
      });
}

export function question(title, message) {
    Swal.fire({
        title: title,
        text: message,
        icon: "question",
      });
}

export function info(title, message) {
    Swal.fire({
        title: title,
        text: message,
        icon: "info",
      });
}

export function error(title, message) {
  Swal.fire({
      title: title,
      text: message,
      icon: "error",
    });
}
