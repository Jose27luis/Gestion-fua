class PaginationUtil {
  static getPagination(page, limit) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * limitNumber;

    return {
      limit: limitNumber,
      offset: offset,
      page: pageNumber,
    };
  }

  static getPaginatedData(data, page, limit) {
    const { count: totalItems, rows: items } = data;
    const currentPage = parseInt(page) || 1;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      totalItems,
      items,
      totalPages,
      currentPage,
      limit: parseInt(limit),
    };
  }

  static buildPaginationQuery(page, limit, order = [["id", "DESC"]]) {
    const pagination = this.getPagination(page, limit);

    return {
      ...pagination,
      order,
      distinct: true,
    };
  }
}

module.exports = PaginationUtil;
