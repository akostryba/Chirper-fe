import React, {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import {Link} from 'react-router-dom';
import {users} from './mockDb';
import './Feed.css';

function Comment(props) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        for (var i=0; i<users.length; i++){
            if (users[i].userId === props.comment.userId){
                setUser(users[i]);
            }
        }
    }, [props.comment.userId]);

    if (user !== null){
        return (
            <Card style={{width:'50rem'}}>
                <Card.Body>
                    <Row >
                        <Col xs='auto'>
                            <Image src={user.profileImage} roundedCircle className="profile" />
                        </Col>
                        <Col className="ml-0 p-0">
                            <p className="fw-bold"> <Link className="link-text" to={`/viewProfile/${user.username}`} >@{user.username}</Link></p>
                        </Col>
                    </Row>
                    <p className="mt-2 mb-3">{props.comment.text}</p>
                    <Row>
                        <p className="mb-0 text-muted">{props.comment.createdAt}</p>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

export default Comment;