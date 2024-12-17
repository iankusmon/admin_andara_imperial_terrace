import React from 'react'
import { Card, Col, Container, Row } from 'reactstrap'

const AppHome = () => (
  <Container>
    <Row>
      <Col>
        <Card>
          Customer Service
        </Card>
        <Card>
          Curation
        </Card>
        <Card>
          Outbound
        </Card>
        <Card>
          Warehouse
        </Card>
        <Card>
          Finance
        </Card>
      </Col>
    </Row>
  </Container>
)

export default AppHome
