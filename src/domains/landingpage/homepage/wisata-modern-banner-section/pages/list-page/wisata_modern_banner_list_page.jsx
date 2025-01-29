import React, { useState } from 'react';
import { Card, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router';
import TitlePage from 'components/atoms/title-page';
import { WisataModernTable, MobileWisataModernTable } from 'domains/landingpage/homepage/wisata-modern-banner-section/organisms/table/index'; 

const WisataModernListPage = () => {
  // Data dummy untuk tabel
  const [wisataModernData] = useState([
    { id: 1, title: 'Wisata Modern Web 1', category: 'Adventure', url: '/adventure/1', active_status: 'Active', section: 'web' },
    { id: 2, title: 'Wisata Modern Web 2', category: 'Family', url: '/family/2', active_status: 'Inactive', section: 'web' },
    { id: 3, title: 'Wisata Modern Mobile 1', category: 'Beach', url: '/beach/3', active_status: 'Active', section: 'mobile' },
    { id: 4, title: 'Wisata Modern Mobile 2', category: 'Cultural', url: '/cultural/4', active_status: 'Inactive', section: 'mobile' },
  ]);

  const history = useHistory();

  // Fungsi untuk menangani klik tombol
  const handleRowClick = (row) => {
    history.push(`/app/super_admin/wisatamodern/edit/${row.id}`);
  };

  // Filter data untuk Web Section dan Mobile Section
  const webWisataModern = wisataModernData.filter((wisata) => wisata.section === 'web');
  const mobileWisataModern = wisataModernData.filter((wisata) => wisata.section === 'mobile');

  return (
    <>
      <TitlePage mainTitle="Wisata Modern" subTitle="Banner List" />
      <Row>
        <Col lg={6}>
          <Card>
            <h5 className="p-3">Web Section</h5>
            <WisataModernTable
              data={webWisataModern}
              pagination={{
                pageIndex: 1,
                pageSize: 10,
                totalCount: webWisataModern.length,
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
            <MobileWisataModernTable
              data={mobileWisataModern}
              pagination={{
                pageIndex: 1,
                pageSize: 10,
                totalCount: mobileWisataModern.length,
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

export default WisataModernListPage;
