/**
 * Standardized API Response Utilities
 */

/**
 * Send success response
 */
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * Send paginated response
 */
const paginatedResponse = (res, data, page, limit, total, message = 'Success') => {
  const totalPages = Math.ceil(total / limit);
  
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages,
      hasMore: page < totalPages
    }
  });
};

/**
 * Send error response
 */
const errorResponse = (res, message = 'Error', statusCode = 500, details = null) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
    ...(details && { details })
  });
};

/**
 * Send created response
 */
const createdResponse = (res, data, message = 'Created successfully') => {
  return successResponse(res, data, message, 201);
};

/**
 * Send no content response
 */
const noContentResponse = (res) => {
  return res.status(204).send();
};

module.exports = {
  successResponse,
  paginatedResponse,
  errorResponse,
  createdResponse,
  noContentResponse
};
