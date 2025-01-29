import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import { Card, Row, Col } from 'reactstrap';
import TitlePage from 'components/atoms/title-page';
import { MainBannerTable, MobileMainBannerTable } from 'domains/landingpage/homepage/main-banner-section/organisms/table'; // Pastikan path benar
import PropTypes from 'prop-types';

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

  // Simulasi Fetch Data dari Server
  const handleFetchMainBanners = (tableState) => {
    setIsLoading(true);

    const dummyData = [
      { id: 1, title: 'Web Banner 1', category: 'Promo', url: '/promo-1', active_status: 'active', section: 'web' },
      { id: 2, title: 'Web Banner 2', category: 'Seasonal', url: '/promo-2', active_status: 'inactive', section: 'web' },
      { id: 3, title: 'Mobile Banner 1', category: 'Promo', url: '/mobile-1', active_status: 'active', section: 'mobile' },
      { id: 4, title: 'Mobile Banner 2', category: 'Seasonal', url: '/mobile-2', active_status: 'inactive', section: 'mobile' },
    ];

    setTimeout(() => {
      setMainBanners(dummyData.slice(0, tableState.pageSize || 10));
      setPagination({
        pageIndex: tableState.pageIndex || 1,
        pageSize: tableState.pageSize || 10,
        totalCount: dummyData.length,
      });
      setIsLoading(false);
    }, 500);
  };

  const handleSelectRow = useCallback(
    (datum) => {
      const { id, section } = datum; // Ambil ID dan platform
      history.push({
        pathname: `/app/super_admin/bannerEditPage`,
        state: { id, platform: section }, // Kirim data ID dan platform
      });
    },
    [history]
  );

  // Filter Data untuk Web dan Mobile Sections
  const webBanners = mainBanners.filter((banner) => banner.section === 'web');
  const mobileBanners = mainBanners.filter((banner) => banner.section === 'mobile');

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
              data={mobileBanners}
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
