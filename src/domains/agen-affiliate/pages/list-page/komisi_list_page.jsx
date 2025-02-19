import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Card, Row, Col } from "reactstrap";
import TitlePage from "components/atoms/title-page";
import { KomisiTable } from "domains/agen-affiliate/organisms/table/index";
import PropTypes from "prop-types";
import AgentAffiliateApi from "../../../../api/v2/admins/agent-affiliate-rewards-api-v2";

const KomisiPage = ({ pageUtils }) => {
  const [agent, setAgent] = useState(null);
  const [commissions, setCommissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const agentId = 1;

  // ✅ Gunakan useCallback untuk mencegah re-render tidak perlu
  const fetchAgentAndCommissions = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log("Fetching data..."); // Debugging

      const response = await AgentAffiliateApi.show(agentId);
      const agentData = response.data;

      console.log("API Response:", agentData); // Debugging

      setAgent(agentData);

      const mappedCommissions = (agentData.agent_affiliate_commissions || []).map((commission) => ({
        id: commission.id || null, // Pastikan id tidak undefined/null
        name: agentData.name || "Unknown Agent",
        agent_affiliate_commissions: [
          {
            commission_amount: commission.commission_amount || 0,
            paid_at: commission.paid_at || "N/A",
          },
        ],
        agent_affiliate_rewards: [
          {
            reward_amount: commission.reward_amount || 0,
            paid_at: commission.reward_paid_at || "N/A",
          },
        ],
        agent_affiliate_revenues: [
          {
            net_revenue: commission.net_revenue || 0,
          },
        ],
        status: commission.status || "Unknown",
      }));

      console.log("Mapped Commissions:", mappedCommissions); // Debugging

      setCommissions(mappedCommissions);
    } catch (error) {
      console.error("Error fetching data:", error); // Debugging
      pageUtils?.setApiErrorMsg?.("Error fetching agent and commissions.");
    } finally {
      setIsLoading(false);
    }
  }, [agentId, pageUtils]);

  // ✅ Panggil fetch data saat pertama kali halaman di-load
  useEffect(() => {
    fetchAgentAndCommissions();
  }, [fetchAgentAndCommissions]);

  // ✅ Fungsi navigasi dengan validasi
  const handleNavigate = (datum) => {
    console.log("Button clicked, datum:", datum); // Debugging
    if (!datum.id) {
      console.error("Error: datum.id is undefined or null");
      return;
    }
    
    const targetRoute = `/app/super_admin/komisidetailpage/${datum.id}`; // ✅ Sesuaikan dengan layout
    console.log("Navigating to:", targetRoute);
    history.push(targetRoute);
  };

  return (
    <>
      <TitlePage mainTitle="Komisi" subTitle="List" />

      <Row>
        <Col lg={12}>
          <Card>
            <h5 className="p-3">Daftar Komisi</h5>
            <KomisiTable
              data={commissions}
              isLoading={isLoading}
              onFetchData={fetchAgentAndCommissions}
              rowButtonProps={{
                buttonText: "Detail",
                buttonColour: "primary",
                onButtonClick: handleNavigate, // ✅ Gunakan fungsi yang sudah diperbaiki
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

KomisiPage.propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

export default KomisiPage;
