import React, {useState, useEffect} from 'react';
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
import Cookies from 'js-cookie';
import './Post.css';


function Post(props){

    const [apiComments, setApiComments] = useState(null);
    const [apiUser, setApiUser] = useState(null);
    const [commentCount, setCommentCount] = useState(0);
    const [commentComponents, setCommentComponents] = useState(null);
    const [activeModal, setActiveModal] = useState(false);
    const [newCommentVisible, setNewCommentVisible] = useState(false);
    const [commentButtonVisible, setCommentButtonVisible] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:5072/comments/${props.post.postId}`,
        {
            headers: {
                "Authorization": "Basic " + Cookies.get('base64')
            }
        })
        .then(response => response.json())
        .then(data => {
            setApiComments(data);
        })

        if (apiUser === null){
            fetch(`http://127.0.0.1:5072/users/${props.post.userId}`,
            {
                headers: {
                    "Authorization": "Basic " + Cookies.get('base64')
                }
            })
            .then(response => response.json())
            .then(data => {
                setApiUser(data[0]);
            })
        }
    }, [apiComments, apiUser, props.post.postId, props.post.userId])

    const enableModal = () => {
        setActiveModal(true);
    }
    const hideModal = () => {
        setActiveModal(false);
    }

    const date = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(currentDate.getDate()).padStart(2, '0'); 

        return `${month}-${day}-${year}`;
    }

    const addComment = (e) => {
        e.preventDefault();
        //copied from JS fetch API documentation
        fetch('http://127.0.0.1:5072/comment', {
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
            body: JSON.stringify({userId:props.profile.userId, profileImage:props.profile.profileImage, text:e.currentTarget.elements.chirp.value, postId:props.post.postId, commentId:0, createdAt:date()}), // body data type must match "Content-Type" header
            });
        setNewCommentVisible(false);
        setCommentButtonVisible(true);
    }

    const updateCommentState = () => {
        setNewCommentVisible(true);
        setCommentButtonVisible(false);
    }


    useEffect(()=> {
        if (apiComments !== null){
            const commentComps = apiComments.map((comment) => {
                if (comment.postId === props.post.postId){
                    return (
                        <Comment key={comment.commentId} comment={comment}/>
                    );
                }
            })
            setCommentComponents(commentComps);
        }
    }, [apiComments, props.post.postId])


    useEffect(() => {
        if(apiComments!==null){
            var count = 0;
            for (var i=0; i<apiComments.length; i++){
                if (apiComments[i].postId === props.post.postId){
                    count++;
                }
            }
            setCommentCount(count);
        }
    }, [apiComments, props.post.postId]);

    if (apiUser!== null){
    return (
        <Card style={{width:'50rem'}}>
            <Card.Body>
                <Row >
                    <Col xs='auto'>
                        <Image src={apiUser.profileImage} roundedCircle className="profile" />
                    </Col>
                    <Col className="ml-0 p-0">
                        <p className="fw-bold"> <Link className="link-text" to={`/viewProfile/${apiUser.userId}`} >@{apiUser.username}</Link></p>
                    </Col>
                </Row>
                <p className="mt-2 mb-3">{props.post.text}</p>
                <Row>
                    <Col>
                        <p className="mb-0 text-muted">{props.post.createdAt}</p>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="outline-primary" size="sm" onClick={enableModal}>Comments ({commentCount})</Button>
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
                                {commentComponents}
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
                                                    <Image src={props.profile.profileImage} roundedCircle className="profile" />
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
}

export default Post;