import React, {} from 'react'
import Card from 'react-bootstrap/Card';
import "./App.css";

const Landingpage = () => {
    
    return (
        <Card style={{ width: '30rem', backgroundColor: '#fff2e6', boxShadow: '3px 3px 3px #d9d9d9' }} className="mx-auto my-4">
        <Card.Img variant="top" src="https://via.placeholder.com/300x200" />
        <Card.Body>
          <Card.Title style={{ fontFamily: 'Montserrat', fontSize: '2.5rem', fontWeight: 'bold' }}>Welcome to ARRIVO</Card.Title>
          <Card.Text style={{ fontFamily: 'Roboto', fontSize: '1.2rem', marginTop: '1rem' }}>
            Hassle-free train web app that provides real-time updates on the MBTA train schedule.
          </Card.Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <Card.Link href="/signup" style={{ fontFamily: 'Roboto', backgroundColor: '#ff6666', color: '#fff', padding: '1rem 2rem', borderRadius: '5px' }}>Sign Up</Card.Link>
            <Card.Link href="/login" style={{ fontFamily: 'Roboto', backgroundColor: '#fff', color: '#ff6666', padding: '1rem 2rem', borderRadius: '5px', border: '2px solid #ff6666' }}>Log In</Card.Link>
          </div>
        </Card.Body>
      </Card>
    )
}

export default Landingpage