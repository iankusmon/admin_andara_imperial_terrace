import PropTypes from 'prop-types'
import React from 'react'
import { Col, Container, Row } from 'reactstrap'


const propTypes = {
  header   : PropTypes.any,
  children : PropTypes.any
}

const PublicPageTemplate = ({ header, children }) => (
  <div className='main-content'>
    { header }
    <Container className="mt--8 pb-5">
      <Row className="justify-content-center">
        <Col lg="5" md="7">
          { children }
        </Col>
      </Row>
    </Container>
  </div>
)

PublicPageTemplate.propTypes = propTypes

export default PublicPageTemplate
