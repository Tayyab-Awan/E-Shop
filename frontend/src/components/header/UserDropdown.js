import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../../actions/userActions';
import { useDispatch } from 'react-redux';

const UserDropdown = ({ username }) => {
    const dispatch = useDispatch();

    return (
        <NavDropdown title={`Hi, ${username}`} id="user-nav-dropdown">
            <LinkContainer to='/profile'>
                <NavDropdown.Item>
                    <i className="fas fa-user-cog"></i>
                    <span className="mx-2">Profile</span>
                </NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/orders'>
                <NavDropdown.Item>
                    <i className="fas fa-book"></i>
                    <span className="mx-2">Orders</span>
                </NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => dispatch(logout())}>Logout</NavDropdown.Item>
        </NavDropdown>
    )
}

export default UserDropdown
