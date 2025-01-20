import React from 'react';
import './MissionBox.css';
import { createStringXY } from 'ol/coordinate';

const MissionBox = ({ onClose, waypoints, distances }) => {
  return (
    <div className="mission-box">
      <div className="mission-box-header">
        <h3>Mission Creation</h3>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>

      <div className="mission-box-subheading">
        <h4>Waypoint Navigation</h4>
      </div>

      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th> 
            <th>WP</th>
            <th>Coordinates</th>
            <th>Distance (m)</th>
          </tr>
        </thead>
        <tbody>
          {waypoints.map((waypoint, index) => (
            <tr key={index}>
              <td><input type="checkbox" /></td> 
              <td>{index.toString().padStart(2, '0')}</td>
              {/* Wrap coordinates in a span for proper alignment */}
              <td><span>{createStringXY(waypoint, 6)} </span></td> 
              
              <td>{index === 0 ? '-' : distances[index - 1]}</td> 
              {/* <td>{index === 0 ? '-' : distances[index]}</td>  */}
              
              
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mission-box-content">
        <p>
          Click on the map to mark points of the route and then press ↩
          complete the route.
        </p>
      </div>

      <div className="mission-box-footer">
        <button className="generate-button">Generate Data</button>
      </div>
    </div>
  );
};

export default MissionBox;