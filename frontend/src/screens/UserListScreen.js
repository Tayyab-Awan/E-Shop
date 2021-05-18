import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers } from '../actions/userActions';

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.userLogin);
    const usersList = useSelector(state => state.usersList);
    const { loading, error, users } = usersList;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        }
        else {
            history.push('/login?redirect=/admin/users');
        }
    }, [dispatch, userInfo, history])

    const handleDelete = (id) => {

    }

    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant='danger' children={error} />
                : (
                    <Table className='table-sm' striped bordered hovered responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                        <td>{user.isAdmin
                                            ? <i style={{ color: "greenYellow" }} className="fa fa-check"></i>
                                            : <i style={{ color: "red" }} className="fa fa-times"></i>
                                        }</td>
                                        <td>
                                            <LinkContainer to={`/user/${user._id}/edit`}>
                                                <Button className='btn-sm' variant='light'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                className='btn-sm'
                                                variant='danger'
                                                onClick={() => handleDelete(user._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>

                                    </tr>
                                ))
                            ) : null}
                        </tbody>
                    </Table>
                )
            }
        </>
    )
}

export default UserListScreen
