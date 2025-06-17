import {useState} from 'react';
import ModalMessage from '../components/ModalMessage';

export const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const requestHandler = async ({
    requestFn,
    onSuccess,
    onError,
    successMessage,
  }) => {
    try {
      setIsLoading(true);

      const res = await requestFn();

      if (successMessage && res) {
        ModalMessage('Success!', successMessage, 'success');
      }
      onSuccess?.(res);
    } catch (err) {
      let message = 'Something went wrong!';
      if (err.response) {
        switch (err.response.status) {
          case 401:
            message = 'Unauthorized. Please log in again.';
            break;
          case 403:
            message = 'Forbidden request.';
            break;
          case 500:
            message = 'Server error. Try again later.';
            break;
          default:
            message = err.response.data?.error?.message || message;
        }
      }

      ModalMessage('Error!', message, 'error');
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {isLoading, requestHandler};
};
