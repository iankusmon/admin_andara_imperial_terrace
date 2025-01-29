import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router';
import { Row, Col, Card, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PropTypes from 'prop-types';
import TitlePage from 'components/atoms/title-page';
import LandmarkBannerForm from '../../organisms/landmark-banner-form/landmark_banner_form';
import LandmarkBannerPreview from '../../organisms/landmark-banner-preview/landmark_banner_preview';

// Data Dummy API
const BannerApi = {
  show: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id,
            name: 'Sample Banner',
            location: 'Homepage',
            platform: 'web', // Dummy default platform
            title_text: 'Amazing Deals!',
            caption_text: 'Shop now and save big!',
            header_text: 'Welcome to Our Store',
            button_text: 'Learn More',
            url: 'https://example.com',
            seo_title: 'SEO Optimized Banner',
            order: 1,
            is_active: 'YES',
            subtitle_text: 'Limited Time Offer',
            background_color: '#ffcc00',
            image_files: [
              'https://via.placeholder.com/600x300',
              'https://via.placeholder.com/600x300/FF0000/FFFFFF',
            ], // Dummy default 2 gambar
          },
        });
      }, 1000); // Simulasi delay API
    });
  },
  update: (id, payload) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Payload yang disimpan:', payload);
        resolve({ message: 'Data updated successfully' });
      }, 1000); // Simulasi delay API
    });
  },
};

const TAB = {
  PROFILE: 'profile',
};

const LandmarkBannerEditPage = ({ pageUtils }) => {
  const [bannerData, setBannerData] = useState({
    name: '',
    location: '',
    platform: '',
    title_text: '',
    caption_text: '',
    header_text: '',
    button_text: '',
    url: '',
    seo_title: '',
    order: 1,
    is_active: 'YES',
    subtitle_text: '',
    background_color: '#ffffff',
    image_files: [],
  });
  const [activeTab, setActiveTab] = useState(TAB.PROFILE);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  // Fetch data banner menggunakan data dummy
  useEffect(() => {
    setIsLoading(true);

    // Cek apakah platform diteruskan melalui state
    const platformFromState = location.state?.platform || 'web';

    BannerApi.show(id)
      .then((response) => {
        console.log('Data banner dari dummy API:', response.data); // Debugging
        setBannerData({
          ...response.data,
          platform: platformFromState, // Gunakan platform dari state jika ada
        });
      })
      .catch((error) => {
        console.error('Gagal mengambil banner:', error);
        pageUtils.setApiErrorMsg('Failed to fetch banner (Dummy API)');
      })
      .finally(() => setIsLoading(false));
  }, [id, location.state, pageUtils]);

  // Update state ketika form diubah
  const handleFormChange = (data) => {
    setBannerData((prev) => {
      const updatedData = { ...prev, ...data };

      // Pastikan maksimal 6 gambar di image_files
      if (updatedData.image_files.length > 6) {
        pageUtils.setApiErrorMsg('You can only upload up to 6 images.');
        updatedData.image_files = updatedData.image_files.slice(0, 6);
      }

      console.log('State bannerData diperbarui:', updatedData); // Debugging
      return updatedData;
    });
  };

  // Simpan banner menggunakan data dummy
  const handleSaveBanner = () => {
    const payload = { ...bannerData };

    BannerApi.update(id, payload)
      .then(() => {
        pageUtils.setAlertMsg('Banner has been updated successfully (Dummy API).');
        return BannerApi.show(id); // Ambil data terbaru dari dummy API setelah update
      })
      .then((response) => {
        console.log('Data terbaru setelah save:', response.data); // Debugging
        setBannerData(response.data); // Update state dengan data dummy terbaru
      })
      .catch((error) => {
        console.error('Failed to save banner:', error);
        pageUtils.setApiErrorMsg('Failed to save banner (Dummy API)');
      });
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
      <TitlePage mainTitle="Landmark Banner" subTitle="Edit" />
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
                <LandmarkBannerPreview data={bannerData} />
              </Card>
            </Col>

            {/* Form Section (Right) */}
            <Col md={6}>
              <Card body>
                <h5>Main Form</h5>
                <LandmarkBannerForm data={bannerData} onChange={handleFormChange} />
                <Button
                  color="primary"
                  className="mt-3"
                  onClick={handleSaveBanner}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Banner'}
                </Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </>
  );
};

LandmarkBannerEditPage.propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

export default LandmarkBannerEditPage;
