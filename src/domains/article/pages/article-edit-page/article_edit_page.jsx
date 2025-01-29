import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { Row, Col, Card, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PropTypes from 'prop-types';
import ArticleApiV2 from 'api/v2/admins/cms/cms-articles-v2';
import TitlePage from 'components/atoms/title-page';
import ArticleForm from 'domains/article/organisms/article-form/article_form';
import ArticlePreview from 'domains/article/organisms/article-preview/article_preview';

const TAB = {
  PROFILE: 'profile',
};

const ArticleEditPage = ({ pageUtils }) => {
  const [articleData, setArticleData] = useState({
    title: '',
    summary: '',
    introduction: '',
    closing: '',
    hero_image: null,
    url: '',
    active_status: 'enabled',
    category: '',
    published_at: '',
    is_deleted: false,
    sections: [],
    meta_data: {
      id: null,
      title: '',
      keyword: '',
      description: '',
    },
  });

  const [activeTab, setActiveTab] = useState(TAB.PROFILE);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    ArticleApiV2.show(id)
      .then((response) => {
        setArticleData(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch article:', error);
        pageUtils.setApiErrorMsg(error.response?.data || 'Failed to fetch article');
      })
      .finally(() => setIsLoading(false));
  }, [id, pageUtils]);

  const handleFormChange = (data) => {
    setArticleData((prev) => ({ ...prev, ...data }));
  };

  const handleSaveArticle = () => {
    const formData = new FormData();
  
    console.log("📌 Data articleData sebelum dikonversi ke FormData:", articleData);
  
    // Tambahkan field utama
    formData.append("cms_article[title]", articleData.title || '');
    formData.append("cms_article[active_status]", articleData.active_status || "enabled");
    formData.append("cms_article[summary]", articleData.summary || '');
    formData.append("cms_article[category]", articleData.category || '');
  
    // Tambahkan `hero_image` jika ada
    if (articleData.hero_image && articleData.hero_image instanceof File) {
      formData.append("cms_article[hero_image]", articleData.hero_image);
    }
  
    // 🔹 Pastikan `sections_attributes` dikirim HANYA jika ada data
    if (Array.isArray(articleData.sections_attributes) && articleData.sections_attributes.length > 0) {
      articleData.sections_attributes.forEach((section, index) => {
        formData.append(`cms_article[sections_attributes][${index}][id]`, section.id || '');
        formData.append(`cms_article[sections_attributes][${index}][title]`, section.title || '');
        formData.append(`cms_article[sections_attributes][${index}][description]`, section.description || '');
  
        if (section.image && section.image instanceof File) {
          formData.append(`cms_article[sections_attributes][${index}][image]`, section.image);
        }
      });
    } else {
      console.warn("⚠️ sections_attributes kosong, tidak akan dikirim.");
    }
  
    // 🔹 Pastikan `meta_data_attributes` dikirim dengan format benar
    if (articleData.meta_data_attributes) {
      formData.append("cms_article[meta_data_attributes][title]", articleData.meta_data_attributes.title || "SEO Title");
      formData.append("cms_article[meta_data_attributes][keyword]", articleData.meta_data_attributes.keyword || "keyword1, keyword2");
      formData.append("cms_article[meta_data_attributes][description]", articleData.meta_data_attributes.description || "SEO description");
    } else {
      console.warn("⚠️ Tidak ada `meta_data_attributes`, mengirim nilai default.");
      formData.append("cms_article[meta_data_attributes][title]", "SEO Title");
      formData.append("cms_article[meta_data_attributes][keyword]", "keyword1, keyword2");
      formData.append("cms_article[meta_data_attributes][description]", "SEO description");
    }
  
    // 🔍 Debug: Log FormData sebelum dikirim
    console.log("✅ FormData sebelum dikirim:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    // Kirim request ke backend
    ArticleApiV2.update(id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        pageUtils.setAlertMsg("Article has been updated successfully.");
        return ArticleApiV2.show(id);
      })
      .then((response) => setArticleData(response.data))
      .catch((error) => {
        console.error("❌ Failed to save article:", error);
        pageUtils.setApiErrorMsg(error.response?.data || "Failed to save article");
      });
  };
  

  return (
    <>
      <TitlePage mainTitle="Article" subTitle="Edit" />
      <Nav pills className="mb-3">
        <NavItem>
          <NavLink className={activeTab === TAB.PROFILE ? 'active' : ''} onClick={() => setActiveTab(TAB.PROFILE)}>
            Profile
          </NavLink>
        </NavItem>
      </Nav>

      <div className="mb-3">
        <Button color="secondary" onClick={() => history.push('/app/super_admin/articles')}>
          Back to List
        </Button>
      </div>

      <TabContent activeTab={activeTab}>
        <TabPane tabId={TAB.PROFILE}>
          <Row>
            <Col md={6}>
              <Card body>
                <h5>Preview</h5>
                <ArticlePreview data={articleData} />
              </Card>
            </Col>

            <Col md={6}>
              <Card body>
                <h5>Main Form</h5>
                <ArticleForm data={articleData} onChange={handleFormChange} />
                <Button color="primary" className="mt-3" onClick={handleSaveArticle}>
                  Save Article
                </Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </>
  );
};

ArticleEditPage.propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

export default ArticleEditPage;
