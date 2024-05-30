import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import logo from './logo.png';
import './Navigation.css';

function Navigation() {
    return(
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            <Image className="profile-icon" src={logo} /> {/*ai generated*/}
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className='m-2' href="/">Home</Nav.Link>
            <Nav.Link className='m-2' href="/profile">Profile</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className='' href="/chirp">
                <Button className='px-5 mx-5' variant='primary'>Chirp</Button>
            </Nav.Link>
            <Nav.Link className='m-2 p-0' href="/login">
              <Image className="login-icon" src="https://static.thenounproject.com/png/3549890-200.png" />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}
export default Navigation