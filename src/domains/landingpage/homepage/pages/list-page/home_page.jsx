import React, { useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import TitlePage from 'components/atoms/title-page';
import MainBannerTable from 'domains/landingpage/homepage/main-banner-section/pages/list-page/main_banner_list_page';
import LandmarkBannerPage from 'domains/landingpage/homepage/landmark-banner-section/pages/list-page/landmark_banner_list_page';
import AccommodationBannerPage from '../../accommodation-banner-section/pages/list-page/index';
import MiceListPage from '../../mice-banner-section/pages/list-page/index'
import WisataModernListPage from '../../wisata-modern-banner-section/pages/list-page';
import DayclubListPage from '../../day-club-banner-section/pages/list-page';
import AgentAffiliateListPage from '../../agent-affiliate-banner-section/pages/list-page';
import FacilityVideoShortListPage from '../../facility-video-short-section/pages/list-page';

const HomepageManagement = () => {
  const [banners, setBanners] = useState([
    { order: 1, name: 'Join the sustainable fashion community 21/2/24', isActive: true, image: null },
    { order: 2, name: 'Valentine Deals', isActive: true, image: null },
    { order: 3, name: 'Special Sale Jawa Timur', isActive: true, image: null },
  ]);

  const handleEditMainBanner = (banner) => {
    console.log('Edit clicked for Main Banner:', banner);
  };

  return (
    <>
      <TitlePage mainTitle="Homepage" subTitle="Update content for Andara homepage" />

      <Card className="mb-4">
        <CardBody>
          <p>Only the following can be edited in Ops Dash:</p>
          <ul>
            <li>Main Banner</li>
            <li>Landmark Banner</li>
            <li>Accommodation Banners</li>
            <li>MICE Banners</li>
            <li>Wisata Modern Banners</li>
            <li>Day Club Banners</li>
            <li>Agent Affiliate Banners</li>
            <li>Facility Videos Short</li>
          </ul>
        </CardBody>
      </Card>

      {/* Main Banner Section */}
      <Card className="mb-4">
        <CardBody>
          <h5>Main Banner</h5>
          <MainBannerTable data={banners} onEdit={handleEditMainBanner} />
        </CardBody>
      </Card>

      {/* Landmark Banner Section */}
      <Card className="mb-4">
        <CardBody>
          <h5>Landmark Banner</h5>
          <LandmarkBannerPage />
        </CardBody>
      </Card>

      {/* Accommodation Banner Section */}
      <Card className="mb-4">
        <CardBody>
          <h5>Accommodation Banner</h5>
          <AccommodationBannerPage />
        </CardBody>
      </Card>
        {/* MICE Banner Section */}
        <Card className="mb-4">
      <CardBody>
          <h5>MICE Banner</h5>
          <MiceListPage />
        </CardBody>
      </Card>
       {/* Wisata Modern Banners Section */}
       <Card className="mb-4">
        <CardBody>
          <h5>Wisata Modern Banners</h5>
          <WisataModernListPage />
        </CardBody>
      </Card>
       {/* Wisata Modern Banners Section */}
      <Card className="mb-4">
        <CardBody>
          <h5>Day Club Banners</h5>
          <DayclubListPage />
        </CardBody>
      </Card>
       {/* Agent Affiliate Banners Section */}
       <Card className="mb-4">
        <CardBody>
          <h5>Agent Affiliate Banners</h5>
          <AgentAffiliateListPage />
        </CardBody>
      </Card>
       {/* Facility Video Short Section */}
       <Card className="mb-4">
        <CardBody>
          <h5>Facility Video Short</h5>
          <FacilityVideoShortListPage />
        </CardBody>
      </Card>
    </>
  );
};

export default HomepageManagement;
