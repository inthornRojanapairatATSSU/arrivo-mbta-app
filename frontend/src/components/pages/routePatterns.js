import React, { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from "../../utilities/decodeJwt";

function Alerts() {
  const [user, setUser] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [filterDirectionID, setFilterDirectionID] = useState(null);
  const [filterName, setFilterName] = useState('');
  const directionSelectRef = useRef();
  const [filterId, setFilterId] = useState('');

  useEffect(() => {
    setUser(getUserInfo())
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/route_patterns?sort=name',
      );
      setAlerts(result.data.data);
    }
    fetchData();
  }, []);

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleDirectionChange = (event) => {
    setFilterDirectionID(event.target.value === '' ? null : event.target.value);
  };

  const handleFilterIdChange = (event) => {
    setFilterId(event.target.value);
  };

  const handleResetFilters = () => {
    setFilterName("");
    setFilterDirectionID(null);
    directionSelectRef.current.value = "";
    setFilterId("");
  }

  const filterRoutePatterns = (alert) => {
    if (filterDirectionID !== null && alert.attributes.direction_id.toString() !== filterDirectionID) {
      return false;
    }
    if (filterId !== '' && !alert.id.toLowerCase().includes(filterId.toLowerCase())) {
      return false;
    }
    if (filterName !== '' && !alert.attributes.name.toLowerCase().includes(filterName.toLowerCase())) {
      return false;
    }
    return true;
  }

  if (!user) return (<div><h4>Log in to view this page.</h4></div>)
  return (
    <div className="container">
      <h2 className="text-center">Filters</h2>
      <div className="text-center">
        <label htmlFor="name-filter">Name:</label> &nbsp;
        <input id="name-filter" type="text" onChange={handleFilterNameChange} value={filterName} />
        &nbsp;&nbsp;&nbsp;
        <label htmlFor="direction-select">Direction:</label> &nbsp;
        <select id="direction-select" onChange={handleDirectionChange} ref={directionSelectRef} style={{ width: "100px" }}>
          <option value="">--</option>
          <option value="0">Inbound</option>
          <option value="1">Outbound</option>
        </select>
        &nbsp;&nbsp;&nbsp;
        <label htmlFor="id-filter">ID: </label> &nbsp;
        <input id="id-filter" type="text" onChange={handleFilterIdChange} value={filterId} style={{ width: "100px" }} />
      </div>
      &nbsp;
      <div className="text-center">
        <button onClick={handleResetFilters}>Reset</button>
      </div>
      &nbsp;&nbsp;&nbsp;
      <h2 className="text-center">Route Patterns!</h2>
      <div className="row">
        {alerts
          .filter(filterRoutePatterns)
          .map(alert => (
            <div key={alert.id} className="col-sm-6 col-lg-4">
              <Card
                body
                border="success"
                outline
                color="success"
                className={'mx-auto my-2 text-center'}
                style={{ width: "75%" }}
              >
                <Card.Body>
                  <Card.Title>{alert.attributes.name}</Card.Title>
                  <Card.Text><b>Direction:</b> {alert.attributes.direction_id === 0 ? "Inbound" : "Outbound"}</Card.Text>
                  <Card.Text><b>Route:</b> {alert.relationships.route.data.id}</Card.Text>
                  <Card.Text><b>Time Description:</b> {alert.attributes.time_desc}</Card.Text>
                  <Card.Text><b>ID:</b> {alert.id}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Alerts;
