import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import { Card, Row, Col } from 'reactstrap';
import TitlePage from 'components/atoms/title-page';
import { LandownerTable } from 'domains/land-owner/organisms/table/index'; // Pastikan path benar
import PropTypes from 'prop-types';

const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

const LandownerListPage = ({ pageUtils }) => {
  const [landowners, setLandowners] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  // Simulasi Fetch Data dari Server
  const handleFetchLandowners = (tableState) => {
    setIsLoading(true);

    const dummyData = [
      { id: 1, name: 'John Doe', address: '123 Main St', contact_number: '123456789', rekening: '123456789', active_status: 'enabled' },
      { id: 2, name: 'Jane Smith', address: '456 Elm St', contact_number: '987654321', rekening: '123456789', active_status: 'disabled' },
      { id: 3, name: 'Alice Brown', address: '789 Oak St', contact_number: '555555555', rekening: '123456789', active_status: 'enabled' },
      { id: 4, name: 'Bob Green', address: '321 Pine St', contact_number: '444444444', rekening: '123456789', active_status: 'disabled' },
    ];
    

    setTimeout(() => {
      setLandowners(dummyData.slice(0, tableState.pageSize || 10));
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
      const { id } = datum; // Ambil ID
      history.push({
        pathname: `/app/super_admin/landowner-detail`,
        state: { id }, // Kirim data ID
      });
    },
    [history]
  );

  return (
    <>
      <TitlePage mainTitle="Landowners" subTitle="List" />

      <Row>
        <Col lg={12}>
          <Card>
            <h5 className="p-3">Landowner List</h5>
            <LandownerTable
              data={landowners}
              pagination={pagination}
              onFetchData={handleFetchLandowners}
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

LandownerListPage.propTypes = propTypes;

export default LandownerListPage;
