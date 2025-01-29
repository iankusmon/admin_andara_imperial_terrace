import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Row, Col, Card, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PropTypes from 'prop-types';
import TitlePage from 'components/atoms/title-page';
import MainBannerForm from '../../../main-banner-section/organisms/main-banner-form/main_banner_form'; // Ganti dengan MainBannerForm
import MainBannerPreview from '../../../main-banner-section/organisms/main-banner-preview/main_banner_preview'; // Ganti dengan MainBannerPreview

const TAB = {
  PROFILE: 'profile',
};

const BannerEditPage = ({ pageUtils }) => {
  const location = useLocation();
  const history = useHistory();
  
  // Ambil data dari location state jika ada
  const { id, platform } = location.state || {};
  const [bannerData, setBannerData] = useState({
    id: id || '1', // Default value jika tidak ada ID
    platform: platform || 'web', // Default ke 'web' jika platform tidak ada
    name: 'Sample Banner Name', // Dummy data
    order: 1,
    is_active: 'enabled', // Dummy value
    alt_text: 'This is a sample banner', // Dummy data
    seo_title: 'SEO Sample Title', // Dummy data
    image_urls: ['https://via.placeholder.com/150'], // Dummy data
    url: 'https://example.com', // Dummy URL
    header_text: 'Welcome to Our Website', // Dummy data
    title_text: 'Amazing Deals Await You!', // Dummy data
    button_text: 'Learn More', // Dummy data
    caption_text: 'Hurry, limited-time offer!', // Dummy data
    created_at: '2023-01-01', // Dummy date
    updated_at: '2023-01-15', // Dummy date
    location: 'banner', // Default value
  });
  const [activeTab, setActiveTab] = useState(TAB.PROFILE);

  // Update state ketika form diubah
  const handleFormChange = (data) => {
    setBannerData((prev) => ({
      ...prev,
      ...data,
    }));
    console.log('Updated Banner Data:', { ...bannerData, ...data });
  };

  // Dummy simpan banner
  const handleSaveBanner = () => {
    if (!bannerData.name || !bannerData.title_text || !bannerData.image_urls.length) {
      pageUtils.setApiErrorMsg('Please fill in all required fields.');
      return;
    }
    console.log('Banner Data to Save:', bannerData);
    pageUtils.setAlertMsg('Banner has been updated successfully (Dummy Mode).');
    history.push('/app/super_admin/banners'); // Navigasi kembali ke daftar banner setelah simpan
  };

  // Navigasi kembali ke halaman daftar banner
  const handleBackToList = () => {
    history.push('/app/super_admin/banners');
  };

  // Ganti tab
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <>
      <TitlePage mainTitle="Main Banner" subTitle="Edit" />
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

      {/* Back to List Button */}
      <div className="mb-3">
        <Button color="secondary" onClick={handleBackToList}>
          Back to List
        </Button>
      </div>

      <TabContent activeTab={activeTab}>
        <TabPane tabId={TAB.PROFILE}>
          <Row>
            {/* Preview Section (Left) */}
            <Col md={6}>
              <Card body>
                <h5>Preview</h5>
                <MainBannerPreview data={bannerData} />
              </Card>
            </Col>

            {/* Form Section (Right) */}
            <Col md={6}>
              <Card body>
                <h5>Main Form</h5>
                <MainBannerForm data={bannerData} onSubmit={handleFormChange} />
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
