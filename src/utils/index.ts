import type { AxiosError } from 'axios';

// eslint-disable-next-line import/prefer-default-export
export function isValidationError(error: AxiosError): boolean {
  return error.response?.status === 400 && error.response?.data.code === 'ValidationError';
}
