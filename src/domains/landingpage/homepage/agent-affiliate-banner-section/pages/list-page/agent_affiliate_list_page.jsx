import React, { useState } from 'react';
import { Card, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router';
import TitlePage from 'components/atoms/title-page';
import { AgentAffiliateTable, MobileAgentAffiliateTable } from 'domains/landingpage/homepage/agent-affiliate-banner-section/organisms/table/index'; 

const AgentAffiliateListPage = () => {
  // Data dummy untuk tabel
  const [agentAffiliateData] = useState([
    { id: 1, title: 'Agent Affiliate Web 1', category: 'Conference', url: '/conference/1', active_status: 'Active', section: 'web' },
    { id: 2, title: 'Agent Affiliate Web 2', category: 'Seminar', url: '/seminar/2', active_status: 'Inactive', section: 'web' },
    { id: 3, title: 'Agent Affiliate Mobile 1', category: 'Workshop', url: '/workshop/3', active_status: 'Active', section: 'mobile' },
    { id: 4, title: 'Agent Affiliate Mobile 2', category: 'Expo', url: '/expo/4', active_status: 'Inactive', section: 'mobile' },
  ]);

  const history = useHistory();

  // Fungsi untuk menangani klik tombol
  const handleRowClick = (row) => {
    history.push(`/app/super_admin/agentaffiliate/edit/${row.id}`);
  };

  // Filter data untuk Web Section dan Mobile Section
  const webAgentAffiliate = agentAffiliateData.filter((item) => item.section === 'web');
  const mobileAgentAffiliate = agentAffiliateData.filter((item) => item.section === 'mobile');

  return (
    <>
      <TitlePage mainTitle="Agent Affiliate" subTitle="Banner List" />
      <Row>
        <Col lg={6}>
          <Card>
            <h5 className="p-3">Web Section</h5>
            <AgentAffiliateTable
              data={webAgentAffiliate}
              pagination={{
                pageIndex: 1,
                pageSize: 10,
                totalCount: webAgentAffiliate.length,
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
            <MobileAgentAffiliateTable
              data={mobileAgentAffiliate}
              pagination={{
                pageIndex: 1,
                pageSize: 10,
                totalCount: mobileAgentAffiliate.length,
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

export default AgentAffiliateListPage;
