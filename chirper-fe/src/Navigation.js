import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Navigation() {
    return(
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Chirper</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className='m-2' href="/">Home</Nav.Link>
            <Nav.Link className='m-2' href="/profile">Profile</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className='' href="/chirp">
                <Button className='px-5' variant='primary'>Chirp</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}
export default Navigation