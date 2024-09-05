import React, {useEffect, useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Post from '../Post/Post';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './Profile.css'
import FormGroup from 'react-bootstrap/esm/FormGroup';
import Cookies from 'js-cookie';


function Profile(props) {

    const [apiPosts, setApiPosts] = useState(null);
    const [userPosts, setUserPosts] = useState(null);
    const [activeModal, setActiveModal] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:5072/posts/${props.profile.userId}`,
        {
            headers: {
                "Authorization": "Basic " + Cookies.get('base64')
            }
        })
        .then(response => response.json())
        .then(data => {
        setApiPosts(data);
        })
    }, [props.profile.userId])

    useEffect(() => {
        fetch(`http://127.0.0.1:5072/users/${props.profile.userId}`,
        {
            headers: {
                "Authorization": "Basic " + Cookies.get('base64')
            }
        })
        .then(response => response.json())
        .then(data => {
        setUser(data[0]);
        })
    }, [props.profile.userId])

    useEffect(() => {
        if (apiPosts !== null && user!== null){
            const components = apiPosts.map((post) => {
                if (post.userId === user.userId){
                    return (
                        <Post key = {post.postId} post={post} profile={user}/>
                    );
                }
                else return <></>   
            })
            setUserPosts(components.reverse())
        }
    }, [apiPosts, props.profile, user])
    

    const handleEditProfile = () => {
        setActiveModal(true);
    }

    const hideModal = () => {
        setActiveModal(false);
    }

    const saveEdits = (e) => {
        e.preventDefault()
        let newUsername = e.currentTarget.elements.username.value;
        let newBio = e.currentTarget.elements.bio.value;
        let newPicture = e.currentTarget.elements.picture.value;
        fetch(`http://127.0.0.1:5072/user/${props.profile.userId}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + Cookies.get('base64')
            },
            body: JSON.stringify({userId:0, username:e.currentTarget.elements.username.value, password:user.password, bio:e.currentTarget.elements.bio.value, profileImage:e.currentTarget.elements.picture.value}), // body data type must match "Content-Type" header
            })
            .then(response => {
                Cookies.set('base64', btoa(newUsername+":"+user.password), { expires: 7 });
                Cookies.set('user', JSON.stringify({userId:user.userId, username:newUsername, password:user.password, bio:newBio, profileImage:newPicture}), { expires: 7 });
            });
        setActiveModal(false);
        setUser({userId:user.userId, username:newUsername, password:user.password, bio:newBio, profileImage:newPicture});
    }

  if (user!==null) return (
    <Container className="justify-content-center">
        
        <Row className='justify-content-center m-3'>
            <Col xs='auto'>
                <Image src={user.profileImage} roundedCircle className="mainProfile"/>
            </Col>
        </Row>
        <Row className='justify-content-center mb-2'>
            <Col>
                <h1 className='text-center'>@{user.username}</h1>
            </Col>
        </Row>
        <Row className='justify-content-center mb-2'>
            <Col>
                <p className='text-center text-muted'>{user.bio}</p>
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
                                defaultValue={user.username}
                                className='mb-2'
                            />
                        </FormGroup>
                        <FormGroup controlId="bio">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Write something about yourself..."
                                defaultValue={user.bio}
                                className='mb-2'
                            />
                        </FormGroup>
                        <FormGroup controlId="picture">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Image Link"
                                defaultValue={user.profileImage}
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