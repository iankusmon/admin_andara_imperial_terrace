import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Row, Col, Card, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PropTypes from 'prop-types';
import TitlePage from 'components/atoms/title-page';
import MainBannerFormMobile from '../../organisms/main-banner-form/main_banner_form_mobile';
import MainBannerMobilePreview from '../../organisms/main-banner-preview/main_banner_mobile_preview';
import CmsHomepagesSectionsMainBannersAPI from 'api/v2/admins/cms/homepages/sections-main-banners/cms-main-banner-api-v2';

const TAB = {
  PROFILE: 'profile',
};

const BannerEditPageMobile = ({ pageUtils }) => {
  const location = useLocation();
  const history = useHistory();
  
  const { id } = location.state || {};

  const [bannerData, setBannerData] = useState({});
  const [activeTab, setActiveTab] = useState(TAB.PROFILE);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleFormChange = (field, value) => {
    setBannerData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSaveBanner = async () => {
    if (!bannerData.title || !bannerData.description || !bannerData.image_url || !bannerData.link_url) {
      pageUtils.setApiErrorMsg('Silakan isi semua field yang diperlukan.');
      return;
    }

    try {
      const response = await CmsHomepagesSectionsMainBannersAPI.update(id, bannerData);
      console.log('API Response:', response);
      pageUtils.setAlertMsg('Banner telah diperbarui dengan sukses.');
      history.push('/app/super_admin/mainbannerlistpage');
    } catch (error) {
      console.error('Error saving banner data:', error.response?.data || error);
      pageUtils.setApiErrorMsg('Gagal menyimpan data banner.');
    }
  };

  const handleBackToList = () => {
    history.push('/app/super_admin/mainbannerlistpage');
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TitlePage mainTitle="Main Banner Mobile" subTitle="Edit" />
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

      <div className="mb-3">
        <Button color="secondary" onClick={handleBackToList}>
          Back to List
        </Button>
      </div>

      <TabContent activeTab={activeTab}>
        <TabPane tabId={TAB.PROFILE}>
          <Row>
            <Col md={6}>
              <Card body>
                <h5>Preview</h5>
                <MainBannerMobilePreview data={bannerData} />
              </Card>
            </Col>

            <Col md={6}>
              <Card body>
                <h5>Main Form</h5>
                <MainBannerFormMobile formData={bannerData} onFormChange={handleFormChange} />
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

BannerEditPageMobile.propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

export default BannerEditPageMobile;
