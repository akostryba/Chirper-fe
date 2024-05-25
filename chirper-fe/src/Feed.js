import React, {useState, useEffect} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Post from './Post';
//import {posts} from './posts';
import {posts} from './mockDb';
import Row from 'react-bootstrap/esm/Row';
import './Feed.css';

function Feed(props) {

  const [apiPosts, setApiPosts] = useState(null);
  const [feed, setFeed] = useState(null);
  const [apiFollowingData, setApiFollowingData] = useState(null);
  const [apiFollowing, setApiFollowing] = useState(null);
  const [followingFeed, setFollowingFeed] = useState(null);

  useEffect(() => {
    if (apiFollowingData ===null){
      fetch(`http://127.0.0.1:5072/following/${props.profile.userId}`)
      .then(response => response.json())
      .then(data => {
        setApiFollowingData(data);
      })
    }

    fetch('http://127.0.0.1:5072/posts')
    .then(response => response.json())
    .then(data => {
      setApiPosts(data);
    })
  }, [apiFollowingData, apiPosts, props.profile])

  useEffect(() => {
      if(apiFollowingData !== null){
        var followingIds = [];
        for (var i = 0; i<apiFollowingData.length; i++){
          //console.log(apiFollowingData[i]);
          followingIds.push(apiFollowingData[i].followingId);
        }
        setApiFollowing(followingIds);
      }


  }, [apiFollowingData, apiPosts, props.profile])

  useEffect(()=> {
    if(apiPosts!==null){
        const feed = apiPosts.map((post) => {
          return (
            <Post post={post} profile={props.profile}/>
          );
        })
        setFeed(feed.reverse());
        if(apiFollowing !== null){
          const followingFeed = apiPosts.map((post) => {
            if (apiFollowing.includes(post.userId))
              return (
                <Post post={post} profile={props.profile}/>
              );
          })
          setFollowingFeed(followingFeed.reverse());
        }
      }
  }, [apiPosts, apiFollowing, props.profile])

  // const feed = posts.map((post) => {
  //   return (
  //       <Post post={post} profile={props.profile}/>
  //   );
  // })

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
            {followingFeed}
          </Row>
        </Tab>
      </Tabs>
    </Row>
  );
}

export default Feed;