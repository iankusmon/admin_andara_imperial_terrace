import React, { useState } from 'react';
import { Card, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router';
import TitlePage from 'components/atoms/title-page';
import { MiceTable, MobileMiceTable } from 'domains/landingpage/homepage/mice-banner-section/organisms/table/index'; // Pastikan path sesuai

const MiceListPage = () => {
  // Data dummy untuk tabel
  const [miceData] = useState([
    { id: 1, title: 'MICE Web 1', category: 'Conference', url: '/conference/1', active_status: 'Active', section: 'web' },
    { id: 2, title: 'MICE Web 2', category: 'Seminar', url: '/seminar/2', active_status: 'Inactive', section: 'web' },
    { id: 3, title: 'MICE Mobile 1', category: 'Workshop', url: '/workshop/3', active_status: 'Active', section: 'mobile' },
    { id: 4, title: 'MICE Mobile 2', category: 'Expo', url: '/expo/4', active_status: 'Inactive', section: 'mobile' },
  ]);

  const history = useHistory();

  // Fungsi untuk menangani klik tombol
  const handleRowClick = (row) => {
    history.push(`/app/super_admin/mice/edit/${row.id}`);
  };

  // Filter data untuk Web Section dan Mobile Section
  const webMice = miceData.filter((mice) => mice.section === 'web');
  const mobileMice = miceData.filter((mice) => mice.section === 'mobile');

  return (
    <>
      <TitlePage mainTitle="MICE" subTitle="Banner List" />
      <Row>
        <Col lg={6}>
          <Card>
            <h5 className="p-3">Web Section</h5>
            <MiceTable
              data={webMice}
              pagination={{
                pageIndex: 1,
                pageSize: 10,
                totalCount: webMice.length,
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
            <MobileMiceTable
              data={mobileMice}
              pagination={{
                pageIndex: 1,
                pageSize: 10,
                totalCount: mobileMice.length,
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

export default MiceListPage;
