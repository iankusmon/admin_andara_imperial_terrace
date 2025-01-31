import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Row, Col, Card, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PropTypes from 'prop-types';
import TitlePage from 'components/atoms/title-page';
import MainBannerForm from '../../../main-banner-section/organisms/main-banner-form/main_banner_form';
import MainBannerPreview from '../../../main-banner-section/organisms/main-banner-preview/main_banner_preview';
import CmsHomepagesSectionsMainBannersAPI from 'api/v2/admins/cms/homepages/sections-main-banners/cms-main-banner-api-v2';

const TAB = {
  PROFILE: 'profile',
};

const BannerEditPage = ({ pageUtils }) => {
  const location = useLocation();
  const history = useHistory();
  
  // Ambil data dari location state jika ada
  const { id } = location.state || {};

  // State untuk menyimpan data banner
  const [bannerData, setBannerData] = useState({});
  const [activeTab, setActiveTab] = useState(TAB.PROFILE);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data banner saat komponen dimuat
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await CmsHomepagesSectionsMainBannersAPI.show(id);
        setBannerData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching banner data:', error);
        pageUtils.setApiErrorMsg('Gagal mengambil data banner.');
        setIsLoading(false);
      }
    };

    fetchBannerData();
  }, [id, pageUtils]);

  // Update state ketika form diubah
  const handleFormChange = (field, value) => {
    setBannerData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Simpan perubahan banner
  const handleSaveBanner = async () => {
    // Cek apakah semua field yang diperlukan sudah terisi
    if (!bannerData.title || !bannerData.description || !bannerData.image_url || !bannerData.link_url) {
      pageUtils.setApiErrorMsg('Silakan isi semua field yang diperlukan.');
      return;
    }

    try {
      // Kirim data yang diperbarui ke API
      const response = await CmsHomepagesSectionsMainBannersAPI.update(id, bannerData);
      console.log('API Response:', response); // Tambahkan log untuk debugging
      pageUtils.setAlertMsg('Banner telah diperbarui dengan sukses.');
      history.push('/app/super_admin/mainbannerlistpage');
    } catch (error) {
      console.error('Error saving banner data:', error.response?.data || error);
      pageUtils.setApiErrorMsg('Gagal menyimpan data banner.');
    }
  };

  // Navigasi kembali ke halaman daftar banner
  const handleBackToList = () => {
    history.push('/app/super_admin/mainbannerlistpage');
  };

  // Ganti tab
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // Tampilkan loading saat data sedang diambil
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TitlePage mainTitle="Main Banner Dekstop" subTitle="Edit" />
      <Nav pills className="mb-3">
        <NavItem>
          <NavLink
            className={activeTab === TAB.PROFILE ? 'active' : ''}
            onClick={() => toggle(TAB.PROFILE)}
          >
            Profile
          </NavLink>
        </NavItem>
      </Nav>

      {/* Tombol kembali ke daftar */}
      <div className="mb-3">
        <Button color="secondary" onClick={handleBackToList}>
          Back to List
        </Button>
      </div>

      <TabContent activeTab={activeTab}>
        <TabPane tabId={TAB.PROFILE}>
          <Row>
            {/* Bagian Pratinjau (Kiri) */}
            <Col md={6}>
              <Card body>
                <h5>Preview</h5>
                <MainBannerPreview data={bannerData} />
              </Card>
            </Col>

            {/* Bagian Form (Kanan) */}
            <Col md={6}>
              <Card body>
                <h5>Main Form</h5>
                <MainBannerForm formData={bannerData} onFormChange={handleFormChange} />
                <Button color="primary" className="mt-3" onClick={handleSaveBanner}>
                  Save Banner
                </Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </>
  );
};

BannerEditPage.propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

export default BannerEditPage;
