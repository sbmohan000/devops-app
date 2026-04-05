import { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Toast } from 'react-bootstrap';
import { vehiclesData } from './data/vehicles';
import Filters from './components/Filters';
import VehicleMap from './components/VehicleMap';
import VehicleList from './components/VehicleList';
import VehicleDetailsModal from './components/VehicleDetailsModal';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Filter vehicles based on search and filters
  const filteredVehicles = useMemo(() => {
    return vehiclesData.filter(vehicle => {
      const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
      const matchesType = typeFilter === 'all' || vehicle.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  // Get user's current location
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      showToastMessage('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setIsLocating(false);
        showToastMessage('📍 Your location has been detected!');
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLocating(false);
        showToastMessage('❌ Unable to get your location. Please check permissions.');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleViewDetails = (vehicle) => {
    setSelectedVehicleDetails(vehicle);
    setShowDetailsModal(true);
  };

  // Auto-select first vehicle if none selected
  useEffect(() => {
    if (filteredVehicles.length > 0 && !selectedVehicle) {
      setSelectedVehicle(filteredVehicles[0]);
    }
  }, [filteredVehicles, selectedVehicle]);

  return (
    <div className="vehicle-tracker">
      {/* Header */}
      <div className="app-header">
        <Container>
          <div className="text-center">
            <h1 className="h2 mb-2">🚗 Smart Vehicle Tracker</h1>
            <p className="mb-0 opacity-90">Real-time fleet management at your fingertips</p>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container fluid className="py-4 px-5">
        {/* Filters */}
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          onLocateMe={handleLocateMe}
          isLocating={isLocating}
        />

        {/* Map and Vehicle List */}
        <Row>
          <Col lg={8} className="mb-4 mb-lg-0">
            <VehicleMap
              vehicles={filteredVehicles}
              selectedVehicle={selectedVehicle}
              onVehicleSelect={handleVehicleSelect}
              userLocation={userLocation}
            />
          </Col>
          <Col lg={4}>
            <VehicleList
              vehicles={filteredVehicles}
              selectedVehicle={selectedVehicle}
              onVehicleSelect={handleVehicleSelect}
              onViewDetails={handleViewDetails}
            />
          </Col>
        </Row>

        {/* Statistics */}
        <Row className="mt-4">
          <Col md={4} className="mb-3">
            <div className="card stats-card stats-available">
              <div className="card-body">
                <h3>{vehiclesData.filter(v => v.status === 'available').length}</h3>
                <p className="mb-0">✅ Available Now</p>
              </div>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="card stats-card stats-on-trip">
              <div className="card-body">
                <h3>{vehiclesData.filter(v => v.status === 'on-trip').length}</h3>
                <p className="mb-0">🚀 On Active Trip</p>
              </div>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="card stats-card stats-maintenance">
              <div className="card-body">
                <h3>{vehiclesData.filter(v => v.status === 'maintenance').length}</h3>
                <p className="mb-0">🔧 In Maintenance</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Vehicle Details Modal */}
      <VehicleDetailsModal
        vehicle={selectedVehicleDetails}
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
      />

      {/* Toast Notification */}
      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          background: 'var(--gradient-primary)',
          color: 'white',
          border: 'none'
        }}
        delay={4000}
        autohide
      >
        <Toast.Body className="d-flex align-items-center gap-2">
          {toastMessage}
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default App;