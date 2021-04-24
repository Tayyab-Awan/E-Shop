import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getProfile, updateProfile } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const ProfileScreen = ({ history }) => {
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.userProfile);
    const { loading, error, user } = userProfile;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const updatedProfile = useSelector(state => state.updatedProfile);
    const { success } = updatedProfile;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!userInfo)
            history.push('/login?redirect=profile');
        else {
            if (!user.name)
                dispatch(getProfile('profile'));
            else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [history, userInfo, dispatch, user])

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword)
            setMessage('Passwords do not match')
        else {
            setMessage(null);
            dispatch(updateProfile({ id: user._id, name, email, password }))
        }
    }

    return (
        <FormContainer>
            <h1>Your Profile</h1>
            { error ? <Message variant='danger' children={error} /> : null}
            { message ? <Message variant='danger' children={message} /> : null}
            { success ? <Message variant='success' children={'Profile has been updated'} /> : null}
            { loading ? <Loader /> : null}
            <Form onSubmit={(e) => submitHandler(e)}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button className='btn-block' type='submit' variant='primary'>Update</Button>
            </Form>

        </FormContainer>
    )
}

export default ProfileScreen
