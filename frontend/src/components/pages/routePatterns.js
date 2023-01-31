import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/route_patterns?page%5Blimit%5D=5&sort=name',
      );
      setAlerts(result.data.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {alerts.map(alert => (
        <Card
        body
        border = "success"
        outline
        color="success"
        className="mx-auto my-2"
        style={{ width: "40rem" }}
      >
        <Card.Body>
        <Card.Title>Route Patterns!</Card.Title>
        <Card.Text>Direction ID: {alert.attributes.direction_id}</Card.Text>
        <Card.Text>{alert.attributes.name}</Card.Text>
        <Card.Text>Time Description: {alert.attributes.time_desc}</Card.Text>
        </Card.Body>
      </Card>
      ))}

        <h1>Route Patterns!</h1>
      {alerts.map(alert => (
        <div key={alert.id}>
          <h3>{alert.attributes.name}</h3>
          <p>{alert.attributes.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Alerts;