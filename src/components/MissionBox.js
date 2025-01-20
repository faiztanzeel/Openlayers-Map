import React, { useState } from 'react';
import './MissionBox.css';
import { createStringXY } from 'ol/coordinate';

const MissionBox = ({ onClose, waypoints, distances }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(
    new Array(waypoints.length).fill(false)
  );

  const toggleDropdown = (index) => {
    const newDropdownStates = [...isDropdownOpen];
    newDropdownStates[index] = !newDropdownStates[index];
    setIsDropdownOpen(newDropdownStates);
  };

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
            <th><span class="material-symbols-outlined">
upload
</span></th>
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
              <td>
                <div style={{ position: 'relative' }}>
                  <span
                    className="material-symbols-outlined"
                    onClick={() => toggleDropdown(index)}
                  >
                    more_vert
                  </span>
                  {isDropdownOpen[index] && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width:150,
                        backgroundColor: 'white',
                        padding: '5px',
                        borderRadius: '3px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        zIndex: 1,
                      }}
                    >
                      <ul style={{  listStyle: 'none', 
                          margin: 0, 
                          padding: 0, 
                          border: '1px solid #ccc', 
                          borderRadius: '3px', 
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <li>Insert Polygon Before</li>
                        <li>Insert Polygon After</li>
                      </ul>
                    </div>
                  )}
                </div>
              </td>
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