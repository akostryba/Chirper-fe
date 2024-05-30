import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Post from './Post';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Profile.css'
import {useParams} from 'react-router-dom';
import Cookies from 'js-cookie';


function StaticProfile(props) {

    const [user, setUser] = useState("");
    const { userId } = useParams();
    const [followId, setFollowId] = useState(null);
    const [followingCount, setFollowingCount] = useState(0);
    const [following, setFollowing] = useState(null);
    const [followerCount, setFollowersCount] = useState(0);
    const [followers, setFollowers] = useState(null);
    const [apiPosts, setApiPosts] = useState(null);
    const [postsComponent, setPostsComponent] = useState(null);
    const [followButtonText, setFollowButtonText] = useState("Follow");
    const [followButtonVariant, setFollowButtonVariant] = useState("outline-primary")

    useEffect(() => {
        fetch(`http://127.0.0.1:5072/users/${userId}`,
        {
            headers: {
                "Authorization": "Basic " + Cookies.get('base64')
            }
        })
        .then(response => response.json())
        .then(data => {
        setUser(data[0]);
        })

        fetch(`http://127.0.0.1:5072/following/${userId}`,
        {
            headers: {
                "Authorization": "Basic " + Cookies.get('base64')
            }
        })
        .then(response => response.json())
        .then(data => {
        setFollowing(data);
        setFollowingCount(data.length);
        })

        fetch(`http://127.0.0.1:5072/followers/${userId}`,
        {
            headers: {
                "Authorization": "Basic " + Cookies.get('base64')
            }
        })
        .then(response => response.json())
        .then(data => {
        const followersIds = [];
        data.map((follower) => {
            if (follower.followerId === props.profile.userId){
                setFollowId(follower.id);
            }
            followersIds.push(follower.followerId);
        });
        setFollowers(followersIds);
        if (followersIds.includes(props.profile.userId)){
            setFollowButtonText("Following");
            setFollowButtonVariant("primary");
        }
        setFollowersCount(data.length);
        })

        fetch(`http://127.0.0.1:5072/posts/${userId}`,
        {
            headers: {
                "Authorization": "Basic " + Cookies.get('base64')
            }
        })
        .then(response => response.json())
        .then(data => {
        setApiPosts(data);
        })
    }, [props.profile.userId, userId])


    useEffect(() => {
        if (apiPosts !== null){
            const userPosts = apiPosts.map((post) => {
            if (post.userId === parseInt(userId)){
                return (
                    <Post key = {post.postId} post={post} profile={props.profile}/>
                );
            }
            else return <></>   
            })
            setPostsComponent(userPosts.reverse())
        }

    }, [apiPosts, userId, props.profile])

    const follow = async () => {
        if(followers.includes(props.profile.userId)){
            await fetch(`http://127.0.0.1:5072/follow/${followId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Basic " + Cookies.get('base64')
                }
            });
                
            //setFollowersCount(followerCount-1);
            setFollowButtonText("Follow");
            setFollowButtonVariant("outline-primary");
        }
        else{
            await fetch('http://127.0.0.1:5072/follow', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                // mode: "cors", // no-cors, *cors, same-origin
                // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + Cookies.get('base64')
                },
                // redirect: "follow", // manual, *follow, error
                // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({id:0, followerId: props.profile.userId, followingId: user.userId}), // body data type must match "Content-Type" header
                });
            //setFollowersCount(followerCount+1);
            setFollowButtonText("Following");
            setFollowButtonVariant("primary");
        }
        await fetch(`http://127.0.0.1:5072/followers/${userId}`,
        {
            headers: {
                "Authorization": "Basic " + Cookies.get('base64')
            }
        })
        .then(response => response.json())
        .then(data => {
        const followersIds = [];
        data.map((follower) => {
            if (follower.followerId === props.profile.userId){
                setFollowId(follower.id);
            }
            followersIds.push(follower.followerId);
        });
        setFollowers(followersIds);
        setFollowersCount(data.length);
        });
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
        <Row className='justify-content-center'>
            <Col>
                <p className='text-center text-muted'>{user.bio}</p>
            </Col>
        </Row>
        <Row className='justify-content-center mb-2'>
            <Col>
                <p className='text-center text-muted'>{followingCount} Following | {followerCount} Followers</p>
            </Col>
        </Row>
        <Row className='justify-content-center mb-4'>
                <Button variant={`${followButtonVariant}`} className='w-25' onClick={follow} >{followButtonText}</Button>
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
                    {postsComponent}
                </Row>
                </Tab>
            </Tabs>
        </Row>
    </Container>
  );
}

export default StaticProfile;