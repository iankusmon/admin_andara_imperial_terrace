import React, { useState } from 'react';
import { Card, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router';
import TitlePage from 'components/atoms/title-page';
import { DayclubTable, MobileDayclubTable } from 'domains/landingpage/homepage/day-club-banner-section/organisms/table/index'; 

const DayclubListPage = () => {
  // Data dummy untuk tabel
  const [dayclubData] = useState([
    { id: 1, title: 'Dayclub Web 1', category: 'Pool Party', url: '/poolparty/1', active_status: 'Active', section: 'web' },
    { id: 2, title: 'Dayclub Web 2', category: 'Music Festival', url: '/musicfestival/2', active_status: 'Inactive', section: 'web' },
    { id: 3, title: 'Dayclub Mobile 1', category: 'VIP Event', url: '/vipevent/3', active_status: 'Active', section: 'mobile' },
    { id: 4, title: 'Dayclub Mobile 2', category: 'Beach Party', url: '/beachparty/4', active_status: 'Inactive', section: 'mobile' },
  ]);

  const history = useHistory();

  // Fungsi untuk menangani klik tombol
  const handleRowClick = (row) => {
    history.push(`/app/super_admin/dayclub/edit/${row.id}`);
  };

  // Filter data untuk Web Section dan Mobile Section
  const webDayclub = dayclubData.filter((dayclub) => dayclub.section === 'web');
  const mobileDayclub = dayclubData.filter((dayclub) => dayclub.section === 'mobile');

  return (
    <>
      <TitlePage mainTitle="Dayclub" subTitle="Banner List" />
      <Row>
        <Col lg={6}>
          <Card>
            <h5 className="p-3">Web Section</h5>
            <DayclubTable
              data={webDayclub}
              pagination={{
                pageIndex: 1,
                pageSize: 10,
                totalCount: webDayclub.length,
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
            <MobileDayclubTable
              data={mobileDayclub}
              pagination={{
                pageIndex: 1,
                pageSize: 10,
                totalCount: mobileDayclub.length,
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

export default DayclubListPage;
