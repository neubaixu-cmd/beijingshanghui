export function notFoundHandler(req, res, next) {
  res.status(404).json({ message: 'Resource not found' });
}

export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Unexpected server error';

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(status).json({
    message,
    details: err.details || undefined,
  });
}
