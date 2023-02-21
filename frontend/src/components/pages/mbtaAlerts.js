import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from "../../utilities/decodeJwt";

function Alerts() {
  const [user, setUser] = useState({});
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setUser(getUserInfo())
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/alerts?filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE',
      );
      setAlerts(result.data.data);
    }
    fetchData();
  }, []);

  if (!user) return (<div><h4>Log in to view this page.</h4></div>)
  return (
    <div>
      {alerts.map(alert => (
        <Card
        body
        border = "info"
        outline
        color= "info"
        className="mx-auto my-2 text-center"
        style={{ width: "40rem" }}
      >
        <Card.Body>
        <Card.Title>Alert</Card.Title>
        
        <Card.Text><b>Summary:</b> {alert.attributes.short_header}</Card.Text>
        <Card.Text><b>{alert.attributes.header}</b> {alert.attributes.description}</Card.Text>
        <Card.Text>{alert.attributes.service_effect}</Card.Text>
        <Card.Text>Severity: {alert.attributes.severity}</Card.Text>
        <Card.Text>Timeframe: {alert.attributes.timeframe}</Card.Text>
        <Card.Text><i>Updated:</i> {alert.attributes.updated_at}</Card.Text>
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