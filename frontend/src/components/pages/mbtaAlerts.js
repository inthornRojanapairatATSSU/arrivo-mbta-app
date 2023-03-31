import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from "../../utilities/decodeJwt";

const PRIMARY_COLOR = "#cc5c99";
const SECONDARY_COLOR = "#0c0c1f";
function Alerts() {
  const [user, setUser] = useState({});
  const [alerts, setAlerts] = useState([]);

  const [error, setError] = useState("");
  const [light, setLight] = useState(true);
  const [bgColor, setBgColor] = useState(SECONDARY_COLOR);
  const [bgText, setBgText] = useState("Light Mode");

  const [filterServEff, setfilterServEff] = useState('');
  const [filterSeverity, setFilterSeverity] = useState(null);
  const [filterSummary, setFilterSummary] = useState('');

  useEffect(() => {
    if (light) {
      setBgColor("white");
      setBgText("Dark mode?");
    } else {
      setBgColor(SECONDARY_COLOR);
      setBgText("Light mode?");
    }
  }, [light]);

  let labelStyling = {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textDecoration: "none",
  };
  let backgroundStyling = { background: bgColor };
  let buttonStyling = {
    background: PRIMARY_COLOR,
    borderStyle: "none",
    color: bgColor,
  };

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

  const handleFilterServiceEffectChange = (event) => {
    setfilterServEff(event.target.value);
  }

  const handleFilterSeverityChange = (event) => {
    setFilterSeverity(event.target.value === '' ? null : event.target.value);
  }

  const handleFilterSummaryChange = (event) => {
    setFilterSummary(event.target.value);
  }

  const handleResetFilters = () => {
    setfilterServEff("");
    setFilterSeverity("");
    setFilterSummary("");
  }

  const filterAlerts = (alert) => {
    if (filterServEff !== null && !alert.attributes.service_effect.toLowerCase().includes(filterServEff.toLowerCase())) {
      return false;
    }
    if (filterSeverity !== null && alert.attributes.severity.toString() !== filterSeverity) {
      return false;
    }
    if (filterSummary === "") {
      return true;
    } else {
      const regex = new RegExp(`\\b${filterSummary}\\b`, "i");
      return regex.test(alert.attributes.short_header);
    }
    return true;
  }

  if (!user) return (<div><h4>Log in to view this page.</h4></div>)
  return (
    <div style={backgroundStyling}>
      <div className="container">
        <div class="form-check form-switch d-flex justify-content-center">
          <input
            class="form-check-input text-center"
            type="checkbox"
            id="flexSwitchCheckDefault"
            onChange={() => {
              setLight(!light);
            }}
          /> &nbsp;
          <label
            class="form-check-label"
            for="flexSwitchCheckDefault"
            className="text-muted"
          >
            {bgText}
          </label>
        </div>
        {error && (
          <div style={labelStyling} className="pt-3">
            {error}
          </div>
        )}
        <h2 className="text-center">Filters</h2>
        <div className="text-center">
          <label htmlFor="service-effect-filter">Service Effect: </label>&nbsp;
          <input id="service-effect-filter" type="text" onChange={handleFilterServiceEffectChange} value={filterServEff} style={{ width: "100px" }} />
          &nbsp; &nbsp; &nbsp;
          <label htmlFor="severity-filter">Severity: </label> &nbsp;
          <input id="severity-filter" type="number" min="1" max="10" onChange={handleFilterSeverityChange} value={filterSeverity} style={{ width: "50px" }} />
          &nbsp; &nbsp; &nbsp;
          <label htmlFor="summary-filter"> Summary: </label> &nbsp;
          <input id="summary-filter" type="text" onChange={handleFilterSummaryChange} value={filterSummary} />
        </div> &nbsp;
        <div className="text-center">
          <button onClick={handleResetFilters}>Reset</button>
        </div> &nbsp;
        <h2 className="text-center">Alerts!</h2>
        <div className="row">
          {alerts
            .filter(filterAlerts)
            .map(alert => (
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
                    <Card.Title>{alert.attributes.service_effect}</Card.Title>
                    <Card.Text><b>Summary:</b> {alert.attributes.short_header}</Card.Text>
                    <Card.Text><b>{alert.attributes.header}</b> {alert.attributes.description}</Card.Text>
                    <Card.Text>Severity: {alert.attributes.severity}</Card.Text>
                    <Card.Text>Timeframe: {alert.attributes.timeframe}</Card.Text>
                    <Card.Text><i>Updated:</i> {alert.attributes.updated_at}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Alerts;
