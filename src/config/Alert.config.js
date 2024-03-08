import Swal from "sweetalert2";

const Alert = Swal.mixin({
  customClass: {
    confirmButton:
      "px-4 py-1 text-base rounded font-semibold cursor-pointer shadow duration-200 active:focus:scale-95 border border-green-600 bg-green-700 text-white hover:bg-green-600 disabled:hover:bg-green-700 mx-1",
    cancelButton:
      "px-4 py-1 text-base rounded font-semibold cursor-pointer shadow duration-200 active:focus:scale-95 border border-red-600 bg-red-700 text-white hover:bg-red-600 mx-1",
  },
  buttonsStyling: false,
});

export default Alert;
