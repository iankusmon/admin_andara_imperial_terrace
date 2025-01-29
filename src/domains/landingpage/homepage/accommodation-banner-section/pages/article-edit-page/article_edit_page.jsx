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
    hero_img_url: '',
    category: '',
    published_at: '',
    sections: [], // Array untuk menyimpan sections
  });
  const [activeTab, setActiveTab] = useState(TAB.PROFILE);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  // Fetch data artikel berdasarkan ID
  useEffect(() => {
    setIsLoading(true);
    ArticleApiV2.show(id)
      .then((response) => {
        console.log('Data artikel dari backend:', response.data); // Debugging
        setArticleData(response.data); // Memuat data artikel
      })
      .catch((error) => {
        console.error('Gagal mengambil artikel:', error);
        pageUtils.setApiErrorMsg(error.response?.data || 'Failed to fetch article');
      })
      .finally(() => setIsLoading(false));
  }, [id, pageUtils]);

  // Update state ketika form diubah
  const handleFormChange = (data) => {
    setArticleData((prev) => {
      const updatedData = { ...prev, ...data };
      console.log('State articleData diperbarui:', updatedData); // Debugging
      return updatedData;
    });
  };

  // Simpan artikel
  const handleSaveArticle = () => {
    const payload = { ...articleData };

    ArticleApiV2.update(id, payload)
      .then(() => {
        pageUtils.setAlertMsg('Article has been updated successfully.');

        // Ambil data terbaru dari backend setelah berhasil menyimpan
        return ArticleApiV2.show(id);
      })
      .then((response) => {
        console.log('Data terbaru setelah save:', response.data); // Debugging
        setArticleData(response.data); // Update state dengan data terbaru
      })
      .catch((error) => {
        console.error('Failed to save article:', error);
        pageUtils.setApiErrorMsg(error.response?.data || 'Failed to save article');
      });
  };

  // Navigasi kembali ke halaman daftar artikel
  const handleBackToList = () => {
    history.push('/app/super_admin/articles');
  };

  // Ganti tab
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <>
      <TitlePage mainTitle="Article" subTitle="Edit" />
      <Nav pills className="mb-3">
        <NavItem>
          <NavLink
            className={activeTab === TAB.PROFILE ? 'active' : ''}
            onClick={() => toggle(TAB.PROFILE)}
          >
            Profile
          </NavLink>
        </NavItem>
      </Nav>
      {/* Back to List Button */}
      <div className="mb-3">
        <Button color="secondary" onClick={handleBackToList}>
          Back to List
        </Button>
      </div>

      <TabContent activeTab={activeTab}>
        <TabPane tabId={TAB.PROFILE}>
          <Row>
            {/* Preview Section (Left) */}
            <Col md={6}>
              <Card body>
                <h5>Preview</h5>
                <ArticlePreview data={articleData} />
              </Card>
            </Col>

            {/* Form Section (Right) */}
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
