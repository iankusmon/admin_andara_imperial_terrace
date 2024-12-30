  import React, { useEffect, useState } from 'react';
  import { useHistory, useParams } from 'react-router';
  import PropTypes from 'prop-types';
  import { Form, Formik } from 'formik'
  import { Card, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Alert, Button } from 'reactstrap';
  import BookingFeeApiV2 from 'api/v2/admins/booking-fees-api-v2';
  import RedirectButton from 'components/atoms/redirect-button';
  import TitlePage from 'components/atoms/title-page';
  import { ALERT_TYPES } from 'constants/alert-constants';
  import StringUtils from 'utils/string-util';
  import { Link } from 'react-router-dom';
  import BookingFeeForm from 'domains/booking-fee/organisms/booking-fee-form/booking_fee_form';
  import { LoaderButton } from 'components/molecules'
  import axios from 'axios'

  const TAB = {
    PROFILE: 'profile',
  };

  const propTypes = {
    pageUtils: PropTypes.shape({
      setAlertMsg: PropTypes.func,
      setApiErrorMsg: PropTypes.func
    }),
  }

  const BookingFeeEditPage = ({ pageUtils }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(TAB.PROFILE);
    const [booking_fee, setBookingFee] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false)
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
      setIsLoading(true)
      console.log(id)
      BookingFeeApiV2.show(id)
        .then((response) => {
          setBookingFee(response.data)
        })
        .catch((error) => {
          alert(error)
        })
        .finally(() => setIsLoading(false))
    },[ id ])

    const handleSubmitForm = async (values, formikBag) => {
      await BookingFeeApiV2.update(booking_fee.id, values)
        .then(() => {
          pageUtils.setAlertMsg('The Booking Fee has been edited.', ALERT_TYPES.SUCCESS)
        })
        .catch((error) => {
          formikBag.setErrors(error.response.data.messages)
          pageUtils.setApiErrorMsg(error.response.data)
        })
    }

    const handleClickDownload = async () => {
      // await BookingFeeApiV2.downloadSPKBDocument(booking_fee.id)
      //   .then(() => {
      //     pageUtils.setAlertMsg('The SPKB Document has been downloaded.', ALERT_TYPES.SUCCESS)
      //   })
      //   .catch((error) => {
      //     pageUtils.setApiErrorMsg(error.response.data)
      //   })

      try {
        const response = await axios.get(`/api/admins/booking_fees/${booking_fee.id}/download_spkb_documents`, {
          responseType: 'blob', // Handle binary data
        });
    
        // Create a Blob from the file stream
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = response.headers['content-disposition']
          ?.split('filename=')[1]
          ?.replace(/"/g, '') || 'downloaded_file';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    }

    const toggle = (tab) => {
      if (activeTab !== tab) {
        setActiveTab(tab);
      }
    };

    return (
      <>
        <TitlePage mainTitle={'Booking Fee'} subTitle={'Edit'} />

        <Nav pills className={'mb-3'}>
          <NavItem>
            <NavLink
              className={activeTab === TAB.PROFILE ? 'active' : null}
              onClick={() => {
                toggle(TAB.PROFILE);
              }}
              role="tab"
            >
              {StringUtils.titleCase(TAB.PROFILE)}
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId={TAB.PROFILE}>
            <RedirectButton
              color="primary"
              size="sm"
              className="mb-4"
              text={'Back to list'}
              path={'/app/super_admin/booking_fees'}
            />

            <Row>
              <Col 
                xs={12} 
                md={9} 
                lg={9}
              >
                <Card body>
                  <BookingFeeForm
                    booking_fee={ booking_fee }
                    handleSubmitForm={ handleSubmitForm }
                    buttonText={'SAVE'}
                  />
                </Card>

                <LoaderButton
                  className="mb-3"
                  text={ 'Download SPKB Document as CSV' }
                  isLoading={ isDownloading }
                  onClick={ handleClickDownload }
                  color={ 'success' }
                />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </>
    )
  }

  BookingFeeEditPage.propTypes = propTypes;

  export default BookingFeeEditPage
