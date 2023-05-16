import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col, Alert } from 'react-bootstrap';

import { useEffect, useState } from 'react';

import { url } from '../helper';

export default function Register() {
  const [response, setResponse] = useState({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  useEffect(() => {
    if (response?.status === 200) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      window.location.href = '/';
    }
  }, [response]);

  const responses = (data) => {
    fetch(`${url}/users/add`, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, name, surname, phone, address, password, password2);
    const data = { email, name, surname, phone, address, password, password2 };
    if (password !== password2) {
      return <Alert variant='danger'>Passwords do not match</Alert>;
    }

    setResponse(await responses(data));
  };
  return (
    <Form className='m-5' onSubmit={handleSubmit}>
      <Row>
        <Form.Group className='mb-3' controlId='formBasicEmail' as={Col} md='6'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicName' as={Col} md='6'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Form.Group>

        <Form.Group
          className='mb-3'
          controlId='formBasicSurname'
          as={Col}
          md='6'
        >
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter surname'
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPhone' as={Col} md='6'>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter phone'
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </Form.Group>

        <Form.Group
          className='mb-3'
          controlId='formBasicAddress'
          as={Col}
          md='6'
        >
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </Form.Group>

        <Form.Group
          className='mb-3'
          controlId='formBasicPassword'
          as={Col}
          md='6'
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>
        <Form.Group
          className='mb-3'
          controlId='formBasicPassword'
          as={Col}
          md='6'
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Sign Up
        </Button>
      </Row>
    </Form>
  );
}
