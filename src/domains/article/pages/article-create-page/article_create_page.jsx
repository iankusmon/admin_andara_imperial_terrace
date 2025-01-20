import React, { useState } from "react";
import { useHistory } from "react-router";
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
import ArticleApiV2 from "api/v2/admins/cms/cms-articles-v2";
import TitlePage from "components/atoms/title-page";
import ArticleForm from "domains/article/organisms/article-form/article_form";
import ArticlePreview from "domains/article/organisms/article-preview/article_preview";

const TAB = {
  PROFILE: "profile",
};

const ArticleCreatePage = ({ pageUtils }) => {
  const [articleData, setArticleData] = useState({
    title: "",
    summary: "",
    introduction: "",
    closing: "",
    hero_img_url: null, // File
    category: "penjualan", // Default ke salah satu enum
    published_at: "",
    active_status: "enabled", // Default ke enabled
    sections: [], // Nested attributes
  });
  const [activeTab, setActiveTab] = useState(TAB.PROFILE);
  const history = useHistory();

  const handleFormChange = (data) => {
    setArticleData((prev) => ({
      ...prev,
      ...data,
      active_status: data.active_status?.toLowerCase() || prev.active_status, // Pastikan huruf kecil
      category: data.category || prev.category, // Pastikan enum valid
    }));
  };

  const validateArticleData = () => {
    if (!articleData.title) {
      alert("Title is required");
      return false;
    }
    if (!["penjualan", "penyewaan", "tender", "agent_affiliate", "paket_wisata"].includes(articleData.category)) {
      alert("Invalid category");
      return false;
    }
    if (!articleData.active_status || !["enabled", "disabled"].includes(articleData.active_status)) {
      alert("Invalid active status");
      return false;
    }
    return true;
  };

  const handleCreateArticle = () => {
    if (!validateArticleData()) return;

    const formData = new FormData();
    formData.append("cms_article[title]", articleData.title);
    formData.append("cms_article[summary]", articleData.summary);
    formData.append("cms_article[introduction]", articleData.introduction);
    formData.append("cms_article[closing]", articleData.closing);
    formData.append("cms_article[category]", articleData.category); // Enum valid
    formData.append("cms_article[active_status]", articleData.active_status); // Enum valid
    formData.append("cms_article[published_at]", articleData.published_at);

    // Tambahkan file jika ada
    if (articleData.hero_img_url instanceof File) {
      formData.append("cms_article[hero_img_url]", articleData.hero_img_url);
    }

    // Tambahkan sections sebagai nested attributes
    articleData.sections.forEach((section, index) => {
      formData.append(`cms_article[sections][${index}][title]`, section.title || "");
      formData.append(`cms_article[sections][${index}][content]`, section.content || "");
    });

    ArticleApiV2.create(formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then(() => {
        pageUtils.setAlertMsg("Article has been created successfully.");
        history.push("/app/article");
      })
      .catch((error) => {
        console.error("Failed to create article:", error);
        pageUtils.setApiErrorMsg(error.response?.data || "Failed to create article");
      });
  };

  return (
    <>
      <TitlePage mainTitle="Article" subTitle="Create" />
      <Nav pills className="mb-3">
        <NavItem>
          <NavLink
            className={activeTab === TAB.PROFILE ? "active" : ""}
            onClick={() => setActiveTab(TAB.PROFILE)}
          >
            Profile
          </NavLink>
        </NavItem>
      </Nav>
      <div className="mb-3">
        <Button color="secondary" onClick={() => history.push("/app/article")}>
          Back to List
        </Button>
      </div>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={TAB.PROFILE}>
          <Row>
            <Col md={6}>
              <Card body>
                <h5>Preview</h5>
                {console.log("Data sebelum diteruskan ke ArticlePreview:", articleData)}
                <ArticlePreview data={articleData} />
              </Card>
            </Col>
            <Col md={6}>
              <Card body>
                <h5>Main Form</h5>
                {console.log("Data di ArticleForm:", articleData)}
                <ArticleForm data={articleData} onChange={handleFormChange} />
                <Button
                  color="primary"
                  className="mt-3"
                  onClick={handleCreateArticle}
                >
                  Create Article
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
