import AdminListPage from 'domains/admin/pages/list-page/admin-list-page'
import CreateAdminPage from 'domains/admin/pages/admin-create-page/admin-create-page'
import UpdatePasswordPage from 'domains/admin/pages/update-password-page'
import CustomerListPage from 'domains/customer/pages/list-page/customer-list-page'
import CustomerCreatepage from 'domains/customer/pages/create-page/customer-create-page'
import CustomerEditPage from 'domains/customer/pages/customer-edit-page/customer-edit-page'
import NupListPage from 'domains/nup/pages/list-page/nup_list_page'
import NupEditPage from 'domains/nup/pages/nup-edit-page/nup_edit_page'
import BookingFeeListPage from 'domains/booking-fee/pages/list-page/booking_fee_list_page'
import BookingFeeEditPage from 'domains/booking-fee/pages/booking-fee-edit-page/booking_fee_edit_page'
import DownPaymentListPage from 'domains/down-payment/pages/list-page'
import DownPaymentEditPage from 'domains/down-payment/pages/down-payment-edit-page'
import AjbDocumentListPage from 'domains/ajb-document/pages/ajb-document-list-page/ajb_document_list_page'
import PpjbDocumentListPage from 'domains/ppjb-document/pages/ppjb-document-list-page/ppjb_document_list_page'
import ArticleCreatePage from 'domains/article/pages/article-create-page/article_create_page'
import ArticleListPage from 'domains/article/pages/list-page'
import ArticleEditPage from 'domains/article/pages/article-edit-page'
import Homepage from 'domains/landingpage/homepage/pages/list-page'
import LandingPageListPage from 'domains/landingpage/pages/list-page'
import MainBannerListPage from 'domains/landingpage/homepage/main-banner-section/pages/list-page'
import { BannerEditPage, BannerEditPageMobile } from 'domains/landingpage/homepage/main-banner-section/pages/main-banner-edit-page/index';
import LandmarkBannerEditPage from 'domains/landingpage/homepage/landmark-banner-section/pages/landmark-banner-page/landmark-banner_edit_page'
import LandownerListPage from 'domains/land-owner/pages/list-page'
import LandownerDetailPage from 'domains/land-owner/pages/land-owner-detail-page/land_owner_detail_page'
import  {SurveyCalonCustomerPage , KomisiPage, RewardPage, RiwayatWithdraw,DashboardAgentAffiliate} from 'domains/agen-affiliate/pages/list-page/index' 
import {SurveyCalonCustomerDetailPage,RiwayatTransaksiSurveyCalonCustomerDetailPage,KomisiDetailPage,UploadBuktiTransferKomisiDetailPage , DetailRewardPage,UploadBuktiTransferRewardDetailPage,DetailPencapaianReward} from 'domains/agen-affiliate/pages/agen-affiliate-detail-page/index'


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
      miniName  : 'N',
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
      path      : '/super_admin/booking_fees',
      name      : 'Booking Fee',
      miniName  : 'BF',
      component : BookingFeeListPage,
      layout    : '/app'
    },
    {
      path      : '/super_admin/booking_fees/edit/:id',
      name      : 'Update Booking Fee',
      miniName  : 'UBF',
      component : BookingFeeEditPage,
      layout    : '/app',
      invisible : true
    },
    {
      path      : '/super_admin/down_payments',
      name      : 'Down Payment',
      miniName  : 'DP',
      component : DownPaymentListPage,
      layout    : '/app'
    },
    {
      path      : '/super_admin/down_payments/edit/:id',
      name      : 'Update Down Payment',
      miniName  : 'UDP',
      component : DownPaymentEditPage,
      layout    : '/app',
      invisible : true
    },
    {
      path      : '/super_admin/ajb_documents',
      name      : 'Dokumen AJB',
      miniName  : 'AJB',
      component : AjbDocumentListPage,
      layout    : '/app'
    },
    {
      path      : '/super_admin/ppjb_documents',
      name      : 'Dokumen PPJB',
      miniName  : 'PJB',
      component : PpjbDocumentListPage,
      layout    : '/app'
    },
    {
      path      : '/super_admin/articles',
      name      : 'Article',
      miniName  : 'ART',
      component : ArticleListPage,
      layout    : '/app'
    },
    {
      path      : '/super_admin/articles/create',
      name      : 'Create Article',
      miniName  : 'CRT',
      component : ArticleCreatePage,
      layout    : '/app'
    },
    {
      path      : '/super_admin/articles/edit/:id',
      name      : 'Update Articles',
      miniName  : 'UART',
      component : ArticleEditPage,
      layout    : '/app',
      invisible : true
    },
    {
      path      : '/super_admin/landowner',
      name      : 'Land Owner',
      miniName  : 'LO',
      component : LandownerListPage,
      layout    : '/app',
      // invisible : true
    },
    {
      path      : '/super_admin/landowner-detail',
      name      : 'Land Owner Detail',
      miniName  : 'LOD',
      component :  LandownerDetailPage,
      layout    : '/app',
      invisible : true
    },
    {
      path      : '/super_admin/dashboard-affiliate-page',
      name      : 'Dashboard Affiliate Page',
      miniName  : 'AA',
      component : DashboardAgentAffiliate,
      layout    : '/app',
      // invisible : true
    },
    {
      path      : '/super_admin/survey_calon_customer',
      name      : 'Survey Calon Customer Page',
      miniName  : 'AA',
      component : SurveyCalonCustomerPage,
      layout    : '/app',
      // invisible : true
    },
    {
      path      : '/super_admin/surveycaloncustomer/:id',
      name      : 'Survey Calon Customer Detail Page',
      miniName  : 'AADP',
      component : SurveyCalonCustomerDetailPage,
      layout    : '/app',
      invisible : true
    },
   
    {
      path      : '/super_admin/riwayattransaksisurveycaloncustomer/:id',
      name      : 'Riwayat Transaksi Survey Calon Customer Detail Page',
      miniName  : 'AADP',
      component : RiwayatTransaksiSurveyCalonCustomerDetailPage,
      layout    : '/app',
      invisible : true
    },
    {
      path      : '/super_admin/komisi',
      name      : 'komisi',
      miniName  : 'AA',
      component :  KomisiPage,
      layout    : '/app',
    },
    {
      path      : '/super_admin/komisidetailpage/:id',
      name      : 'KomisiDetailPage',
      miniName  : 'AA',
      component :  KomisiDetailPage,
      layout    : '/app',
      invisible : true
    },
    {
      path      : '/super_admin/transaction_history/:id',
      name      : 'UploadBuktiTransferKomisiDetailPage',
      miniName  : 'AA',
      component :  UploadBuktiTransferKomisiDetailPage,
      layout    : '/app',
      invisible : true
    },
    {
      path      : '/super_admin/reward',
      name      : 'Reward',
      miniName  : 'R',
      component :  RewardPage,
      layout    : '/app',
    },
    {
      path      : '/super_admin/detail-reward-page/:id',
      name      : 'detail reward page',
      miniName  : 'DRP',
      component :  DetailRewardPage,
      layout    : '/app',
      invisible : true
    },
    {
      path      : '/super_admin/upload-bukti-transfer-reward-detail-page/:id',
      name      : 'detail reward page',
      miniName  : 'DRP',
      component :  UploadBuktiTransferRewardDetailPage,
      layout    : '/app',
      invisible : true
    },
    {
      path      : '/super_admin/detail-pencapaian-reward/:id',
      name      : 'detail pencapaian reward ',
      miniName  : 'DRP',
      component :  DetailPencapaianReward,
      layout    : '/app',
      invisible : true
    },
    {
      path      : '/super_admin/riwayat-withdraw',
      name      : 'riwayat withdraw ',
      miniName  : 'RW',
      component : RiwayatWithdraw,
      layout    : '/app',
      // invisible : true
    },
    {
      path      : '/super_admin/landingpagelist',
      name      : 'Landing Page List',
      miniName  : 'LP',
      component :  LandingPageListPage,
      layout    : '/app'
    },
    {
      path      : '/super_admin/homepage',
      name      : 'Home Page',
      miniName  : 'HP',
      component :  Homepage,
      layout    : '/app'
    },
    {
      path      : '/super_admin/mainbannerlistpage',
      name      : 'Main Banner List Page',
      miniName  : 'HP',
      component :  MainBannerListPage,
      layout    : '/app',
      invisible : true
    },
    {
      path      : '/super_admin/bannerEditPage/:id',
      name      : 'Banner Edit Page',
      miniName  : 'HP',
      component :  BannerEditPage,
      layout    : '/app',
      invisible : true
    },
    {
      path      : '/super_admin/bannerEditMobilePage/:id',
      name      : 'Banner Edit Page Mobile',
      miniName  : 'BEPM',
      component :  BannerEditPageMobile,
      layout    : '/app',
      invisible : true
    },
    {
      path      : '/super_admin/landmarkBannerEditPage',
      name      : 'LandmarkBannerEditPage',
      miniName  : 'LKBE',
      component :  LandmarkBannerEditPage,
      layout    : '/app',
      // invisible : true
    },
    {
      path      : '/update-password',
      name      : 'Update Password',
      miniName  : 'R',
      component : UpdatePasswordPage,
      layout    : '/app',
      redirect  : true
    },
    {
      path      : '/update-password',
      name      : 'Update Password',
      miniName  : 'R',
      component : UpdatePasswordPage,
      layout    : '/app',
      redirect  : true
    },
  ]
}

export default super_admin_routes
