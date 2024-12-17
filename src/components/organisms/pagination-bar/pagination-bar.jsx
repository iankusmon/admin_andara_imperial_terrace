import React from 'react'
import PropTypes from 'prop-types'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import PageUtil from 'utils/page-utils'

const propTypes = {
  onClickPage : PropTypes.func,
  pagination  : PropTypes.object
}

const PaginationBar = ({
  onClickPage,
  pagination={}
}) => {

  const displayedPages = PageUtil.generatePages({ pagination })

  return (
    <Pagination aria-label="Page navigation" className='m-auto'>
      <PaginationItem>
        <PaginationLink
          first
          onClick={ () => onClickPage(1) }
        />
      </PaginationItem>
      <PaginationItem
        disabled={ pagination.current_page == 1 }
      >
        <PaginationLink
          previous
          onClick={ () => onClickPage(pagination.current_page - 1) }
        />
      </PaginationItem>
      {
        displayedPages.map((value, index) => (
          <PaginationItem
            key={ index }
            active={ (pagination.current_page == value) }
            onClick={ () => { onClickPage(value) } }
          >
            <PaginationLink >
              { value }
            </PaginationLink>
          </PaginationItem>
        ))
      }
      <PaginationItem
        disabled={ pagination.current_page == pagination.total_pages }
      >
        <PaginationLink
          next
          onClick={ () => onClickPage(pagination.current_page + 1) }
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          last
          onClick={ () => onClickPage(pagination.total_pages) }
        />
      </PaginationItem>
    </Pagination>
  )
}

PaginationBar.propTypes = propTypes

export default PaginationBar
