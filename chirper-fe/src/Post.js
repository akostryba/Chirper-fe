import React from 'react';
import { Tab} from 'bootstrap';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './Post.css'


function Post(props){
    return (
        <Card style={{width:'50rem'}}>
            <Card.Body>
                <Row >
                    <Col xs='auto'>
                        <Image src={props.post.profilePicture} roundedCircle className="profile" />
                    </Col>
                    <Col className="ml-0 p-0">
                        <p className="fw-bold"> @{props.post.username}</p>
                    </Col>
                </Row>
                <p className="mt-2 mb-3">{props.post.text}</p>
                <p className="mb-0 text-muted">{props.post.date}</p>
            </Card.Body>
        </Card>
    );
}

export default Post;