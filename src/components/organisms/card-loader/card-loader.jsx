import SkeletonLoader from 'components/atoms/skeleton-loader'
import React from 'react'
import { Card, CardBody } from 'reactstrap'


/**
 * Animated loading skeletons to mimic the content in the card
 */
const CardLoader = () => (
  <Card>
    <CardBody>
      <SkeletonLoader width={ '20%' } />
      <SkeletonLoader width={ '100%' } />
      <SkeletonLoader width={ '100%' } />
    </CardBody>
  </Card>
)

export default CardLoader
