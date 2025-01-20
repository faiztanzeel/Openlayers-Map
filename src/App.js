import React, { useState } from "react";
import MapComponent from "./components/Map";
import LineStringModal from "./components/LineStringModal";
import PolygonModal from "./components/PolygonModal";
import { calculateDistances } from "./utils/calculateDistance";

const App = () => {
  const [drawingType, setDrawingType] = useState(null); // Drawing type: LineString/Polygon
  const [lineCoordinates, setLineCoordinates] = useState([]); // LineString waypoints
  const [polygonCoordinates, setPolygonCoordinates] = useState([]); // Polygon waypoints
  const [modalType, setModalType] = useState(""); // Active modal: LineString/Polygon
  const [insertIndex, setInsertIndex] = useState(null); // Index for polygon insertion

  const handleDrawEnd = (coordinates, type) => {
    if (type === "LineString") {
      setLineCoordinates(coordinates);
      setModalType("LineString");
    } else if (type === "Polygon") {
      setPolygonCoordinates(coordinates);
      setModalType("Polygon");
    }
  };

  const handleInsertPolygon = (action, index) => {
    setDrawingType("Polygon");
    setInsertIndex(index);
  };

  const handleImportPoints = () => {
    if (insertIndex !== null) {
      const updatedCoordinates = [...lineCoordinates];
      const polygonStart = polygonCoordinates[0]; // Connect the starting point
      updatedCoordinates.splice(insertIndex, 0, polygonStart);
      setLineCoordinates(updatedCoordinates);
      setModalType("LineString");
    }
  };

  const distances = calculateDistances(lineCoordinates);

  return (
    <div>
      <button onClick={() => setDrawingType("LineString")}>Draw LineString</button>
      <MapComponent drawingType={drawingType} onDrawEnd={handleDrawEnd} />
      {modalType === "LineString" && (
        <LineStringModal
          coordinates={lineCoordinates}
          distances={distances}
          onInsertPolygon={handleInsertPolygon}
          onClose={() => setModalType("")}
        />
      )}
      {modalType === "Polygon" && (
        <PolygonModal
          coordinates={polygonCoordinates}
          onImportPoints={handleImportPoints}
          onClose={() => setModalType("")}
        />
      )}
    </div>
  );
};

export default App;
