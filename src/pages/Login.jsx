import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure the path is correct

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ moved inside the component

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setStatus(null);
          try {
            const res = await loginUser(values.email, values.password);
            if (res.token) {
              login(res.token); // ✅ sets auth context and localStorage
              navigate('/profile'); // or navigate('/')
            } else {
              setStatus('Login failed. No token received.');
            }
          } catch (err) {
            console.error(err);
            setStatus('Invalid credentials. Try again.');
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, status }) => (
          <Form>
            {status && <div style={{ color: 'red' }}>{status}</div>}
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
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
