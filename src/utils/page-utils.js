const PageUtil = {
  paginate: (responses, pagination) => {
    const current_page = pagination.current_page
    const per_page     = pagination.per_page
    const total_count  = responses.length
    const total_pages  = Math.ceil(total_count / per_page)
    const next_page    = current_page < total_pages ? current_page + 1 : null
    const prev_page    = current_page - 1 > 0 ? current_page - 1 : null

    return ({
      current_page : current_page,
      per_page     : per_page,
      total_count  : total_count,
      total_pages  : total_pages,
      next_page    : next_page,
      prev_page    : prev_page
    })
  },
  generatePages: ({
    pagination = {
      total_pages  : 0,
      current_page : 1
    }
  }) => {
    const totalPages  = pagination.total_pages
    const currentPage = pagination.current_page
    let minPage       = 1
    let maxPage       = 5
    const maxSize     = 5
    const middleIndex = 3

    const isTotalPageLessThanMaxPage          = totalPages < maxSize
    const isTotalPageGreaterThanMaxPage       = totalPages >= maxSize
    const isCurrentPageLessThanTotalPage      = currentPage <= totalPages
    const isCurrentPageGreaterThanMiddleIndex = currentPage > middleIndex

    const pageArray = (minPage, maxPage) => {
      var arr = []
      while (minPage <= maxPage){
        arr.push(minPage++)
      }
      return arr
    }

    if (isTotalPageLessThanMaxPage) {
      maxPage = totalPages
      return pageArray(minPage, maxPage)
    }

    if (
      isTotalPageGreaterThanMaxPage
        && isCurrentPageLessThanTotalPage
        && isCurrentPageGreaterThanMiddleIndex
    ) {
      minPage = currentPage - 2
      maxPage = currentPage + 2
    }

    const isMaxPageGreaterThanTotalPages = maxPage >= totalPages

    if (isMaxPageGreaterThanTotalPages) {
      maxPage = totalPages
      minPage = maxPage - 4
    }


    return pageArray(minPage, maxPage)
  }
}

export default PageUtil