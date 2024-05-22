import React, {useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Post from './Post';
import {posts} from './posts';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './Profile.css'
import FormGroup from 'react-bootstrap/esm/FormGroup';


function Profile(props) {

    const [activeModal, setActiveModal] = useState(false);
    const [username, setUsername] = useState(props.profile.username);
    const [image, setImage] = useState(props.profile.picture);
    const [bio, setBio] = useState("DePaul Student");

    const userPosts = posts.map((post) => {
        if (post.username === username){
            return (
                <Post post={post}/>
            );
        }
        else return <></>   
    })

    const handleEditProfile = () => {
        setActiveModal(true);
        console.log("Button clicked");
    }

    const hideModal = () => {
        setActiveModal(false);
    }

    const saveEdits = (e) => {
        e.preventDefault()
        let oldUsername = username;
        posts.map((post) => {
            console.log(post.username);
            if (post.username === oldUsername){
                post.username = e.currentTarget.elements.username.value;
                post.profilePicture = e.currentTarget.elements.picture.value;
            }
        })
        console.log(posts)
        setUsername(e.currentTarget.elements.username.value);
        setImage(e.currentTarget.elements.picture.value);
        setBio(e.currentTarget.elements.bio.value);
        setActiveModal(false);
    }

  return (
    <Container className="justify-content-center">
        
        <Row className='justify-content-center m-3'>
            <Col xs='auto'>
                <Image src={image} roundedCircle className="mainProfile"/>
            </Col>
        </Row>
        <Row className='justify-content-center mb-2'>
            <Col>
                <h1 className='text-center'>@{username}</h1>
            </Col>
        </Row>
        <Row className='justify-content-center mb-2'>
            <Col>
                <p className='text-center text-muted'>{bio}</p>
            </Col>
        </Row>
        <Row className='justify-content-center'>
            <Button className="w-25 mb-3" variant="outline-secondary" onClick={handleEditProfile}>Edit Profile</Button>

            <Modal
                show={activeModal}
                onHide={hideModal}
                backdrop="static"
                keyboard={false}
            >
                <Form onSubmit={saveEdits}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="@Username"
                                defaultValue={username}
                                className='mb-2'
                            />
                        </FormGroup>
                        <FormGroup controlId="bio">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Write something about yourself..."
                                defaultValue={bio}
                                className='mb-2'
                            />
                        </FormGroup>
                        <FormGroup controlId="picture">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Image Link"
                                defaultValue={image}
                                className='mb-2'
                            />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={hideModal}> Cancel </Button>
                        <Button variant="success" type="submit">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Row>
        <Row className="justify-content-center mx-0">
            <Tabs
                defaultActiveKey="posts"
                id="posts"
                fill
                className="p-0 m-0"
            >
                <Tab eventKey="posts" title="Chirps">
                <Row className="justify-content-center">
                    {userPosts}
                </Row>
                </Tab>
            </Tabs>
        </Row>
    </Container>
  );
}

export default Profile;