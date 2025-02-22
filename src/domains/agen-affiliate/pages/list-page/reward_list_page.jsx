import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Card, Row, Col } from "reactstrap";
import TitlePage from "components/atoms/title-page";
import { RewardTable } from "domains/agen-affiliate/organisms/table/index";
import PropTypes from "prop-types";
import AgentAffiliateApi from "../../../../api/v2/admins/agent-affiliate-rewards-api-v2";

const RewardPage = ({ pageUtils }) => {
  const [rewards, setRewards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const agentId = 1; // Sementara hardcoded

  const fetchAgentAndRewards = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log("Fetching rewards data...");
  
      const response = await AgentAffiliateApi.show(agentId);
      if (!response || !response.data) {
        throw new Error("Invalid API response");
      }
  
      const agentData = response.data;
      console.log("API Response:", agentData);
  
      const rewardsArray = Array.isArray(agentData.agent_affiliate_rewards)
        ? agentData.agent_affiliate_rewards
        : [];
  
      const mappedAgent = {
        id: agentData.id || null,
        name: agentData.name || "Unknown Agent",
        agent_affiliate_rewards: rewardsArray, // Menyimpan seluruh array reward
      };
  
      console.log("Mapped Agent Data:", mappedAgent);
      setRewards([mappedAgent]); // Pastikan ini dikirim sebagai array dengan satu objek agen
    } catch (error) {
      console.error("Error fetching rewards data:", error);
      pageUtils?.setApiErrorMsg?.("Error fetching agent rewards.");
    } finally {
      setIsLoading(false);
    }
  }, [pageUtils]);
  console.log("Final Rewards Data Sent to Table:", rewards);


  useEffect(() => {
    fetchAgentAndRewards();
  }, [fetchAgentAndRewards]);

  const handleNavigate = (datum, action) => {
    console.log("Button clicked, datum:", datum, "Action:", action);
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
                buttonColour: "primary",
                onDetailPencapaianClick: (datum) => handleNavigate(datum, "detailPencapaian"),
                onDetailClick: (datum) => handleNavigate(datum, "detail"),
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
    setApiErrorMsg: PropTypes.func,
  }),
};

export default RewardPage;
