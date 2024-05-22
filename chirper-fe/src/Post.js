import React, {useState} from 'react';
import { Tab} from 'bootstrap';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Comment from './Comment';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import {Link} from 'react-router-dom';
import './Post.css';


function Post(props){

    const [activeModal, setActiveModal] = useState(false);
    const [newCommentVisible, setNewCommentVisible] = useState(false)
    const [commentButtonVisible, setCommentButtonVisible] = useState(true)
    const enableModal = () => {
        setActiveModal(true);
    }
    const hideModal = () => {
        setActiveModal(false);
    }

    const addComment = (e) => {
        e.preventDefault();
        props.post.comments.push({username:props.profile.username, profilePicture:props.profile.picture, text:e.currentTarget.elements.chirp.value, date:'2024-04-03'})
        setNewCommentVisible(false);
        setCommentButtonVisible(true);
    }

    const updateCommentState = () => {
        setNewCommentVisible(true);
        setCommentButtonVisible(false);
    }

    const comments = props.post.comments.map((comment) => {
        return (
            <Comment comment={comment}/>
        );
    })

    return (
        <Card style={{width:'50rem'}}>
            <Card.Body>
                <Row >
                    <Col xs='auto'>
                        <Image src={props.post.profilePicture} roundedCircle className="profile" />
                    </Col>
                    <Col className="ml-0 p-0">
                        <p className="fw-bold"> <Link className="link-text" to={`/viewProfile/${props.post.username}`} >@{props.post.username}</Link></p>
                    </Col>
                </Row>
                <p className="mt-2 mb-3">{props.post.text}</p>
                <Row>
                    <Col>
                        <p className="mb-0 text-muted">{props.post.date}</p>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="outline-primary" size="sm" onClick={enableModal}>Comments ({props.post.comments.length})</Button>
                    </Col>
                </Row>
                <Modal
                        show={activeModal}
                        onHide={hideModal}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Comments</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='mx-2'>
                            <Row className="justify-content-center">
                                {comments}
                            </Row>
                            {commentButtonVisible && (
                                <Row className="d-flex justify-content-end mt-3">
                                    <Button className="w-25" size="sm" onClick={updateCommentState}>Add Comment</Button>
                                </Row>
                            )}
                            {newCommentVisible && (
                                <Row className='justify-content-center mx-0 mt-3'>
                                    <Card style={{width:'50rem'}}>
                                        <Card.Body>
                                            <Row >
                                                <Col xs='auto'>
                                                    <Image src={props.profile.picture} roundedCircle className="profile" />
                                                </Col>
                                                <Col className="ml-0 p-0">
                                                    <p className="fw-bold"> @{props.profile.username}</p>
                                                </Col>
                                            </Row>
                                            <Row className="mt-3">
                                            <Form onSubmit={addComment}>
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
                            )}
                        </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
}

export default Post;