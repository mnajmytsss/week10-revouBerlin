import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: values.email,
        password: values.password,
      });

      const { accessToken } = response.data;

      localStorage.setItem('accessToken', accessToken);

      navigate('/categories');
    } catch (error) {
      console.error('Error during login:', error);
      alert('Invalid credentials');
    }
  };

 const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <main>
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Field
                  as={Input}
                  name="email"
                  type="email"
                  placeholder="johndoe@email.com"
                />
                {errors.email && touched.email && <Typography color="error">{errors.email}</Typography>}
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Field
                  as={Input}
                  name="password"
                  type="password"
                  placeholder="password"
                />
                {errors.password && touched.password && <Typography color="error">{errors.password}</Typography>}
              </FormControl>
              <Button type="submit" sx={{ mt: 1 }}>
                Log in
              </Button>
              <Typography
                endDecorator={<Link href="/sign-up">Sign up</Link>}
                fontSize="sm"
                sx={{ alignSelf: 'center' }}
              >
                Don&apos;t have an account?
              </Typography>
            </Form>
          )}
        </Formik>
      </Sheet>
    </main>
  );
};

export default Login;
