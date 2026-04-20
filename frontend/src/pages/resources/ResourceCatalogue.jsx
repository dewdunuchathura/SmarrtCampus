import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const ResourceCatalogue = () => {
  // Styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem',
      padding: '2rem',
      background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
      color: 'white',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      margin: '0 0 0.5rem 0',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    section: {
      background: 'white',
      borderRadius: '15px',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: '#2d3748',
      borderBottom: '3px solid #A78BFA',
      paddingBottom: '0.5rem'
    },
    filterSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      alignItems: 'end',
      marginBottom: '2rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#4a5568',
      fontSize: '0.9rem'
    },
    input: {
      padding: '0.75rem',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#A78BFA',
      boxShadow: '0 0 0 3px rgba(167, 139, 250, 0.1)',
      transform: 'translateY(-1px)'
    },
    button: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(167, 139, 250, 0.3)'
    },
    primaryButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(167, 139, 250, 0.4)'
    },
    secondaryButton: {
      background: '#f7fafc',
      color: '#4a5568',
      border: '2px solid #e2e8f0'
    },
    secondaryButtonHover: {
      background: '#edf2f7',
      borderColor: '#cbd5e0'
    },
    resourceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '1.5rem'
    },
    resourceCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '1.5rem',
      boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    resourceCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      borderColor: '#A78BFA'
    },
    resourceHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      marginBottom: '1rem'
    },
    resourceTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#2d3748',
      margin: '0'
    },
    resourceDetails: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    resourceDetail: {
      fontSize: '0.9rem',
      color: '#4a5568'
    },
    statusActive: {
      color: '#7C3AED',
      fontWeight: 'bold',
      background: '#EDE9FE',
      padding: '0.25rem 0.5rem',
      borderRadius: '20px',
      fontSize: '0.8rem'
    },
    statusOutOfService: {
      color: '#e53e3e',
      fontWeight: 'bold',
      background: '#fed7d7',
      padding: '0.25rem 0.5rem',
      borderRadius: '20px',
      fontSize: '0.8rem'
    },
    loading: {
      textAlign: 'center',
      padding: '3rem',
      fontSize: '1.2rem',
      color: '#4a5568'
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem',
      color: '#718096',
      fontSize: '1.1rem'
    },
      };
  
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterCapacity, setFilterCapacity] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  // Dropdown options
  const [types] = useState(['Lecture Hall', 'Lab', 'Meeting Room', 'Equipment']);
  const [capacities] = useState(['None', 10, 50, 100, 200]);
  const [locations] = useState(['Engineering Building', 'Business Management Building', 'New Building', 'Main Building']);
  const [statuses] = useState(['Active', 'Out Of Service']);

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm || filterType || filterCapacity || filterLocation || filterStatus) {
        handleSearch();
      } else {
        fetchResources();
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, filterType, filterCapacity, filterLocation, filterStatus]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await api.get('/resources');
      setResources(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to fetch resources');
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('searchTerm', searchTerm);
      if (filterType) params.append('type', filterType);
      if (filterCapacity) params.append('capacity', filterCapacity);
      if (filterLocation) params.append('location', filterLocation);
      if (filterStatus) params.append('status', filterStatus);
      
      const response = await api.get(`/resources/search?${params}`);
      setResources(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error searching resources:', error);
      toast.error('Failed to search resources');
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('');
    setFilterCapacity('');
    setFilterLocation('');
    setFilterStatus('');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Resource Catalogue</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Browse and search available campus resources</p>
      </div>
      
      {/* Search and Filter */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Search Resources</h2>
        <div style={styles.filterSection}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Search</label>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Capacity</label>
            <select
              value={filterCapacity}
              onChange={(e) => setFilterCapacity(e.target.value)}
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
            >
              <option value="">All Capacities</option>
              {capacities.map(capacity => (
                <option key={capacity} value={capacity}>{capacity === 'None' ? 'None' : `${capacity} persons`}</option>
              ))}
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Location</label>
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <button 
              type="button" 
              onClick={clearFilters}
              style={{...styles.button, ...styles.secondaryButton}}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.secondaryButtonHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.secondaryButton)}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Resources List */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Available Resources ({resources.length})</h2>
        {loading ? (
          <div style={styles.loading}>
            <div>Loading resources...</div>
          </div>
        ) : resources.length === 0 ? (
          <div style={styles.emptyState}>
            <div>No resources found</div>
          </div>
        ) : (
          <div style={styles.resourceGrid}>
            {resources.map(resource => (
              <div 
                key={resource.id} 
                style={styles.resourceCard}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.resourceCardHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.resourceCard)}
              >
                <div style={styles.resourceHeader}>
                  <h3 style={styles.resourceTitle}>{resource.name}</h3>
                  <span style={resource.status === 'Active' ? styles.statusActive : styles.statusOutOfService}>
                    {resource.status}
                  </span>
                </div>
                <div style={styles.resourceDetails}>
                  <div style={styles.resourceDetail}>
                    <strong>Type:</strong> {resource.type}
                  </div>
                  <div style={styles.resourceDetail}>
                    <strong>Capacity:</strong> {resource.capacity === null ? 'None' : `${resource.capacity} persons`}
                  </div>
                  <div style={styles.resourceDetail}>
                    <strong>Location:</strong> {resource.location}
                  </div>
                  <div style={styles.resourceDetail}>
                    <strong>Status:</strong> {resource.status}
                  </div>
                </div>
                {resource.description && (
                  <div style={{...styles.resourceDetail, marginBottom: '1rem'}}>
                    <strong>Description:</strong> {resource.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

          </div>
  );
};

export default ResourceCatalogue;
