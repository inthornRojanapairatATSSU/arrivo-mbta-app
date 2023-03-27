import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from "../../utilities/decodeJwt";

function Alerts() {
  const [user, setUser] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [filterId, setFilterId] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    setUser(getUserInfo())
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/route_patterns?page%5Blimit%5D=5&sort=name',
      );
      setAlerts(result.data.data);
    }
    fetchData();
  }, []);

  const handleDirectionChange = (event) => {
    setSelectedDirection(event.target.value === '' ? null : event.target.value);
  };

  const handleFilterIdChange = (event) => {
    setFilterId(event.target.value);
  };

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  }

  const filterAlerts = (alert) => {
    if (selectedDirection !== null && alert.attributes.direction_id.toString() !== selectedDirection) {
      return false;
    }
    if (filterId !== '' && !alert.id.includes(filterId)) {
      return false;
    }
    if (filterName !== '' && !alert.attributes.name.includes(filterName)) {
      return false;
    }
    return true;
  }

  if (!user) return (<div><h4>Log in to view this page.</h4></div>)
  return (
    <div>
      <div>
        <label htmlFor="direction-select">Direction:</label>
        <select id="direction-select" onChange={handleDirectionChange}>
          <option value="">All Directions</option>
          <option value="0">Direction 0</option>
          <option value="1">Direction 1</option>
        </select>
      </div>
      <div>
        <label htmlFor="id-filter">ID:</label>
        <input id="id-filter" type="text" onChange={handleFilterIdChange} value={filterId} />
      </div>
      <div>
        <label htmlFor="name-filter">Name:</label>
        <input id="name-filter" type="text" onChange={handleFilterNameChange} value={filterName} />
      </div>
      {alerts
        .filter(filterAlerts)
        .map(alert => (
        <Card
          key={alert.id}
          body
          border="success"
          outline
          color="success"
          className="mx-auto my-2"
          style={{ width: "40rem" }}
        >
          <Card.Body>
            <Card.Title>Route Patterns!</Card.Title>
            <Card.Text>Direction ID: {alert.attributes.direction_id}</Card.Text>
            <Card.Text>ID: {alert.id}</Card.Text>
            <Card.Text>{alert.attributes.name}</Card.Text>
            <Card.Text>Time Description: {alert.attributes.time_desc}</Card.Text>
          </Card.Body>
        </Card>
      ))}

    </div>
  );
}

export default Alerts;
