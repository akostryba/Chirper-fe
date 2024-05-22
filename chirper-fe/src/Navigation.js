import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';

function Navigation() {
    return(
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className='m-0'>
          <Navbar.Brand href="/">Chirper</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className='m-2' href="/">Home</Nav.Link>
            <Nav.Link className='m-2' href="/profile">Profile</Nav.Link>
            <Nav.Link className='m-2' href="/">New Post</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}
export default Navigation