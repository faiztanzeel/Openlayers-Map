import React from "react";

const LineStringModal = ({ coordinates, distances, onClose, selectedWaypointIndex }) => (
  <div className="modal">
    <h3>LineString Waypoints</h3>
    <button onClick={onClose}>Close</button>
    <ul>
      {coordinates.map((coord, index) => (
        <li key={index}>
          <input type="checkbox" /> 
          WP({index.toString().padStart(2, "0")}): {coord.join(", ")} 
          <span> - Distance: {distances[index] || "N/A"} meters</span>
        </li>
      ))}
    </ul>
  </div>
);

export default LineStringModal;