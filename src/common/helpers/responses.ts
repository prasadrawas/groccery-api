export const SendSuccessResponse = (data: any, message?: string) => {
  return {
    status: 'success',
    count: data.length,
    message: message,
    data: data,
  };
};

export const SendErrorResponse = (value: string) => {
  return {
    status: 'error',
    message: value,
  };
};

export const SendNotFoundResponse = (value: string) => {
  return {
    status: 'error',
    message: `${value} not found`,
  };
};

export const serverErrorResponse = (error: any) => {
  return {
    status: 'error',
    data: error,
  };
};

export const validationErrorResponse = (message: string) => {
  return {
    status: 'error',
    message: message,
  };
};

export const invalidObjectId = {
  status: 'error',
  message: 'Not a valid ID',
};
