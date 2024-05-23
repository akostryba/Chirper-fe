import React from 'react';
import { Tab} from 'bootstrap';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './Post.css'


function Chirp(props){

    const postChirp = (e) => {
      e.preventDefault();
      console.log(e.currentTarget.elements.chirp.value);
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
                      <Button className='w-25' href="/" variant="primary" type="submit">Chirp</Button>
                    </Row>
                  </Form>
                </Row>
            </Card.Body>
        </Card>
      </Row>
    );
}

export default Chirp;