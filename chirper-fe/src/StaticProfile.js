import React, { useState, useEffect } from 'react';
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
import {users} from './users';
import {useParams} from 'react-router-dom';


function StaticProfile() {

    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");
    const { username } = useParams();

    useEffect(() => {
        users.map((user) => {
                if (user.username === username){
                    setBio(user.bio);
                    setImage(user.profilePicture);
                    return;
                }
            });
    });

    const userDetails = users.map((user) => {
        if (user.username === username){
            console.log(user)
            return user;
        }
    });

    const userPosts = posts.map((post) => {
        if (post.username === username){
            return (
                <Post post={post}/>
            );
        }
        else return <></>   
    })


  return (
    <Container className="justify-content-center">
        
        <Row className='justify-content-center m-3'>
            <Col xs='auto'>
                {console.log(userDetails)}
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

export default StaticProfile;