import React, {useState} from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import {Link} from 'react-router-dom';
import './Feed.css';

function Comment(props) {

    return (
        <Card style={{width:'50rem'}}>
            <Card.Body>
                <Row >
                    <Col xs='auto'>
                        <Image src={props.comment.profilePicture} roundedCircle className="profile" />
                    </Col>
                    <Col className="ml-0 p-0">
                        <p className="fw-bold"> <Link className="link-text" to={`/viewProfile/${props.comment.username}`} >@{props.comment.username}</Link></p>
                    </Col>
                </Row>
                <p className="mt-2 mb-3">{props.comment.text}</p>
                <Row>
                    <p className="mb-0 text-muted">{props.comment.date}</p>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Comment;