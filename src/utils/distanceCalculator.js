// Calculate distance between two coordinates in kilometers using Haversine formula
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
};

// Calculate distance and return formatted string
export const getFormattedDistance = (lat1, lon1, lat2, lon2) => {
  const distanceKm = calculateDistance(lat1, lon1, lat2, lon2);
  
  if (distanceKm < 1) {
    // Show in meters if less than 1 km
    const distanceM = Math.round(distanceKm * 1000);
    return `${distanceM} m away`;
  } else if (distanceKm < 10) {
    // Show 1 decimal for short distances
    return `${distanceKm.toFixed(1)} km away`;
  } else {
    // Show integer for longer distances
    return `${Math.round(distanceKm)} km away`;
  }
};

// Get distance with precise value for calculations
export const getPreciseDistance = (lat1, lon1, lat2, lon2) => {
  return calculateDistance(lat1, lon1, lat2, lon2);
};

// Calculate estimated travel time in minutes
export const calculateTravelTime = (distanceKm, averageSpeedKmh = 30) => {
  // If distanceKm is a string, extract the number
  let distanceValue = distanceKm;
  if (typeof distanceKm === 'string') {
    // Extract number from string like "5.2 km away"
    const match = distanceKm.match(/(\d+\.?\d*)/);
    distanceValue = match ? parseFloat(match[1]) : 0;
  }
  
  const timeHours = distanceValue / averageSpeedKmh;
  const timeMinutes = Math.round(timeHours * 60);
  
  if (timeMinutes < 1) {
    return 'Less than 1 min';
  } else if (timeMinutes < 60) {
    return `${timeMinutes} mins`;
  } else {
    const hours = Math.floor(timeMinutes / 60);
    const minutes = timeMinutes % 60;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
};

// Filter vehicles within a certain radius (in km)
export const filterVehiclesByDistance = (vehicles, userLocation, maxDistanceKm = 10) => {
  if (!userLocation) return vehicles;
  
  return vehicles.filter(vehicle => {
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      vehicle.location.lat,
      vehicle.location.lng
    );
    return distance <= maxDistanceKm;
  });
};

// Sort vehicles by distance from user location
export const sortVehiclesByDistance = (vehicles, userLocation) => {
  if (!userLocation) return vehicles;
  
  return [...vehicles].sort((a, b) => {
    const distA = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      a.location.lat,
      a.location.lng
    );
    const distB = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      b.location.lat,
      b.location.lng
    );
    return distA - distB;
  });
};