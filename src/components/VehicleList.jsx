import { MapPin, Fuel, Gauge, Eye, Navigation, Clock } from 'lucide-react';
import { getFormattedDistance, calculateTravelTime, getPreciseDistance } from '../utils/distanceCalculator';

const VehicleList = ({ vehicles, selectedVehicle, onVehicleSelect, onViewDetails, userLocation }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'available': return 'status-available';
      case 'on-trip': return 'status-on-trip';
      case 'maintenance': return 'status-maintenance';
      default: return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Available';
      case 'on-trip': return 'On Trip';
      case 'maintenance': return 'Maintenance';
      default: return status;
    }
  };

  const getDistanceInfo = (vehicleLocation) => {
    if (!userLocation) return null;
    
    const distance = getPreciseDistance(
      userLocation.lat,
      userLocation.lng,
      vehicleLocation.lat,
      vehicleLocation.lng
    );
    
    const distanceText = getFormattedDistance(
      userLocation.lat,
      userLocation.lng,
      vehicleLocation.lat,
      vehicleLocation.lng
    );
    
    const travelTime = calculateTravelTime(distance);

    return { distanceText, travelTime };
  };

  return (
    <div className="vehicle-list p-3">
      <div className="vehicle-list-header">
        <h5 className="mb-1">🚗 Vehicles in Visakhapatnam</h5>
        <small className="opacity-90">
          {userLocation ? 'Showing vehicles near you' : 'Click "Locate Me" to find nearby vehicles'}
        </small>
      </div>
      
      {vehicles.length === 0 ? (
        <div className="text-center py-5">
          <div className="text-muted">No vehicles found matching your criteria</div>
          {userLocation && (
            <small className="text-muted mt-2">Try increasing the distance filter</small>
          )}
        </div>
      ) : (
        vehicles.map(vehicle => {
          const distanceInfo = getDistanceInfo(vehicle.location);
          
          return (
            <div
              key={vehicle.id}
              className={`vehicle-card p-3 ${selectedVehicle?.id === vehicle.id ? 'selected' : ''} ${vehicle.status}`}
              onClick={() => onVehicleSelect(vehicle)}
            >
              <div className="d-flex align-items-start gap-3">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="vehicle-image"
                />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="mb-0 fw-bold text-dark">{vehicle.name}</h6>
                    <span className={`status-badge ${getStatusClass(vehicle.status)}`}>
                      {getStatusText(vehicle.status)}
                    </span>
                  </div>
                  
                  <div className="text-muted small mb-2">
                    📍 {vehicle.licensePlate} • 🚙 {vehicle.type}
                  </div>

                  {/* Distance and Travel Time Information */}
                  {distanceInfo && (
                    <div className="distance-info mb-2">
                      <div className="d-flex align-items-center gap-2 text-primary small">
                        <Navigation size={12} />
                        <span className="fw-bold">{distanceInfo.distanceText}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 text-warning small">
                        <Clock size={12} />
                        <span>~{distanceInfo.travelTime}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-3 text-muted small">
                      <div className="d-flex align-items-center gap-1">
                        <Fuel size={14} />
                        <span>{vehicle.fuelLevel}%</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <Gauge size={14} />
                        <span>{vehicle.speed} km/h</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <MapPin size={14} />
                        <span>{vehicle.driver.split(' ')[0]}</span>
                      </div>
                    </div>
                    
                    <button 
                      className="btn details-btn d-flex align-items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails(vehicle);
                      }}
                    >
                      <Eye size={14} />
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default VehicleList;