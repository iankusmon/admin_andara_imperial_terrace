import React, { useState } from 'react';
import { Card, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router';
import TitlePage from 'components/atoms/title-page';
import { LandmarkTable, MobileLandmarkTable } from '../../organisms/table/index'; // Pastikan path benar

const LandmarkBannerPage = () => {
  // Data dummy untuk tabel
  const [landmarks] = useState([
    { id: 1, title: 'Landmark Web 1', category: 'Promo', url: '/promo/1', active_status: 'Active', section: 'web' },
    { id: 2, title: 'Landmark Web 2', category: 'Event', url: '/event/2', active_status: 'Inactive', section: 'web' },
    { id: 3, title: 'Landmark Mobile 1', category: 'Promo', url: '/promo/3', active_status: 'Active', section: 'mobile' },
    { id: 4, title: 'Landmark Mobile 2', category: 'Event', url: '/event/4', active_status: 'Inactive', section: 'mobile' },
  ]);

  const history = useHistory();

  // Fungsi untuk menangani klik tombol
  const handleRowClick = (row) => {
    history.push({
      pathname: `/app/super_admin/landmarkBannerEditPage`, // Rute halaman edit
      state: { id: row.id, platform: row.section }, // Kirim id dan platform ke halaman edit
    });
  };

  // Filter data untuk Web Section dan Mobile Section
  const webLandmarks = landmarks.filter((landmark) => landmark.section === 'web');
  const mobileLandmarks = landmarks.filter((landmark) => landmark.section === 'mobile');

  return (
    <>
      <TitlePage mainTitle="Landmark" subTitle="Banner List" />
      <Row>
        {/* Web Section */}
        <Col lg={6}>
          <Card>
            <h5 className="p-3">Web Section</h5>
            <LandmarkTable
              data={webLandmarks}
              pagination={{
                pageIndex: 1,
                pageSize: 10,
                totalCount: webLandmarks.length,
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

        {/* Mobile Section */}
        <Col lg={6}>
          <Card>
            <h5 className="p-3">Mobile Section</h5>
            <MobileLandmarkTable
              data={mobileLandmarks}
              pagination={{
                pageIndex: 1,
                pageSize: 10,
                totalCount: mobileLandmarks.length,
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

export default LandmarkBannerPage;
