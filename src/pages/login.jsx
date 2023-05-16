import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';

import { useEffect, useState } from 'react';



import { url } from '../helper';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (response?.status === 200) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      window.location.href = '/';
    }
  }, [response]);
  

  const responses = (data) => {
    fetch(`${url}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { email, password };
    setResponse(responses(data));
  };

  return (
    <Card className='m-5'>
      <Card.Header>
        <h1 className='text-center'>Login</h1>
      </Card.Header>
      <Card.Body>
        <Form className='m-5' onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Check me out' />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
