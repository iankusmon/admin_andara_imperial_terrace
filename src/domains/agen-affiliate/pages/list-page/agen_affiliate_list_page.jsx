import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import { Card, Row, Col } from 'reactstrap';
import TitlePage from 'components/atoms/title-page';
import { AgentAffiliateTable } from 'domains/agen-affiliate/organisms/table';
import PropTypes from 'prop-types';

const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

const AgenAffiliatePage = ({ pageUtils }) => {
  const [agents, setAgents] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  // Simulasi Fetch Data dari Server
  const handleFetchAgents = (tableState) => {
    setIsLoading(true);

    const dummyData = [
      { id: 1, agent_id: 'AGT12345', name: 'Budi Santoso', region: 'Bali' },
      { id: 2, agent_id: 'AGT67890', name: 'Siti Aisyah', region: 'Bandung' },
      { id: 3, agent_id: 'AGT11223', name: 'Joko Widodo', region: 'Semarang' },
      { id: 4, agent_id: 'AGT44556', name: 'Dewi Sartika', region: 'Surabaya' },
      { id: 5, agent_id: 'AGT77889', name: 'Agus Salim', region: 'Jakarta' },
      { id: 6, agent_id: 'AGT99001', name: 'Rina Kumala', region: 'Medan' },
      { id: 7, agent_id: 'AGT22567', name: 'Hadi Pranoto', region: 'Yogyakarta' },
      { id: 8, agent_id: 'AGT33245', name: 'Putri Maharani', region: 'Malang' },
      { id: 9, agent_id: 'AGT44876', name: 'Fadli Rahman', region: 'Makassar' },
      { id: 10, agent_id: 'AGT55678', name: 'Tono Hartono', region: 'Palembang' },
    ];

    setTimeout(() => {
      console.log("Fetched agents:", dummyData);
      setAgents(dummyData.slice(0, tableState.pageSize || 10));
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
        pathname: `/app/super_admin/agenaffiliate-detail`,
        state: { id },
      });
    },
    [history]
  );

  return (
    <>
      <TitlePage mainTitle="Agen Affiliate" subTitle="List" />

      <Row>
        <Col lg={12}>
          <Card>
            <h5 className="p-3">Daftar Agen Affiliate</h5>
            <AgentAffiliateTable
              data={agents}
              pagination={pagination}
              onFetchData={handleFetchAgents}
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

AgenAffiliatePage.propTypes = propTypes;

export default AgenAffiliatePage;
