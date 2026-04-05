import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import { icon } from 'leaflet';
import { useEffect } from 'react';
import { getFormattedDistance, calculateTravelTime, getPreciseDistance } from '../utils/distanceCalculator';

// Custom icons
const createCustomIcon = (color) => icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const icons = {
  available: createCustomIcon('green'),
  'on-trip': createCustomIcon('orange'),
  maintenance: createCustomIcon('red')
};

const userIcon = createCustomIcon('blue');

// Map controller component
const MapController = ({ selectedVehicle, userLocation }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedVehicle && userLocation) {
      // Center map between user and selected vehicle
      const centerLat = (userLocation.lat + selectedVehicle.location.lat) / 2;
      const centerLng = (userLocation.lng + selectedVehicle.location.lng) / 2;
      map.setView([centerLat, centerLng], 13);
    } else if (selectedVehicle) {
      map.setView([selectedVehicle.location.lat, selectedVehicle.location.lng], 15);
    } else if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 13);
    }
  }, [selectedVehicle, userLocation, map]);
  
  return null;
};

const VehicleMap = ({ vehicles, selectedVehicle, onVehicleSelect, userLocation }) => {
  const defaultCenter = [17.6868, 83.2185]; // Visakhapatnam center

  // Calculate distance for travel time
  const getDistanceForTravelTime = (vehicle) => {
    if (!userLocation) return 0;
    return getPreciseDistance(
      userLocation.lat,
      userLocation.lng,
      vehicle.location.lat,
      vehicle.location.lng
    );
  };

  return (
    <div className="map-container">
      <MapContainer 
        center={userLocation || defaultCenter} 
        zoom={userLocation ? 13 : 12} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapController selectedVehicle={selectedVehicle} userLocation={userLocation} />
        
        {/* User Location Marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userIcon}
          >
            <Popup>
              <div className="text-center">
                <strong>📍 Your Location</strong>
                <br />
                <small>You are here in Visakhapatnam</small>
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Distance lines for selected vehicle */}
        {selectedVehicle && userLocation && (
          <Polyline
            positions={[
              [userLocation.lat, userLocation.lng],
              [selectedVehicle.location.lat, selectedVehicle.location.lng]
            ]}
            color="blue"
            weight={3}
            opacity={0.7}
            dashArray="5, 10"
          />
        )}
        
        {vehicles.map(vehicle => {
          const isSelected = selectedVehicle?.id === vehicle.id;
          const distance = userLocation ? getDistanceForTravelTime(vehicle) : 0;
          const travelTime = userLocation ? calculateTravelTime(distance) : '';
          
          return (
            <Marker
              key={vehicle.id}
              position={[vehicle.location.lat, vehicle.location.lng]}
              icon={icons[vehicle.status]}
              eventHandlers={{
                click: () => onVehicleSelect(vehicle)
              }}
            >
              <Popup>
                <div className="vehicle-popup">
                  <div className="popup-header">
                    <h6 className="mb-0">{vehicle.name}</h6>
                    <small>{vehicle.licensePlate}</small>
                  </div>
                  <div className="popup-body">
                    <div className="detail-row">
                      <span className="detail-label">Status:</span>
                      <span className="detail-value text-capitalize">{vehicle.status}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Driver:</span>
                      <span className="detail-value">{vehicle.driver}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Fuel:</span>
                      <span className="detail-value">{vehicle.fuelLevel}%</span>
                    </div>
                    
                    {/* Distance information in popup */}
                    {userLocation && (
                      <>
                        <div className="detail-row">
                          <span className="detail-label">Distance:</span>
                          <span className="detail-value text-primary">
                            {getFormattedDistance(
                              userLocation.lat,
                              userLocation.lng,
                              vehicle.location.lat,
                              vehicle.location.lng
                            )}
                          </span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Travel Time:</span>
                          <span className="detail-value text-warning">
                            ~{travelTime}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default VehicleMap;