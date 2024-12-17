import React from 'react'
import {
  Label,
  Input,
  Button,
  InputGroupAddon,
  InputGroup
} from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  title          : PropTypes.string,
  placeholder    : PropTypes.string,
  handleOnChange : PropTypes.func,
  handleOnBlur   : PropTypes.func,
  handleOnClick  : PropTypes.func,
  className      : PropTypes.string
}

/**
 * Multipurpose search bar
 * @param {string} title - Title of the search bar
 * @param {string} placeholder - placeholder text in the input
 * @param {func} handleOnChange - Handler set the search input
 * @param {func} handleOnBlur - Handler trigger searching when the search input is getting blur (untouch)
 * @param {func} handleOnClick - Handler trigger searching if clicking the search button
 * @returns
 */
const SearchBar = ({
  title,
  placeholder,
  handleOnChange,
  handleOnBlur,
  handleOnClick,
  className,
  ...props
}) => {
  const handleKeyDown = (event) => {
    // if user press enter
    if (event.keyCode === 13) {
      event.preventDefault()
      handleOnClick(event.target.value)
    }
  }

  const handleClickButton = () => {
    const inputValue = document.getElementById('search-field').value
    handleOnClick(inputValue)
  }

  return (
    <div className={ className }>
      {
        title && (<Label>{ title }</Label>)
      }
      <InputGroup className="no-border">
        <Input
          { ...props }
          id='search-field'
          defaultValue=""
          type="text"
          placeholder={ placeholder }
          onChange={ handleOnChange }
          onFocus={ (event) => event.target.select() }
          onBlur={ handleOnBlur }
          onKeyDown={ handleKeyDown }
        />
        <InputGroupAddon addonType="append">
          <Button
            color='primary'
            outline
            className='mt-0 mb-0'
            onClick={ handleClickButton }
          >
            <i className="fa fa-search" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

SearchBar.propTypes = propTypes

export default SearchBar
