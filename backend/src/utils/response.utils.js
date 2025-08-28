const { HTTP_STATUS, MESSAGES } = require("../config/constants");

class ResponseUtil {
  static success(
    res,
    data = null,
    message = MESSAGES.SUCCESS,
    statusCode = HTTP_STATUS.OK
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static error(
    res,
    message = MESSAGES.ERROR,
    statusCode = HTTP_STATUS.INTERNAL_ERROR,
    errors = null
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(errors && { errors }),
      timestamp: new Date().toISOString(),
    });
  }

  static paginated(res, data, pagination, message = MESSAGES.SUCCESS) {
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message,
      data,
      pagination: {
        currentPage: pagination.page,
        totalPages: pagination.totalPages,
        totalItems: pagination.totalItems,
        itemsPerPage: pagination.limit,
        hasNextPage: pagination.page < pagination.totalPages,
        hasPrevPage: pagination.page > 1,
      },
      timestamp: new Date().toISOString(),
    });
  }

  static notFound(res, message = MESSAGES.NOT_FOUND) {
    return this.error(res, message, HTTP_STATUS.NOT_FOUND);
  }

  static unauthorized(res, message = MESSAGES.UNAUTHORIZED) {
    return this.error(res, message, HTTP_STATUS.UNAUTHORIZED);
  }

  static validationError(res, errors, message = MESSAGES.VALIDATION_ERROR) {
    return this.error(res, message, HTTP_STATUS.BAD_REQUEST, errors);
  }
}

module.exports = ResponseUtil;
