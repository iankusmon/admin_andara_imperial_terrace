import shared_routes from 'routes/shared'
import super_admin_routes from 'routes/super_admin/super_admin_routes'

const routes = [
  /** Shared Routes defines pages that render data for a resource*/
  ...shared_routes,
  super_admin_routes
]

export default routes
