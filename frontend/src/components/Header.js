import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import UserDropdown from './header/UserDropdown';
import { useSelector } from 'react-redux';

const Header = () => {
    const user = useSelector(state => state.userLogin);
    const { userInfo } = user;

    return (
        <header>
            <Navbar bg="light" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>E-Shop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>
                                    <span className="mx-2">Cart</span>
                                </Nav.Link>
                            </LinkContainer>
                            {
                                !userInfo ?
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <i className="fas fa-user"></i>
                                            <span className="mx-2">Login</span>
                                        </Nav.Link>
                                    </LinkContainer>
                                    :
                                    <UserDropdown username={userInfo.name} />
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
