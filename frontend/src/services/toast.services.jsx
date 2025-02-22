// src/toast.services.jsx
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
};

const ToastService = {
  success: (message) => toast.success(message, toastOptions),
  error: (message) => toast.error(message, toastOptions),
  info: (message) => toast.info(message, toastOptions),
  warning: (message) => toast.warning(message, toastOptions),
  Container: () => <ToastContainer {...toastOptions} />,
};

export default ToastService;
