import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import { Card } from 'reactstrap';
import TitlePage from 'components/atoms/title-page';
import LandingPageTable from 'domains/landingpage/organisms/table/landingpage-table';

const LandingPageListPage = () => {
  const [landingPages, setLandingPages] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
    totalCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleFetchLandingPage = (tableState) => {
    setIsLoading(true);

    const dummyData = [
      { id: 1, title: 'Landing Page Utama', updated_at: '17 Des 2025' },
      { id: 2, title: 'Landing Page Customer', updated_at: '17 Des 2025' },
      { id: 3, title: 'Landing Page Affiliate', updated_at: '17 Des 2025' },
      { id: 4, title: 'Landing Page KPR', updated_at: '17 Des 2025' },
    ];

    setTimeout(() => {
      setLandingPages(dummyData.slice(0, tableState.pageSize || 10));
      setPagination({
        pageIndex: tableState.pageIndex || 1,
        pageSize: tableState.pageSize || 10,
        totalCount: dummyData.length,
      });
      setIsLoading(false);
    }, 500);
  };

  const handleSelectRow = useCallback(
    () => {
      history.push('/app/super_admin/homepage'); // Navigasi ke homepage
    },
    [history]
  );

  return (
    <>
      <TitlePage mainTitle="Landing Pages" subTitle="List" />
      <Card>
        <LandingPageTable
          data={landingPages}
          pagination={pagination}
          onFetchData={handleFetchLandingPage}
          isLoading={isLoading}
          rowButtonProps={{
            buttonText: 'Detail',
            buttonColour: 'primary',
            onButtonClick: handleSelectRow,
          }}
        />
      </Card>
    </>
  );
};

export default LandingPageListPage;
