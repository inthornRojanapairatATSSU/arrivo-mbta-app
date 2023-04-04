import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
        <> 
            <h3 className="text-center">
                Welcome
                <span className='username'> @{username}</span>
            </h3>
            <div className="text-center">
                <Button className="me-2" onClick={handleShow}>
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
            </div> &nbsp;
            <div>
                <h3>
                    Your userId in mongo db is
                    <span className='userId'> {id}</span>
                </h3>
                <h3>
                    Your registered email is
                    <span className='email'> {email}</span>
                </h3>
                <h3>
                    Your password is
                    <span className='password'> {password} ( hashed )</span>
                </h3>
                <h3>
                    Your favorite line is
                    <span className='favline'> {favline}</span>
                </h3>
                <h3>
                    Your favorite route is
                    <span className='favroute'> {favroute}</span>
                </h3>
            </div>
        </>
    )
}

export default HomePage