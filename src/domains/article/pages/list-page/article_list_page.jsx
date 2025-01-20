import ArticleApiV2 from 'api/v2/admins/cms/cms-articles-v2';
import TitlePage from 'components/atoms/title-page';
import ArticleTable from 'domains/article/organisms/table/article-table';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { Card } from 'reactstrap';

const propTypes = {
  pageUtils: PropTypes.shape({
    setAlertMsg: PropTypes.func,
    setApiErrorMsg: PropTypes.func,
  }),
};

const ArticleListPage = ({ pageUtils }) => {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  // Method to Fetch articles from server
  const handleFetchArticle = (tableState) => {
    setIsLoading(true);
    ArticleApiV2.get({ tableState: tableState })
      .then((response) => {
        setArticles(response.data);
        setPagination(response.data.meta);
      })
      .catch((error) => pageUtils.setApiErrorMsg(error.response.data))
      .finally(() => setIsLoading(false));
  };

  const handleSelectRow = useCallback(
    (datum) => {
      const id = datum.id;
      history.push({
        pathname: `/app/super_admin/articles/edit/${id}`,
      });
    },
    [history]
  );

  return (
    <>
      <TitlePage mainTitle={'Article'} subTitle={'List'} />

      <Card>
        <ArticleTable
          data={articles}
          pagination={pagination}
          onFetchData={handleFetchArticle}
          isLoading={isLoading}
          rowButtonProps={{
            buttonText: 'View',
            buttonColour: 'primary',
            onButtonClick: handleSelectRow,
          }}
        />
      </Card>
    </>
  );
};

ArticleListPage.propTypes = propTypes;
export default ArticleListPage;
