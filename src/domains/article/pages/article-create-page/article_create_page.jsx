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
    hero_image: null,
    category: "",
    url: "",
    published_at: "",
    active_status: "enabled",
    sections_attributes: [],  // 🛠️ Pastikan dikirim sebagai array
    meta_data_attributes: {
      title: "Default Title", // 🛠️ Jangan dikosongkan
      keyword: "default",
      description: "default description",
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
    // 🛠️ Validasi sebelum submit
    if (!articleData.title || articleData.category.length === 0) {
      alert("Title and Category are required!");
      return;
    }
  
  
    const formData = new FormData();
    formData.append("cms_article[title]", articleData.title);
    formData.append("cms_article[active_status]", articleData.active_status || "enabled");
    formData.append("cms_article[summary]", articleData.summary || "");
    formData.append("cms_article[category]", articleData.category || "");
    formData.append("cms_article[published_at]", articleData.published_at || new Date().toISOString());
  
 
    if (articleData.hero_image && articleData.hero_image instanceof File) {
      formData.append("cms_article[hero_image]", articleData.hero_image);
    } else {
      console.warn(" Hero Image tidak ada atau bukan File!");
    }
  
   
    if (articleData.sections_attributes && articleData.sections_attributes.length > 0) {
      articleData.sections_attributes.forEach((section, index) => {
        formData.append(`cms_article[sections_attributes][${index}][id]`, section.id || "");
        formData.append(`cms_article[sections_attributes][${index}][title]`, section.title || "");
        formData.append(`cms_article[sections_attributes][${index}][description]`, section.description || "");
        if (section.image && section.image instanceof File) {
          formData.append(`cms_article[sections_attributes][${index}][image]`, section.image);
        }
      });
    } else {
      formData.append("cms_article[sections_attributes]", "[]");
      console.warn(" sections_attributes kosong, mengirim array kosong.");
    }
  
    formData.append("cms_article[meta_data_attributes][title]", articleData.meta_data_attributes?.title || "Default Title");
    formData.append("cms_article[meta_data_attributes][keyword]", articleData.meta_data_attributes?.keyword || "default");
    formData.append("cms_article[meta_data_attributes][description]", articleData.meta_data_attributes?.description || "default description");
  
    
    console.log(" FormData sebelum dikirim:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    setIsLoading(true);
  
  
    CmsArticlesApiV2.create(formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        pageUtils.setAlertMsg("Article has been created successfully.");
        history.push("/app/super_admin/articles");
      })
      .catch((error) => {
        console.error(" Failed to create article:", error.response?.data || error.message);
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
