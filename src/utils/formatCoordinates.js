export const formatCoordinates = (coordinates) => {
    return coordinates.map(([lon, lat]) => {
      return `${lon.toFixed(6)}, ${lat.toFixed(6)}`;
    });
  };
  