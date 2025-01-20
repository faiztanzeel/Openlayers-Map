import { useEffect, useState } from "react";
import { Draw } from "ol/interaction";

const useMapInteraction = (map, source, interactionType, onInteractionEnd, onWaypointAdded) => {
  const [currentWaypoints, setCurrentWaypoints] = useState([]);

  useEffect(() => {
    if (!map || !interactionType) return;

    const drawInteraction = new Draw({
      source,
      type: interactionType, // Drawing type: "LineString" or "Polygon"
    });

    // Handle the end of the drawing interaction
    drawInteraction.on("drawend", (event) => {
      const coordinates = event.feature.getGeometry().getCoordinates();
      onInteractionEnd(coordinates, interactionType);
      setCurrentWaypoints([]); // Clear current waypoints after drawing is complete
    });

    // Handle drawing events to capture intermediate waypoints
    drawInteraction.on('drawstart', (evt) => { 
      const sketch = evt.feature; 

      sketch.getGeometry().on('change', (event) => {
        const coordinates = event.target.getCoordinates();
        setCurrentWaypoints(coordinates); 
        onWaypointAdded(coordinates); 
      });
    });

    // Add the interaction to the map
    map.addInteraction(drawInteraction);

    //  Add "Enter" key support to finish drawing (optional)
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        drawInteraction.finishDrawing();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup interaction and event listeners when interactionType or map changes
    return () => {
      map.removeInteraction(drawInteraction);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [map, source, interactionType, onInteractionEnd]);

  return currentWaypoints; 
};

export default useMapInteraction;