import React, { useState } from 'react';
import { Card, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router';
import TitlePage from 'components/atoms/title-page';
import { FacilityVideoShortTable, MobileFacilityVideoShortTable } from 'domains/landingpage/homepage/facility-video-short-section/organisms/table/index'; // Pastikan path sesuai

const FacilityVideoShortListPage = () => {
  // Data dummy untuk tabel
  const [facilityVideoShortData] = useState([
    { id: 1, title: 'Facility Video Short Web 1', category: 'Promo', url: '/promo/1', active_status: 'Active', section: 'web' },
    { id: 2, title: 'Facility Video Short Web 2', category: 'Highlight', url: '/highlight/2', active_status: 'Inactive', section: 'web' },
    { id: 3, title: 'Facility Video Short Mobile 1', category: 'Feature', url: '/feature/3', active_status: 'Active', section: 'mobile' },
    { id: 4, title: 'Facility Video Short Mobile 2', category: 'Spotlight', url: '/spotlight/4', active_status: 'Inactive', section: 'mobile' },
  ]);

  const history = useHistory();

  // Fungsi untuk menangani klik tombol
  const handleRowClick = (row) => {
    history.push(`/app/super_admin/facility-video-short/edit/${row.id}`);
  };

  // Filter data untuk Web Section dan Mobile Section
  const webFacilityVideoShorts = facilityVideoShortData.filter((item) => item.section === 'web');
  const mobileFacilityVideoShorts = facilityVideoShortData.filter((item) => item.section === 'mobile');

  return (
    <>
      <TitlePage mainTitle="Facility Video Short" subTitle="Banner List" />
      <Row>
        <Col lg={6}>
          <Card>
            <h5 className="p-3">Web Section</h5>
            <FacilityVideoShortTable
              data={webFacilityVideoShorts}
              pagination={{
                pageIndex: 1,
                pageSize: 10,
                totalCount: webFacilityVideoShorts.length,
              }}
              isLoading={false}
              rowButtonProps={{
                buttonText: 'View',
                buttonColour: 'primary',
                onButtonClick: handleRowClick,
              }}
            />
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <h5 className="p-3">Mobile Section</h5>
            <MobileFacilityVideoShortTable
              data={mobileFacilityVideoShorts}
              pagination={{
                pageIndex: 1,
                pageSize: 10,
                totalCount: mobileFacilityVideoShorts.length,
              }}
              isLoading={false}
              rowButtonProps={{
                buttonText: 'View',
                buttonColour: 'primary',
                onButtonClick: handleRowClick,
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default FacilityVideoShortListPage;
