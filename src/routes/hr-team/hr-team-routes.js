import AdminListPage from 'domains/admin/pages/list-page/admin-list-page'
import CreateAdminPage from 'domains/admin/pages/admin-create-page/admin-create-page'
import UpdatePasswordPage from 'domains/admin/pages/update-password-page'

const hr_team_routes = {
  collapse  : true,
  path      : '/hr',
  name      : 'Super Admin Team',
  icon      : 'fas fa-poll text-blue',
  state_key : 'hr_team_collapse',
  views     : [
    {
      path      : '/hr/admins/create',
      name      : 'Create Admin',
      miniName  : 'C',
      component : CreateAdminPage,
      layout    : '/app'
    },
    {
      path      : '/hr/admins',
      name      : 'Admins',
      miniName  : 'A',
      component : AdminListPage,
      layout    : '/app'
    },
    {
      path      : '/update-password',
      name      : 'Update Password',
      miniName  : 'R',
      component : UpdatePasswordPage,
      layout    : '/app',
      redirect  : true
    }
  ]
}

export default hr_team_routes
