import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from "../../utilities/decodeJwt";

function Alerts() {
  const [user, setUser] = useState({});
  const [alerts, setAlerts] = useState([]);

  function mapSeverityToColorClass(severity) {
    if (0 <= severity && severity <= 3) {
      return 'border-info';
    } else if (4 <= severity && severity <= 7) {
      return 'border-warning';
    } else if (8 <= severity && severity <= 10) {
      return 'border-danger';
    } else {
      return 'border-secondary';
    }
  }

  function mapSeverityToBGColor(severity) {
    if (0 <= severity && severity <= 3) {
      return 'bg-info';
    } else if (4 <= severity && severity <= 7) {
      return 'bg-warning';
    } else if (8 <= severity && severity <= 10) {
      return 'bg-danger';
    } else {
      return 'bg-info';
    }
  }

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
    <div className="container">
      <h1>Alerts!</h1>
      <div className="row">
        {alerts.map(alert => (
          <div key={alert.id} className="col-sm-6 col-lg-4">
            <Card
              bg='info'
              body
              border={false}
              outline
              className={`mx-auto my-2 text-center ${mapSeverityToColorClass(alert.attributes.severity)} ${mapSeverityToBGColor(alert.attributes.severity)}`}
              style={{ width: "100%", borderWidth: "5px" }}
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;
