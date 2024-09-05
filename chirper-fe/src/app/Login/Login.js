import React, {useState} from 'react';
import { Row, Col, Tabs, Tab, Form, FormGroup, Button, Alert } from 'react-bootstrap';
import Cookies from 'js-cookie';


function Login (){

  const [showAlert, setShowAlert] = useState(false);

  const createAccount = (e) => {
    e.preventDefault()
      fetch(`http://127.0.0.1:5072/newUser`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Basic " + Cookies.get('base64')
          },
          body: JSON.stringify({
            userId:0, 
            username:e.currentTarget.elements.newUsername.value, 
            password:e.currentTarget.elements.newPassword.value, 
            bio:e.currentTarget.elements.bio.value, 
            profileImage:e.currentTarget.elements.picture.value
          })
        });
        window.location.href ='/login';
  }

  const authenticate = (e) => {
    e.preventDefault()
    fetch('http://127.0.0.1:5072/login', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Basic " + btoa(e.target.elements.username.value + ":" + e.target.elements.password.value)
        },
        
        body: JSON.stringify({
            username: e.target.elements.username.value,
            password: e.target.elements.password.value
        })
    })
    .then(response => { 
        if (response.ok) { // Check if response went through
            return response.text();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => { 
        let dataObj = JSON.parse(data);
        Cookies.set('user', data, { expires: 7 }); // The cookie will expire after 7 days
        Cookies.set('base64', btoa(dataObj.username+":"+dataObj.password), { expires: 7 });
        window.location.href ='/';  
    })
    .catch(error => {
      console.error('There has been a problem with the fetch operation:', error)
      setShowAlert(true);
    });

  }

  return (
    <Row className="justify-content-center " >
      <Col xs="auto">
        <Tabs
          defaultActiveKey="login"
          id="feeds"
          fill
          className="mb-3 ml-auto mr-auto"
          >
          <Tab className="justify-content-center " eventKey="login" title="Login">
            <Row className="justify-content-center">
              <Form onSubmit={authenticate}>
                <FormGroup controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="@Username"
                    className='mb-2'
                    />
                </FormGroup>
                <FormGroup controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    className='mb-2'
                    />
                </FormGroup>
                <Button variant="primary" type="submit" className="w-100">Login</Button>
              </Form>
            </Row>
            <Row className="mt-3">
              <Alert variant="danger" onClose={() => setShowAlert(false)} show={showAlert} dismissible>
                <Alert.Heading>Login Failed</Alert.Heading>
                <p>
                  Please try a different username or password.
                </p>
              </Alert>
            </Row>
          </Tab>
          <Tab className="justify-content-center" eventKey="newAccount" title="Create an account">
            <Row className=" justify-content-center">
              <Form onSubmit={createAccount}>
                <FormGroup controlId="newUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                  required
                  type="text"
                  placeholder="@Username"
                  className='mb-2'
                  />
                </FormGroup>
                <FormGroup controlId="newPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    className='mb-2'
                    />
                </FormGroup>
                <FormGroup controlId="bio">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Write something about yourself..."
                    className='mb-2'
                    />
                </FormGroup>
                <FormGroup controlId="picture">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Image Link"
                    className='mb-2'
                    />
                </FormGroup>
                <Button variant="primary" type="submit" className="w-100">Create Account</Button>
              </Form>
            </Row>
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );
}

export default Login;