import PropTypes from 'prop-types'
import React from 'react'
import { CardImg, Col, Container, Row } from 'reactstrap'


const propTypes = {
  title : PropTypes.string,
  lead  : PropTypes.string,
  logo  : PropTypes.string
}

const PublicHeader = ({ title, lead, logo }) => (
  <div className="header bg-gradient-info py-7 py-lg-8 pt-lg-9">
    <Container>
      <div className="header-body text-center mb-3">
        <Row className="justify-content-center">
          <Col className="px-5" lg="6" md="8" xl="5">
            {
              logo ? (
                <div className='text-center mb-3'>
                  <CardImg src={ '/tinkerlust-logo.png' }/>
                </div>
              )
                : null
            }

            { title ? (
              <h1 className="text-white">{ title }</h1>
            ) : null }
            { lead ? (
              <p className="text-lead text-white">{ lead }</p>
            ) : null }
          </Col>
        </Row>
      </div>
    </Container>

  </div>
)

PublicHeader.propTypes = propTypes

export default PublicHeader
