import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../actions/UserActions';
function NavBar() {
  const userLogin = useSelector(state =>state.userLogin);

  const disptach = useDispatch()
  const {userInfo} = userLogin
  const logoutHandler = ()=>{
    disptach (logout())
  }

  return (
    <Navbar expand="lg" className="bg-dark mb-2" variant="dark" collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>ProShop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <LinkContainer to='/cart'>
            <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
          </LinkContainer>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id="usernameDropdown">
              <LinkContainer to={`/profile/${userInfo._id}`}>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
          ):(
          <LinkContainer to='/login'>
            <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
          </LinkContainer>)}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;