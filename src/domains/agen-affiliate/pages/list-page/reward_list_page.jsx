import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom'; // ✅ Gunakan react-router-dom, bukan react-router
import { Card, Row, Col } from 'reactstrap';
import TitlePage from 'components/atoms/title-page';
import { RewardTable } from 'domains/agen-affiliate/organisms/table/index';
import PropTypes from 'prop-types';

const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

const RewardPage = ({ pageUtils }) => {
  const [rewards, setRewards] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  // ✅ Simulasi Fetch Data dari Server
  const handleFetchRewards = (tableState) => {
    setIsLoading(true);

    const dummyData = [
      { id: 1, agent_affiliate_id: 'Agent 001', monthly_reward: 100000, top_sales_reward: 50000, paid_at: '2024-02-01', status: 'berhasil' },
      { id: 2, agent_affiliate_id: 'Agent 002', monthly_reward: 150000, top_sales_reward: 70000, paid_at: '2024-02-02', status: 'unproses' },
      { id: 3, agent_affiliate_id: 'Agent 003', monthly_reward: 200000, top_sales_reward: 80000, paid_at: '2024-02-03', status: 'berhasil' },
      { id: 4, agent_affiliate_id: 'Agent 004', monthly_reward: 250000, top_sales_reward: 90000, paid_at: '2024-02-04', status: 'unproses' },
      { id: 5, agent_affiliate_id: 'Agent 005', monthly_reward: 300000, top_sales_reward: 100000, paid_at: '2024-02-05', status: 'berhasil' },
    ];

    setTimeout(() => {
      console.log("Fetched rewards:", dummyData);
      setRewards(dummyData.slice(0, tableState.pageSize || 10));
      setPagination({
        pageIndex: tableState.pageIndex || 1,
        pageSize: tableState.pageSize || 10,
        totalCount: dummyData.length,
      });
      setIsLoading(false);
    }, 500);
  };

  // ✅ Fungsi untuk menangani klik pada baris tabel
  const handleSelectRow = useCallback(
    (datum, action) => {
      console.log("Row clicked:", datum, "Action:", action); // ✅ Debugging

      if (!datum || !datum.id) {
        console.error("Invalid datum:", datum);
        return;
      }

      const { id } = datum;

      if (action === 'detailPencapaian') {
        history.push(`/app/super_admin/detail-pencapaian-reward/${id}`);
      } else if (action === 'detail') {
        history.push(`/app/super_admin/detail-reward-page/${id}`);
      }
    },
    [history]
  );

  return (
    <>
      <TitlePage mainTitle="Reward" subTitle="List" />

      <Row>
        <Col lg={12}>
          <Card>
            <h5 className="p-3">Daftar Reward</h5>
            <RewardTable
              data={rewards}
              pagination={pagination}
              onFetchData={handleFetchRewards}
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

RewardPage.propTypes = propTypes;

export default RewardPage;
