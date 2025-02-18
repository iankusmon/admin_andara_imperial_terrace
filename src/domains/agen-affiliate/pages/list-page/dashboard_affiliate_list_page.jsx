import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import { Card, Row, Col, CardBody, CardHeader } from 'reactstrap';
import TitlePage from 'components/atoms/title-page';
import { RewardPenjualanKeseluruhanTable, RewardAgentBulananTable } from 'domains/agen-affiliate/organisms/table/index'; // Ubah dengan nama yang benar
import { ColumnsChart, PieChart } from 'domains/agen-affiliate/organisms/grafik/index'; // Import chart komponen
import PropTypes from 'prop-types';

const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

const DashboardAgentAffiliate = ({ pageUtils }) => {
  const [commissions, setCommissions] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [customerStats, setCustomerStats] = useState({ applied: 10, total: 30 }); // Placeholder data
  const [affiliateStats, setAffiliateStats] = useState({ applied: 10, total: 30 }); // Placeholder data
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
      <TitlePage mainTitle="Dashboard Agent Affiliate" subTitle="Overview" />

      <Row>
        {/* Row 1: Customer & Affiliate Stats */}
        <Col lg={6} md={12}>
          <Card className="shadow-lg">
            <CardHeader>Calon Customer Belum Direspon</CardHeader>
            <CardBody>
              <p>{customerStats.applied}/{customerStats.total} Pengajuan</p>
            </CardBody>
          </Card>
        </Col>

        <Col lg={6} md={12}>
          <Card className="shadow-lg">
            <CardHeader>Jumlah Agen Affiliate</CardHeader>
            <CardBody>
              <p>{affiliateStats.applied}/{affiliateStats.total} Pengajuan</p>
            </CardBody>
          </Card>
        </Col>
      </Row>


      <Row>
        {/* Row 2: Chart Components */}
        <Col lg={8} md={12}>
          <Card>
       
            <CardBody>
              <ColumnsChart />
            </CardBody>
          </Card>
        </Col>

        <Col lg={4} md={12}>
          <Card>
            
            <CardBody>
              <PieChart />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
      <Col lg={4} md={12}>
          <Card>
            <h5 className="p-3">Reward Agen Bulanan</h5>
            <RewardAgentBulananTable
              data={commissions}
              pagination={pagination}
              onFetchData={handleFetchCommissions}
              isLoading={isLoading}
            />
          </Card>
        </Col>
        <Col lg={8} md={12}>
          <Card>
            <h5 className="p-3">Reward Penjualan Keseluruhan</h5>
            <RewardPenjualanKeseluruhanTable
              data={commissions}
              pagination={pagination}
              onFetchData={handleFetchCommissions}
              isLoading={isLoading}
            />
          </Card>
        </Col>

       
      </Row>
    </>
  );
};

DashboardAgentAffiliate.propTypes = propTypes;

export default DashboardAgentAffiliate;
