import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import { Card, Row, Col } from 'reactstrap';
import TitlePage from 'components/atoms/title-page';
import { SurveyCalonCustomerTable } from 'domains/agen-affiliate/organisms/table/index';
import PropTypes from 'prop-types';

const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

const SurveyCalonCustomerPage = ({ pageUtils }) => {
  const [customers, setCustomers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  // Simulasi Fetch Data dari Server
  const handleFetchCustomers = (tableState) => {
    setIsLoading(true);

    const dummyData = [
      { id: 1, name: 'Budi Santoso', phone: '08123456789', survey_date: '2024-02-01', status: 'proses' },
      { id: 2, name: 'Siti Aisyah', phone: '08129876543', survey_date: '2024-02-02', status: 'berhasil' },
      { id: 3, name: 'Joko Widodo', phone: '08123499999', survey_date: '2024-02-03', status: 'proses' },
      { id: 4, name: 'Dewi Sartika', phone: '08126789012', survey_date: '2024-02-04', status: 'berhasil' },
      { id: 5, name: 'Agus Salim', phone: '08127894561', survey_date: '2024-02-05', status: 'proses' },
    ];

    setTimeout(() => {
      console.log("Fetched customers:", dummyData);
      setCustomers(dummyData.slice(0, tableState.pageSize || 10));
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
      const { id } = datum;
      history.push({
        pathname: `/app/super_admin/surveycaloncustomer/${id}`,
        state: { id },
      });
    },
    [history]
  );

  return (
    <>
      <TitlePage mainTitle="Survey Calon Customer" subTitle="List" />

      <Row>
        <Col lg={12}>
          <Card>
            <h5 className="p-3">Daftar Survey Calon Customer</h5>
            <SurveyCalonCustomerTable
              data={customers}
              pagination={pagination}
              onFetchData={handleFetchCustomers}
              isLoading={isLoading}
              rowButtonProps={{
                buttonText: 'Detail',
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

SurveyCalonCustomerPage.propTypes = propTypes;

export default SurveyCalonCustomerPage;
