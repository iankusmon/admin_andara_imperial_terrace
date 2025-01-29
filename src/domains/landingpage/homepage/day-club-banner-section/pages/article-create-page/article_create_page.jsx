import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import PropTypes from "prop-types";
import TitlePage from "components/atoms/title-page";
import ArticleCreateForm from "domains/article/organisms/article-form/article_create_form";
import ArticleCreatePreview from "domains/article/organisms/article-preview/article_create_preview";
import CmsArticlesApiV2 from "api/v2/admins/cms/cms-articles-v2";

const TAB = {
  PROFILE: "profile",
};

const ArticleCreatePage = ({ pageUtils }) => {
  const [articleData, setArticleData] = useState({
    title: "",
    summary: "",
    introduction: "",
    closing: "",
    hero_img_url: "",
    category: "",
    url: "",
    published_at: "",
    active_status: "enabled",
    sections: [],
    meta_data: {
      title: "",
      keyword: "",
      description: "",
    },
  });
  const [activeTab, setActiveTab] = useState(TAB.PROFILE);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleFormChange = (data) => {
    setArticleData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleCreateArticle = () => {
    // Validate data before submitting
    if (!articleData.title || articleData.category.length === 0) {
      alert("Title and Category are required!");
      return;
    }

    const payload = {
      cms_article: {
        title: articleData.title || "",
        hero_image: articleData.hero_img_url || "https://example.com/default-image.jpg", // Replace as needed
        active_status: articleData.active_status || "enabled",
        summary: articleData.summary || "",
        category: articleData.category || "",
        sections: articleData.sections.map((section) => ({
          id: section.id || null,
          title: section.title || "",
          image: section.image || "",
          description: section.description || "",
          collection_id: section.collection_id || null,
        })),
        meta_data: {
          title: articleData.meta_data.title || "",
          keyword: articleData.meta_data.keyword || "",
          description: articleData.meta_data.description || "",
        },
      },
    };

    console.log("Payload submitted:", payload);

    setIsLoading(true);
    CmsArticlesApiV2.create(payload)
      .then(() => {
        pageUtils.setAlertMsg("Article has been created successfully.");
        history.push("/app/super_admin/articles");
      })
      .catch((error) => {
        console.error("Failed to create article:", error.response?.data);
        pageUtils.setApiErrorMsg(error.response?.data || "Failed to create article.");
        alert("Failed to create article. Please check your input.");
      })
      .finally(() => setIsLoading(false));
  };

  const handleBackToList = () => {
    history.push("/app/super_admin/articles");
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <>
      <TitlePage mainTitle="Article" subTitle="Create" />
      <Nav pills className="mb-3">
        <NavItem>
          <NavLink
            className={activeTab === TAB.PROFILE ? "active" : ""}
            onClick={() => toggle(TAB.PROFILE)}
          >
            Profile
          </NavLink>
        </NavItem>
      </Nav>
      <div className="mb-3">
        <Button color="secondary" onClick={handleBackToList}>
          Back to List
        </Button>
      </div>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={TAB.PROFILE}>
          <Row>
            <Col md={6}>
              <Card body>
                <h5>Preview</h5>
                <ArticleCreatePreview data={articleData} />
              </Card>
            </Col>
            <Col md={6}>
              <Card body>
                <h5>Main Form</h5>
                <ArticleCreateForm
                  data={articleData}
                  onChange={handleFormChange}
                />
                <Button
                  color="primary"
                  className="mt-3"
                  onClick={handleCreateArticle}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Article"}
                </Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </>
  );
};

ArticleCreatePage.propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

export default ArticleCreatePage;
