import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM } from "ol/source";
import { Vector as VectorSource } from "ol/source";
import PropTypes from "prop-types";
import useMapInteraction from "../hooks/useMapInteraction";
import MissionBox from "./MissionBox";
import LineStringModal from "./LineStringModal";
import { calculateDistances } from '../utils/calculateDistance'; 

const MapComponent = ({ drawingType, onDrawEnd }) => {
  const mapRef = useRef(); 
  const sourceRef = useRef(new VectorSource());
  const mapInstanceRef = useRef(null);

  const [showMissionBox, setShowMissionBox] = useState(true);
  const [waypoints, setWaypoints] = useState([]); 
  const [distances, setDistances] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWaypointIndex, setSelectedWaypointIndex] = useState(null);

  useEffect(() => {
    const mapInstance = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: sourceRef.current,
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    mapInstanceRef.current = mapInstance; 
    return () => mapInstance.setTarget(null); 
  }, []);

  const [currentWaypoints, setCurrentWaypoints] = useMapInteraction(
    mapInstanceRef.current,
    sourceRef.current,
    drawingType,
    onDrawEnd,
    (newWaypoints) => {
      setWaypoints(newWaypoints); 
    }
  );

  useEffect(() => {
    setDistances(calculateDistances(waypoints)); 
  }, [waypoints]);

  const handleCloseMissionBox = () => {
    setShowMissionBox(false);
  };

  const handleOpenModal = (index) => {
    setSelectedWaypointIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {showMissionBox && (
        <MissionBox 
          onClose={handleCloseMissionBox} 
          waypoints={waypoints} 
          distances={distances} 
        />
      )}

      {isModalOpen && (
        <LineStringModal 
          coordinates={waypoints} 
          distances={distances} 
          onClose={handleCloseModal} 
          selectedWaypointIndex={selectedWaypointIndex} 
        />
      )}

      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

MapComponent.propTypes = {
  drawingType: PropTypes.string.isRequired, 
  onDrawEnd: PropTypes.func.isRequired, 
};

export default MapComponent;