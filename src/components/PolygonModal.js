import React from "react";

const PolygonModal = ({ coordinates, onImportPoints, onClose }) => (
  <div className="modal">
    <h3>Polygon Waypoints</h3>
    <button onClick={onImportPoints}>Import Points</button>
    <button onClick={onClose}>Close</button>
    <ul>
      {coordinates.map((coord, index) => (
        <li key={index}>
          WP({index.toString().padStart(2, "0")}): {coord.join(", ")}
        </li>
      ))}
    </ul>
  </div>
);

export default PolygonModal;
