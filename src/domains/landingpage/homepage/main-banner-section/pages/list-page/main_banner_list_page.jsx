import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; 
import { Card, Row, Col } from 'reactstrap';
import TitlePage from 'components/atoms/title-page';
import { MainBannerTable, MobileMainBannerTable } from 'domains/landingpage/homepage/main-banner-section/organisms/table';
import PropTypes from 'prop-types';
import CmsHomepagesSectionsMainBannersAPI from 'api/v2/admins/cms/homepages/sections-main-banners/cms-main-banners-api-v2';

const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

const MainBannerListPage = ({ pageUtils }) => {
  const [mainBanners, setMainBanners] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  // Fungsi Fetch Data dari API
  const handleFetchMainBanners = async (tableState) => {
    setIsLoading(true);
    try {
      const response = await CmsHomepagesSectionsMainBannersAPI.get({ tableState, filters: {} });
      console.log("API Response:", response.data);

      if (response && response.data) {
        const rawData = response.data.map(item => ({
          ...item,
          section: item.section || 'web',
        }));
        setMainBanners(rawData);
        setPagination({
          pageIndex: tableState.pageIndex || 1,
          pageSize: tableState.pageSize || 10,
          totalCount: rawData.length,
        });
      }
    } catch (error) {
      console.error("Error fetching main banners:", error);
      if (pageUtils?.setApiErrorMsg) {
        pageUtils.setApiErrorMsg("Gagal mengambil data banner.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Panggil API saat komponen pertama kali dimuat
  useEffect(() => {
    handleFetchMainBanners({ pageIndex: 1, pageSize: 10 });
  }, []);

  // Navigasi ke halaman edit banner
  const handleSelectRow = useCallback((datum) => {
    const { id, section } = datum;
    let path;
  
    // Tentukan path berdasarkan section (web/mobile)
    if (section === "mobile") {
      path = `/app/super_admin/bannerEditMobilePage/${id}`;
    } else {
      path = `/app/super_admin/bannerEditPage/${id}`;
    }
  
    console.log("Navigating to:", path);  // Log URL yang akan dituju
    history.push(path);  // Arahkan ke URL yang sesuai
  }, [history]);
  

  // Filter Data untuk Web dan Mobile Sections
  const webBanners = mainBanners.filter((banner) => banner.section === 'web');
  const mobileBanners = mainBanners.filter((banner) => banner.section === 'mobile');

  // Jika mobile banners kosong, gunakan data web
  const combinedBanners = mobileBanners.length ? mobileBanners : webBanners;

  return (
    <>
      <TitlePage mainTitle="Main Banners" subTitle="List" />

      <Row>
        <Col lg={6}>
          <Card>
            <h5 className="p-3">Web Section</h5>
            <MainBannerTable
              data={webBanners}
              pagination={pagination}
              onFetchData={handleFetchMainBanners}
              isLoading={isLoading}
              rowButtonProps={{
                buttonText: 'View',
                buttonColour: 'primary',
                onButtonClick: handleSelectRow,
              }}
            />
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <h5 className="p-3">Mobile Section</h5>
            <MobileMainBannerTable
              data={combinedBanners}
              pagination={pagination}
              onFetchData={handleFetchMainBanners}
              isLoading={isLoading}
              rowButtonProps={{
                buttonText: 'View',
                buttonColour: 'primary',
                onButtonClick: handleSelectRow,
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

MainBannerListPage.propTypes = propTypes;
export default MainBannerListPage;
