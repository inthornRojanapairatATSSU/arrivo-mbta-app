import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/alerts?page%5Blimit%5D=10&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE&filter%5Bdatetime%5D=NOW&filter%5Bseverity%5D=3%2C%204%2C%2010',
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
        border = "info"
        outline
        color="info"
        className="mx-1 my-2 text-center"
        style={{ width: "30rem" }}
      >
        <Card.Body>
        <Card.Title>Alert</Card.Title>
        
        <Card.Text>{alert.attributes.header}{alert.attributes.description}</Card.Text>
        <Card.Text>{alert.attributes.service_effect}</Card.Text>
        <Card.Text>Severity: {alert.attributes.severity}</Card.Text>
        <Card.Text>Banner: {alert.attributes.banner}</Card.Text>
        <Card.Text>Updated: {alert.attributes.updated_at}</Card.Text>
        </Card.Body>
      </Card>
      ))}

        <h1>Alerts!</h1>
      {alerts.map(alert => (
        <div key={alert.id}>
          <h3>{alert.attributes.header}</h3>
          <p>{alert.attributes.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Alerts;