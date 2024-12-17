import { Form, Formik } from 'formik'
import { InputField, InputSelectOptions } from 'components'
import profileSchema from './customer-profile-schema'
import PropTypes from 'prop-types'
import LoaderButton from 'components/molecules/loader-button'
import { DateInputField } from 'components'
import { GENDER, CUSTOMER_TYPE  } from 'domains/user/constants'

const propTypes = {
  customer         : PropTypes.object,
  handleSubmitForm : PropTypes.func
}

const defaultProps = {
  customer         : {},
  handleSubmitForm : () => { }
}

const CustomerProfileForm = ({
  customer,
  handleSubmitForm
}) => (
  <Formik
    enableReinitialize={ true }
    initialValues={{
      name          : customer?.name ?? '',
      email         : customer?.email ?? '',
      mobile        : customer?.mobile ?? '',
      birthday      : customer?.birthday ?? '',
      gender        : customer?.gender ?? '',
      customer_type : customer?.customer_type ?? ''
    }}
    validationSchema={ profileSchema }
    onSubmit={ handleSubmitForm }
  >
    {
      (formik) => (
        <>
          <Form>
            <InputField
              type='text'
              name='name'
              label='Name'
              required={ true }
            />
            <InputField
              type='text'
              name='email'
              label='Email'
              disabled={ true }
              required={ true }
            />
            <InputField
              type='tel'
              name='mobile'
              label='Mobile No.'
              formText='Angka [0-9], Contoh: 6281234567890'
              required={ true }
            />
            <DateInputField
              label='Birthday'
              name='birthday'
              dateFormat="dd/MM/yyyy"
              maxDate={ new Date() }
              required={ false }
              formText='format: dd/mm/yy'
            />
            <InputField
              type='select'
              name='gender'
              label='Gender'
              required={ true }
            >
              <InputSelectOptions options={ GENDER } keyPrefix={ 'gender' } />
            </InputField>

            <InputField
              type='select'
              name='customer_type'
              label='Customer Type'
              required={ true }
            >
              <InputSelectOptions options={ CUSTOMER_TYPE } keyPrefix={ 'customer_type' } />
            </InputField>

            <LoaderButton
              className='float-right'
              color='success'
              isLoading={ formik.isSubmitting }
              type="submit"
              text={ 'Save' }
            />
          </Form>
        </>
      )
    }
  </Formik>
)

CustomerProfileForm.propTypes    = propTypes
CustomerProfileForm.defaultProps = defaultProps

export default CustomerProfileForm
