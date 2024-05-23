import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Post from './Post';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './Profile.css'
import FormGroup from 'react-bootstrap/esm/FormGroup';
import {users, posts, followers} from './mockDb';
import {useParams} from 'react-router-dom';


function StaticProfile(props) {

    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");
    const [username, setUsername] = useState("");
    const { userId } = useParams();
    const [followingCount, setFollowingCount] = useState(0);
    const [followerCount, setFollowersCount] = useState(0);
    const [followButtonText, setFollowButtonText] = useState("Follow");
    const [followButtonVariant, setFollowButtonVariant] = useState("outline-primary")
    const [activeFollow, setActiveFollow] = useState(false)

    useEffect(() => {
        users.map((user) => {
            if (user.userId === parseInt(userId)){
                console.log("Hey")
                setBio(user.bio);
                setImage(user.profileImage);
                setUsername(user.username);
                setFollowButtonVariant("outline-primary");
                setFollowButtonText("Follow");
                setActiveFollow(false);
                return;
            }
            });
    }, [userId]);

    useEffect(() => {
        var followingCount = 0;
        var followerCount = 0;
        followers.map((follow) => {
            if (follow.followerId === parseInt(userId)){
                followingCount++;
            }
            else if (follow.followingId === parseInt(userId)){
                followerCount++;
            }
        });
        setFollowingCount(followingCount);
        setFollowersCount(followerCount);
    }, [userId])

    const userPosts = posts.map((post) => {
        if (post.userId === parseInt(userId)){
            return (
                <Post post={post} profile={props.profile}/>
            );
        }
        else return <></>   
    })

    const follow = () => {
        followers.push({followerId:props.profile.userId, followingId:parseInt(userId)})
        setFollowersCount(followerCount+1);
        setFollowButtonText("Followed");
        setFollowButtonVariant("primary");
        setActiveFollow(true);
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
        <Row className='justify-content-center'>
            <Col>
                <p className='text-center text-muted'>{bio}</p>
            </Col>
        </Row>
        <Row className='justify-content-center mb-2'>
            <Col>
                <p className='text-center text-muted'>{followingCount} Following | {followerCount} Followers</p>
            </Col>
        </Row>
        <Row className='justify-content-center mb-4'>
                <Button variant={`${followButtonVariant}`} className='w-25' onClick={follow} disabled={activeFollow}>{followButtonText}</Button>
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