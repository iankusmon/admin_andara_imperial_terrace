import shared_routes from 'routes/shared'
import hr_team_routes from 'routes/hr-team/hr-team-routes'

const routes = [
  /** Shared Routes defines pages that render data for a resource*/
  ...shared_routes,
  hr_team_routes
]

export default routes
