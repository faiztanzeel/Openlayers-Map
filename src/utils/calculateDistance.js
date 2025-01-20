import { getDistance } from "ol/sphere";

export const calculateDistances = (coordinates) => {
  if (coordinates.length <= 1) {
    return [];
  }

  const distances = [];
  for (let i = 1; i < coordinates.length; i++) {
    distances.push(getDistance(coordinates[i - 1], coordinates[i]));
  }
  return distances;
};