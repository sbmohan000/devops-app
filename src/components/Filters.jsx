import { Search, Filter, Navigation } from 'lucide-react';

const Filters = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter, 
  typeFilter, 
  setTypeFilter,
  onLocateMe,
  isLocating 
}) => {
  return (
    <div className="filters-section">
      <h5 className="mb-4 d-flex align-items-center gap-2 text-dark">
        <Filter size={24} className="text-primary" />
        Find Your Vehicles
      </h5>
      
      <div className="filter-row">
        {/* Search Box */}
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="form-control"
            placeholder="Search by vehicle name, license plate, or driver..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Status Filter */}
        <div>
          <label className="form-label small text-muted mb-2 fw-bold">STATUS</label>
          <select 
            className="form-select filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="on-trip">On Trip</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        
        {/* Type Filter */}
        <div>
          <label className="form-label small text-muted mb-2 fw-bold">VEHICLE TYPE</label>
          <select 
            className="form-select filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
            <option value="Electric">Electric</option>
            <option value="Hatchback">Hatchback</option>
          </select>
        </div>
        
        {/* Locate Me Button */}
        <div>
          <label className="form-label small text-muted mb-2 fw-bold">LOCATION</label>
          <button 
            className="btn location-btn w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={onLocateMe}
            disabled={isLocating}
          >
            {isLocating ? (
              <>
                <div className="loading-spinner"></div>
                Locating...
              </>
            ) : (
              <>
                <Navigation size={18} />
                Locate Me
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;