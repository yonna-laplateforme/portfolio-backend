export const sendSuccess = (res, message, data = null, statusCode = 200) => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data
  });
};