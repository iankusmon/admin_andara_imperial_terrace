import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import { Card, Row, Col } from 'reactstrap';
import TitlePage from 'components/atoms/title-page';
import { KomisiTable } from 'domains/agen-affiliate/organisms/table/index';
import PropTypes from 'prop-types';

const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

const KomisiPage = ({ pageUtils }) => {
  const [commissions, setCommissions] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  // Simulasi Fetch Data dari Server
  const handleFetchCommissions = (tableState) => {
    setIsLoading(true);

    const dummyData = [
      { id: 1, agent_affiliate_id: 'Agent 001', commission_amount: 100000, paid_at: '2024-02-01', status: 'proses' },
      { id: 2, agent_affiliate_id: 'Agent 002', commission_amount: 150000, paid_at: '2024-02-02', status: 'berhasil' },
      { id: 3, agent_affiliate_id: 'Agent 003', commission_amount: 200000, paid_at: '2024-02-03', status: 'proses' },
      { id: 4, agent_affiliate_id: 'Agent 004', commission_amount: 250000, paid_at: '2024-02-04', status: 'berhasil' },
      { id: 5, agent_affiliate_id: 'Agent 005', commission_amount: 300000, paid_at: '2024-02-05', status: 'proses' },
    ];

    setTimeout(() => {
      console.log("Fetched commissions:", dummyData);
      setCommissions(dummyData.slice(0, tableState.pageSize || 10));
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
        pathname: `/app/super_admin/komisidetailpage/${id}`,
        state: { id },
      });
    },
    [history]
  );

  return (
    <>
      <TitlePage mainTitle="Komisi" subTitle="List" />

      <Row>
        <Col lg={12}>
          <Card>
            <h5 className="p-3">Daftar Komisi</h5>
            <KomisiTable
              data={commissions}
              pagination={pagination}
              onFetchData={handleFetchCommissions}
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

KomisiPage.propTypes = propTypes;

export default KomisiPage;
