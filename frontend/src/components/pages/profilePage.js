import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

const HomePage = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setUser(getUserInfo())
    }, [])

    // handle logout button
    const handleLogout = (async) => {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    };

    if (!user) return (
        <div><h4>Log in to view this page.</h4></div>)
    const { id, email, username, password, favline, favroute } = user
    return (
        <> &nbsp;
            <h3 className="text-center">
                Welcome
                <span className='username'> @{username}</span>
            </h3>
            <Card style={{ width: '30rem' }} className="mx-auto" border={'info'}>
                <Card.Body>
                    <Card.Title className='userId'>{username}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        <b>Your ID is</b>
                        <span> {id}</span>
                    </Card.Subtitle>
                    <Card.Text><b>Registered E-mail:</b> {email}</Card.Text>
                    <Card.Text><b>Password (hashed):</b> {password}</Card.Text>
                    <ListGroup variant="flush">
                        <ListGroup.Item><b>Your favorite route is</b> {favroute}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card> &nbsp;
            <div className="text-center">
                <Button href="/editUserPage">Edit Profile</Button> &nbsp;
                <Button className="me-2" onClick={handleShow} variant='danger'>
                Log Out
                </Button>
                <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                    <Modal.Title>Log Out</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                    Yes
                    </Button>
                </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default HomePage