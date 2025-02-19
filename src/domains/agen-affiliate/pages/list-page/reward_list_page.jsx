import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Card, Row, Col } from "reactstrap";
import TitlePage from "components/atoms/title-page";
import { RewardTable } from "domains/agen-affiliate/organisms/table/index";
import PropTypes from "prop-types";
import AgentAffiliateApi from "../../../../api/v2/admins/agent-affiliate-rewards-api-v2";

const RewardPage = ({ pageUtils }) => {
  const [agent, setAgent] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const agentId = 1;

  // ✅ Ambil data dari API menggunakan useCallback
  const fetchAgentAndRewards = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log("Fetching rewards data..."); // Debugging

      const response = await AgentAffiliateApi.show(agentId);
      const agentData = response.data;

      console.log("API Response:", agentData); // Debugging

      setAgent(agentData);

      // ✅ Map data agar sesuai dengan struktur tabel
      const mappedRewards = (agentData.agent_affiliate_rewards || []).map((reward) => ({
        id: reward.id || null, // Pastikan ID tidak undefined/null
        agent_affiliate_id: agentData.name || "Unknown Agent",
        monthly_reward: reward.monthly_reward || 0,
        top_sales_reward: reward.top_sales_reward || 0,
        paid_at: reward.paid_at || "N/A",
        status: reward.status || "Unknown",
      }));

      console.log("Mapped Rewards:", mappedRewards); // Debugging

      setRewards(mappedRewards);
    } catch (error) {
      console.error("Error fetching rewards data:", error); // Debugging
      pageUtils?.setApiErrorMsg?.("Error fetching agent rewards.");
    } finally {
      setIsLoading(false);
    }
  }, [agentId, pageUtils]);

  // ✅ Panggil fetch data saat pertama kali halaman di-load
  useEffect(() => {
    fetchAgentAndRewards();
  }, [fetchAgentAndRewards]);

  // ✅ Fungsi navigasi dengan validasi
  const handleNavigate = (datum, action) => {
    console.log("Button clicked, datum:", datum, "Action:", action); // Debugging
    if (!datum.id) {
      console.error("Error: datum.id is undefined or null");
      return;
    }

    let targetRoute = "";
    if (action === "detailPencapaian") {
      targetRoute = `/app/super_admin/detail-pencapaian-reward/${datum.id}`;
    } else if (action === "detail") {
      targetRoute = `/app/super_admin/detail-reward-page/${datum.id}`;
    }

    console.log("Navigating to:", targetRoute);
    history.push(targetRoute);
  };

  return (
    <>
      <TitlePage mainTitle="Reward" subTitle="List" />

      <Row>
        <Col lg={12}>
          <Card>
            <h5 className="p-3">Daftar Reward</h5>
            <RewardTable
              data={rewards}
              isLoading={isLoading}
              onFetchData={fetchAgentAndRewards}
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

RewardPage.propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

export default RewardPage;
