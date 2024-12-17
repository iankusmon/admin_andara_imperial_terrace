import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'reactstrap'


/**
 * HOC to extend loading logic to the particular component. It will show loader component if `isLoading` is true.
 * It can be used to show loading while waiting the data from the backend.
 * @example
 * const SomePage = () => {
 *    // define loading state in the implementation page
 *    const [isLoading, setLoading] = useState(true)
 *    const [sellerInbound, setSellerInbound] = useState({})
 *
 *    useEffect(() => {
 *       SellerInboundApiV2.show(id)
 *         .then((response) => {
 *           setSellerInbound(response.data.seller_inbound)
 *
 *           // It would be set `false` if `sellerInbound` is already use
 *           setIsLoading(false)
 *         })
 *        .catch((error) => {
 *          alert(error)
 *         })
 *    }, [id])
 *    ...
 *    // passing loader component
 *    const SellerInboundCardWithLoader = withLoader(SellerInboundCard, CardLoader)
 *
 * return(
 *   <SellerInboundCardWithLodaer isLoading={ isLoading } inbound={ sellerInbound }
 * )
 *
 * @param {element} WrappedComponent - Wrapped component
 * @param {element} LoaderComponent - Loader component
 */
const withLoader = (
  WrappedComponent,
  LoaderComponent
) => {

  const LoaderWrapper = ({ isLoading = true, ...props }) => {

    //*: To ease debugging in React Developer Tools, we change a display name that communicates that it’s the result of a HOC.
    LoaderWrapper.displayName = `withLoader.${getDisplayName(WrappedComponent)}`

    const isNoLoader            = !LoaderComponent
    const isLoadingWithNoLoader = isLoading && isNoLoader
    const isLoadingWithLoader   = isLoading && !isNoLoader

    if (isLoadingWithNoLoader) return <Spinner />
    if (isLoadingWithLoader) return <LoaderComponent />

    return <WrappedComponent { ...props } />
  }

  // Change the new extended component display name in React Developer Tools
  const getDisplayName = (WrappedComponent) => WrappedComponent.displayName || WrappedComponent.name || 'Component'

  LoaderWrapper.propTypes = {
    isLoading: PropTypes.bool
  }

  return LoaderWrapper
}

withLoader.propTypes = {
  WrappedComponent: PropTypes.element
}

export default withLoader
