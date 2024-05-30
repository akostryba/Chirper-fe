import React from 'react';
import { Tab} from 'bootstrap';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import Container from 'react-bootstrap/Container';
import './Post.css'


function Chirp(props){

    const date = () => {
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
          const day = String(currentDate.getDate()).padStart(2, '0'); 

          return `${month}-${day}-${year}`;
    }

    const postChirp = (e) => {
      e.preventDefault();
      fetch('http://127.0.0.1:5072/post', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + Cookies.get('base64')
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({postId:0, userId:props.profile.userId, text:e.currentTarget.elements.chirp.value, createdAt:date()}), // body data type must match "Content-Type" header
            });
        window.location.href ='/';
    }

    return (
      <Row className='justify-content-center mx-0 mt-3'>
        <Card style={{width:'50rem'}}>
            <Card.Body>
                <Row >
                    <Col xs='auto'>
                        <Image src={props.profile.profileImage} roundedCircle className="profile" />
                    </Col>
                    <Col className="ml-0 p-0">
                        <p className="fw-bold"> @{props.profile.username}</p>
                    </Col>
                </Row>
                <Row className="mt-3">
                  <Form onSubmit={postChirp}>
                    <FormGroup controlId="chirp">
                      <Form.Control
                          as="textarea"
                          placeholder="What are you thinking about..."
                          className='mb-2'
                      />
                    </FormGroup>
                    <Row className='mx-0 mt-3 justify-content-end'>
                      <Button className='w-25' variant="primary" type="submit">Chirp</Button>
                    </Row>
                  </Form>
                </Row>
            </Card.Body>
        </Card>
      </Row>
    );
}

export default Chirp;