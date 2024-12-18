import PropTypes from 'prop-types'
import React from 'react'
import { Media } from 'reactstrap'
import AdminAccessBadge from 'domains/admin/atoms/roles-badge'


const propTypes = {
  user: PropTypes.shape({
    name : PropTypes.string,
    role : PropTypes.string
  }).isRequired
}

/**
 * Refer to for usage of Media components
 * - http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/
 *
 * @param {object} user - user object
 */
const UserMedia = ({ user }) => (
  <Media className="align-items-center">
    <span className="mb-0 text-sm font-weight-bold text-capitalize">
      { user.name }
    </span>
    {
      user.role
        ? (
          <Media className="ml-2 d-none d-lg-block">
            { /* <Badge className='badge-lg' color='primary'>{ user.role }</Badge> */ }
            <AdminAccessBadge access={ user?.role } />
          </Media>
        )
        : null
    }
  </Media>
)

UserMedia.propTypes = propTypes

export default UserMedia
