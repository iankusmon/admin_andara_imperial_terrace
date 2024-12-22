import AdminListPage from 'domains/admin/pages/list-page/admin-list-page'
import CreateAdminPage from 'domains/admin/pages/admin-create-page/admin-create-page'
import UpdatePasswordPage from 'domains/admin/pages/update-password-page'
import CustomerListPage from 'domains/customer/pages/list-page/customer-list-page'
import CustomerCreatepage from 'domains/customer/pages/create-page/customer-create-page'
import CustomerEditPage from 'domains/customer/pages/customer-edit-page/customer-edit-page'
import NupListPage from 'domains/nup/pages/list-page/nup_list_page'
import NupEditPage from 'domains/nup/pages/nup-edit-page/nup_edit_page'

const super_admin_routes = {
  collapse  : true,
  path      : '/superadmin',
  name      : 'Super Admins',
  icon      : 'fas fa-poll text-blue',
  state_key : 'super_admin_collapse',
  views     : [
    {
      path      : '/super_admin/admins/create',
      name      : 'Create Admin',
      miniName  : 'C',
      component : CreateAdminPage,
      layout    : '/app'
    },
    {
      path      : '/super_admin/admins',
      name      : 'Admins',
      miniName  : 'A',
      component : AdminListPage,
      layout    : '/app'
    },
    {
      path      : '/super_admin/customer',
      name      : 'Customer',
      miniName  : 'CST',
      component : CustomerListPage,
      layout    : '/app'
    },
    {
      path      : '/super_admin/customer/create',
      name      : 'Create Customer',
      miniName  : 'CCST',
      component : CustomerCreatepage,
      layout    : '/app'
    },
    {
      path      : '/super_admin/customer/edit/:id',
      name      : 'Update Customer',
      miniName  : 'CCSU',
      component : CustomerEditPage,
      layout    : '/app',
      invisible : true
    },
    {
      path      : '/super_admin/nups',
      name      : 'NUP',
      miniName  : 'A',
      component : NupListPage,
      layout    : '/app'
    },
    {
      path      : '/super_admin/nups/edit/:id',
      name      : 'Update NUP',
      miniName  : 'UNUP',
      component : NupEditPage,
      layout    : '/app',
      invisible : true
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

export default super_admin_routes
