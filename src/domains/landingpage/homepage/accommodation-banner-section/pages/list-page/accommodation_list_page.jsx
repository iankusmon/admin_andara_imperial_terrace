import React, { useState } from 'react';
import { Card, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router';
import TitlePage from 'components/atoms/title-page';
import { AccommodationTable, MobileAccommodationTable } from '../../organisms/table/index'; // Pastikan path benar

const AccommodationBannerPage = () => {
  // Data dummy untuk tabel
  const [accommodations] = useState([
    { id: 1, title: 'Accommodation Web 1', category: 'Promo', url: '/promo/1', active_status: 'Active', section: 'web' },
    { id: 2, title: 'Accommodation Web 2', category: 'Event', url: '/event/2', active_status: 'Inactive', section: 'web' },
    { id: 3, title: 'Accommodation Mobile 1', category: 'Promo', url: '/promo/3', active_status: 'Active', section: 'mobile' },
    { id: 4, title: 'Accommodation Mobile 2', category: 'Event', url: '/event/4', active_status: 'Inactive', section: 'mobile' },
  ]);

  const history = useHistory();

  // Fungsi untuk menangani klik tombol
  const handleRowClick = (row) => {
    history.push(`/app/super_admin/accommodations/edit/${row.id}`);
  };

  // Filter data untuk Web Section dan Mobile Section
  const webAccommodations = accommodations.filter((accommodation) => accommodation.section === 'web');
  const mobileAccommodations = accommodations.filter((accommodation) => accommodation.section === 'mobile');

  return (
    <>
      <TitlePage mainTitle="Accommodation" subTitle="Banner List" />
      <Row>
        <Col lg={6}>
          <Card>
            <h5 className="p-3">Web Section</h5>
            <AccommodationTable
              data={webAccommodations}
              pagination={{
                pageIndex: 1,
                pageSize: 10,
                totalCount: webAccommodations.length,
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
            <MobileAccommodationTable
              data={mobileAccommodations}
              pagination={{
                pageIndex: 1,
                pageSize: 10,
                totalCount: mobileAccommodations.length,
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

export default AccommodationBannerPage;
