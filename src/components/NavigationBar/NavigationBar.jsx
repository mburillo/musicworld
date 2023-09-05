import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Row, Col, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';  // Asegúrate de tener esto instalado: npm install react-router-bootstrap
import 'font-awesome/css/font-awesome.min.css';
import logo from '../../assets/images/logo.png';
import usericon from '../../assets/images/usericon.svg';
import shoppingcarticon from '../../assets/images/shoppingcart.svg';
import { CartContext } from '../Context/CartContext';
import { useContext } from 'react';
import { AuthContext } from '../../authContext/AuthProvider';
const NavigationBar = () => {
    const { setShowModal } = useContext(CartContext);
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <Navbar bg="light" expand="lg" className='fixed-top'>
            <Container fluid>
                <Row className="w-100">
                    <Col xs={4}>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="mr-2" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                <LinkContainer to="/cds">
                                    <Nav.Link>CDs</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/vinilos">
                                    <Nav.Link>Vinyl</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/camisetas">
                                    <Nav.Link>Shirts</Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                    <Col xs={4} className="d-flex justify-content-center">
                        <LinkContainer to="/">
                            <Navbar.Brand>
                                <img src={logo} alt="Logo" width="100" height="30" />
                            </Navbar.Brand>
                        </LinkContainer>
                    </Col>
                    <Col xs={4} className="d-flex justify-content-end">
                        <Form inline className="mr-2">
                            <FormControl type="text" placeholder="Buscar" className="mr-sm-2" />
                        </Form>
                        <Nav>
                            <button onClick={() => setShowModal(true)} style={{ border: 'none', background: 'transparent' }}>
                                <img src={shoppingcarticon} alt="shopping-cart" width="30" height="30" />
                            </button>
                            <LinkContainer to={isAuthenticated ? "/profile" : "/login"}>
    <Nav.Link>
        <img src={usericon} alt="user-icon" width="30" height="30" />
    </Nav.Link>
</LinkContainer>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}



export default NavigationBar;
