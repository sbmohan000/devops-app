import { Modal, Button } from 'react-bootstrap';
import { X, Fuel, Gauge, MapPin, Calendar, Users, Palette, Navigation, Clock } from 'lucide-react';
import { getFormattedDistance, calculateTravelTime, getPreciseDistance } from '../utils/distanceCalculator';

// Helper functions (defined outside the component)
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
    case 'maintenance': return 'In Maintenance';
    default: return status;
  }
};

const getColorValue = (color) => {
  const colors = {
    'Silver': '#c0c0c0',
    'White': '#ffffff',
    'Blue': '#0000ff',
    'Black': '#000000',
    'Red': '#ff0000',
    'Gray': '#808080',
    'Green': '#008000',
    'Orange': '#ffa500',
    'Yellow': '#ffff00'
  };
  return colors[color] || '#666';
};

// Function to approximate location area based on coordinates
const getLocationArea = (location) => {
  const areas = [
    { lat: 17.7282, lng: 83.3015, name: 'Gajuwaka' },
    { lat: 17.7400, lng: 83.2246, name: 'Dwaraka Nagar' },
    { lat: 17.6868, lng: 83.2185, name: 'Beach Road' },
    { lat: 17.7500, lng: 83.2500, name: 'NAD Kotha Road' },
    { lat: 17.6900, lng: 83.2100, name: 'RTC Complex' },
    { lat: 17.7200, lng: 83.2900, name: 'Steel Plant' },
    { lat: 17.7000, lng: 83.2000, name: 'Old Post Office' },
    { lat: 17.6800, lng: 83.2300, name: 'Jagadamba Junction' },
    { lat: 17.7100, lng: 83.2700, name: 'Gopalapatnam' },
    { lat: 17.7300, lng: 83.2600, name: 'Pendurthi' },
    { lat: 17.6950, lng: 83.2400, name: 'Asilmetta' }
  ];

  let closestArea = areas[0];
  let minDistance = getPreciseDistance(location.lat, location.lng, areas[0].lat, areas[0].lng);

  areas.forEach(area => {
    const distance = getPreciseDistance(location.lat, location.lng, area.lat, area.lng);
    if (distance < minDistance) {
      minDistance = distance;
      closestArea = area;
    }
  });

  return minDistance < 2 ? closestArea.name : 'Visakhapatnam';
};

const VehicleDetailsModal = ({ vehicle, show, onHide, userLocation }) => {
  if (!vehicle) return null;

  const getDistanceInfo = () => {
    if (!userLocation || !vehicle) return null;
    
    const distance = getPreciseDistance(
      userLocation.lat,
      userLocation.lng,
      vehicle.location.lat,
      vehicle.location.lng
    );
    
    const distanceText = getFormattedDistance(
      userLocation.lat,
      userLocation.lng,
      vehicle.location.lat,
      vehicle.location.lng
    );
    
    const travelTime = calculateTravelTime(distance);

    return { distance, distanceText, travelTime };
  };

  const distanceInfo = getDistanceInfo();

  return (
    <Modal show={show} onHide={onHide} centered className="vehicle-modal">
      <Modal.Header>
        <div className="w-100">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <Modal.Title className="text-white">{vehicle.name}</Modal.Title>
              <p className="mb-0 text-white-50">{vehicle.licensePlate}</p>
            </div>
            <Button variant="link" onClick={onHide} className="text-white p-0">
              <X size={24} />
            </Button>
          </div>
        </div>
      </Modal.Header>
      
      <Modal.Body>
        <div className="row mb-4">
          <div className="col-6">
            <img 
              src={vehicle.image} 
              alt={vehicle.name}
              className="img-fluid rounded-3 w-100"
              style={{ height: '120px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-6">
            <div className={`status-badge ${getStatusClass(vehicle.status)} mb-3 w-100 text-center`}>
              {getStatusText(vehicle.status)}
            </div>
            <div className="text-center">
              <h4 className="text-primary mb-1">{vehicle.type}</h4>
              <small className="text-muted">Vehicle Type</small>
            </div>
          </div>
        </div>

        {/* Distance Information */}
        {distanceInfo && (
          <div className="bg-light rounded-3 p-3 mb-3">
            <div className="text-center">
              <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                <Navigation size={20} className="text-primary" />
                <h6 className="mb-0 text-primary">Distance from You</h6>
              </div>
              <div className="row text-center">
                <div className="col-6">
                  <div className="fw-bold text-dark fs-5">{distanceInfo.distanceText}</div>
                  <small className="text-muted">Straight Line</small>
                </div>
                <div className="col-6">
                  <div className="fw-bold text-warning fs-5">~{distanceInfo.travelTime}</div>
                  <small className="text-muted">Estimated Travel</small>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="detail-item">
          <span className="detail-label d-flex align-items-center gap-2">
            <MapPin size={16} />
            Driver
          </span>
          <span className="detail-value">{vehicle.driver}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label d-flex align-items-center gap-2">
            <Fuel size={16} />
            Fuel Level
          </span>
          <span className="detail-value">
            <div className="d-flex align-items-center gap-2">
              <div className="progress" style={{ width: '80px', height: '8px' }}>
                <div 
                  className={`progress-bar ${vehicle.fuelLevel > 20 ? 'bg-success' : 'bg-danger'}`}
                  style={{ width: `${vehicle.fuelLevel}%` }}
                ></div>
              </div>
              {vehicle.fuelLevel}%
            </div>
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label d-flex align-items-center gap-2">
            <Gauge size={16} />
            Current Speed
          </span>
          <span className="detail-value">{vehicle.speed} km/h</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label d-flex align-items-center gap-2">
            <Users size={16} />
            Capacity
          </span>
          <span className="detail-value">{vehicle.capacity}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label d-flex align-items-center gap-2">
            <Palette size={16} />
            Color
          </span>
          <span className="detail-value">
            <span 
              className="d-inline-block rounded-circle me-2"
              style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: getColorValue(vehicle.color) 
              }}
            ></span>
            {vehicle.color}
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label d-flex align-items-center gap-2">
            <Calendar size={16} />
            Last Maintenance
          </span>
          <span className="detail-value">{vehicle.lastMaintenance}</span>
        </div>

        {/* Vehicle Location */}
        <div className="detail-item">
          <span className="detail-label d-flex align-items-center gap-2">
            <MapPin size={16} />
            Current Location
          </span>
          <span className="detail-value small">
            {getLocationArea(vehicle.location)}
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VehicleDetailsModal;