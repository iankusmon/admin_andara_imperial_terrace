import './login.css'; // Import CSS file
import AdminsApiV2 from 'api/v2/admins-api-v2';
import { Form, Formik } from 'formik';
import { useAuth } from 'providers/auth-provider';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Card, CardBody, FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'; // Add icons
import loginSchema from './login-schema';
import Logo from '../../../../src/assets/img/Logo-AIT.png'; // Adjust path for your logo

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.body.classList.add('bg-default');
    return () => {
      document.body.classList.remove('bg-default');
    };
  }, []);

  const authContext = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (authContext.isAuth) history.push('/app');
  }, [authContext.isAuth, history]);

  const handleSubmit = async (values, actions) => {
    try {
      const response = await AdminsApiV2.loginAdmin(values.email, values.password);
      const admin = response.data.admin;
      if (admin) {
        authContext.onLogin({
          name: admin.name,
          role: admin.access,
        });
        history.push('/app');
      } else {
        alert('Invalid credentials.');
      }
    } catch (error) {
      actions.setSubmitting(false);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <CardBody>
          <div className="login-header">
            <img src={Logo} alt="Logo" className="login-logo" />
            <h3>Login</h3>
          </div>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form>
                <FormGroup>
                  <Label for="email" className="login-label">
                    Email
                  </Label>
                  <div className="input-icon-container">
                    <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="AndaraIT@gmail.com"
                      className="login-input"
                      {...formikProps.getFieldProps('email')}
                    />
                  </div>
                  {formikProps.errors.email && formikProps.touched.email && (
                    <div className="login-error">{formikProps.errors.email}</div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="password" className="login-label">
                    Password
                  </Label>
                  <div className="password-container">
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      placeholder="***********"
                      className="login-input"
                      {...formikProps.getFieldProps('password')}
                    />
                    <span
                      className="password-toggle-icon"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                  </div>
                  {formikProps.errors.password && formikProps.touched.password && (
                    <div className="login-error">{formikProps.errors.password}</div>
                  )}
                </FormGroup>
                <Button
                  className="login-button"
                  type="submit"
                  disabled={formikProps.isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;
