import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Post from './Post';
//import {posts} from './posts';
import {posts} from './mockDb';
import Row from 'react-bootstrap/esm/Row';
import './Feed.css';

function Feed(props) {

  const feed = posts.map((post) => {
    return (
        <Post post={post} profile={props.profile}/>
    );
  })

  return (
    <Row className="justify-content-center mx-0">
      <Tabs
        defaultActiveKey="feed"
        id="feeds"
        fill
        className="p-0 m-0"
      >
        <Tab eventKey="feed" title="Feed">
          <Row className="justify-content-center">
            {feed}
          </Row>
        </Tab>
        <Tab eventKey="following" title="Following">
          <Row className="justify-content-center">
            {feed}
          </Row>
        </Tab>
      </Tabs>
    </Row>
  );
}

export default Feed;