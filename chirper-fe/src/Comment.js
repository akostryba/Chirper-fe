import React, {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import './Feed.css';

function Comment(props) {

    const [apiUser, setApiUser] = useState(null);

    useEffect(() => {
        if (apiUser === null){
            fetch(`http://127.0.0.1:5072/users/${props.comment.userId}`,
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
    }, [apiUser, props.comment.userId]);

    if (apiUser !== null){
        return (
            <Card style={{width:'50rem'}}>
                <Card.Body>
                    <Row >
                        <Col xs='auto'>
                            <Image src={apiUser.profileImage} roundedCircle className="profile" />
                        </Col>
                        <Col className="ml-0 p-0">
                            <p className="fw-bold"> <Link className="link-text" to={`/viewProfile/${apiUser.username}`} >@{apiUser.username}</Link></p>
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