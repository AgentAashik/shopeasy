import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required')
});

function Register() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Register</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
          setStatus(null);
          try {
            await registerUser(values.email, values.password);
            setStatus('Registration successful! Redirecting...');
            setTimeout(() => {
              resetForm();
              navigate('/login');
            }, 1500);
          } catch (err) {
            setStatus('Registration failed');
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, status }) => (
          <Form>
            {status && (
              <div style={{ color: status === 'Registration successful! Redirecting...' ? 'green' : 'red' }}>
                {status}
              </div>
            )}
            <div>
              <label>Email:</label><br />
              <Field name="email" type="email" placeholder="eve.holt@reqres.in" />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Password:</label><br />
              <Field name="password" type="password" placeholder="password" />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </div>
            <button type="submit" disabled={isSubmitting}>Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
