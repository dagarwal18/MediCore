import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  Star, 
  Loader, 
  AlertTriangle, 
  Stethoscope,
  Car,
  Route,
  ChevronRight,
  Heart
} from 'lucide-react';

const EmergencyCareFinder = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Initialize Leaflet Map
  useEffect(() => {
    const initializeMap = () => {
      // Load Leaflet CSS
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
        document.head.appendChild(link);
      }

      // Load Leaflet JS
      if (!window.L) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
        script.onload = () => {
          createMap();
        };
        document.head.appendChild(script);
      } else {
        createMap();
      }
    };

    const createMap = () => {
      if (mapRef.current && window.L && !mapInstanceRef.current) {
        // Initialize map centered on Pune
        mapInstanceRef.current = window.L.map(mapRef.current).setView([18.5204, 73.8567], 13);

        // Add OpenStreetMap tiles
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(mapInstanceRef.current);
      }
    };

    initializeMap();
  }, []);

  // Get user's current location
  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);
    console.log('🔍 Starting location request...');

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      const errorMsg = "Geolocation is not supported by this browser.";
      console.error('❌ Geolocation not supported');
      setError(errorMsg);
      setLoading(false);
      return;
    }

    console.log('✅ Geolocation API is available');
    console.log('📍 Requesting current position...');

    // Check permissions first (if available)
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        console.log('🔐 Geolocation permission status:', result.state);
        if (result.state === 'denied') {
          console.warn('⚠️ Geolocation permission denied');
        }
      }).catch(e => console.log('ℹ️ Permission query not available:', e.message));
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 15000, // Increased timeout
      maximumAge: 60000 // Reduced cache age
    };

    console.log('⚙️ Geolocation options:', options);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('✅ Successfully got location!');
        console.log('📊 Position details:', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp).toLocaleString()
        });

        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        setUserLocation(location);
        setError(null); // Clear any previous errors
        updateMapLocation(location);
        findNearbyHospitals(location);
      },
      (error) => {
        console.error('❌ Geolocation error occurred:');
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        let errorMessage = "Unable to retrieve your location. ";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Location access was denied. Please enable location permissions and try again.";
            console.error('🚫 User denied the request for Geolocation');
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable. Please check your connection.";
            console.error('📡 Location information is unavailable');
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out. Please try again.";
            console.error('⏰ The request to get user location timed out');
            break;
          default:
            errorMessage += "An unknown error occurred while retrieving location.";
            console.error('❓ An unknown error occurred');
            break;
        }
        
        setError(errorMessage);
        
        // Fallback to Pune location
        console.log('🏥 Using fallback location (Pune)');
        const fallbackLocation = { lat: 18.5204, lng: 73.8567 };
        setUserLocation(fallbackLocation);
        updateMapLocation(fallbackLocation);
        findNearbyHospitals(fallbackLocation);
      },
      options
    );
  };

  // Update map location and add user marker
  const updateMapLocation = (location) => {
    if (mapInstanceRef.current && window.L) {
      mapInstanceRef.current.setView([location.lat, location.lng], 14);
      
      // Clear existing markers
      markersRef.current.forEach(marker => mapInstanceRef.current.removeLayer(marker));
      markersRef.current = [];
      
      // Add user location marker
      const userMarker = window.L.marker([location.lat, location.lng])
        .addTo(mapInstanceRef.current)
        .bindPopup('Your Location')
        .openPopup();
      
      markersRef.current.push(userMarker);
    }
  };

  // Find nearby hospitals using Overpass API (OpenStreetMap data)
  const findNearbyHospitals = async (location) => {
    console.log('🏥 Starting hospital search for location:', location);
    
    try {
      // Overpass API query for hospitals within 10km
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:10000,${location.lat},${location.lng});
          way["amenity"="hospital"](around:10000,${location.lat},${location.lng});
          relation["amenity"="hospital"](around:10000,${location.lat},${location.lng});
        );
        out center;
      `;

      console.log('📡 Sending request to Overpass API...');
      
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: overpassQuery
      });

      console.log('📥 Overpass API response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📊 Overpass API returned:', data.elements?.length || 0, 'hospitals');
      
      if (data.elements && data.elements.length > 0) {
        console.log('✅ Processing hospital data...');
        const hospitalData = data.elements
          .filter(element => element.lat && element.lon) // Ensure coordinates exist
          .map(element => {
            const lat = element.lat || element.center?.lat;
            const lon = element.lon || element.center?.lon;
            const distance = calculateDistance(location, { lat, lng: lon });
            
            return {
              id: element.id.toString(),
              name: element.tags?.name || 'Hospital',
              address: formatAddress(element.tags),
              distance: distance,
              rating: 4.0 + Math.random() * 1, // Mock rating
              phone: element.tags?.phone || 'Contact for phone',
              isOpen: true, // Assume hospitals are open 24/7
              estimatedTime: `${Math.ceil(parseFloat(distance) * 2)} mins`,
              emergencyServices: getEmergencyServices(element.tags),
              lat: lat,
              lng: lon
            };
          })
          .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
          .slice(0, 10); // Limit to 10 closest hospitals

        console.log('🏥 Found', hospitalData.length, 'valid hospitals');
        setHospitals(hospitalData);
        addHospitalMarkers(hospitalData);
      } else {
        // Fallback to mock data if no hospitals found
        console.log('⚠️ No hospitals found in OSM data, using mock data');
        setMockHospitals(location);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('❌ Error fetching hospitals:', error);
      console.log('🔄 Falling back to mock hospital data');
      setMockHospitals(location);
      setLoading(false);
    }
  };

  // Set mock hospital data as fallback
  const setMockHospitals = (location) => {
    const mockHospitals = [
      {
        id: '1',
        name: 'City Emergency Hospital',
        address: '123 Healthcare Ave, Medical District',
        distance: '0.8',
        rating: 4.5,
        phone: '+91 20 1234 5678',
        isOpen: true,
        emergencyServices: ['Emergency Room', 'Trauma Center', 'ICU'],
        estimatedTime: '3 mins',
        lat: location.lat + 0.01,
        lng: location.lng + 0.01
      },
      {
        id: '2',
        name: 'Metro General Hospital',
        address: '456 Medical Plaza, Downtown',
        distance: '1.2',
        rating: 4.3,
        phone: '+91 20 2345 6789',
        isOpen: true,
        emergencyServices: ['Emergency Room', 'Cardiac Care', 'Pediatric Emergency'],
        estimatedTime: '5 mins',
        lat: location.lat - 0.01,
        lng: location.lng + 0.015
      },
      {
        id: '3',
        name: 'Regional Medical Center',
        address: '789 Health Street, Central Area',
        distance: '2.1',
        rating: 4.7,
        phone: '+91 20 3456 7890',
        isOpen: true,
        emergencyServices: ['Level 1 Trauma', 'Stroke Center', 'Emergency Surgery'],
        estimatedTime: '8 mins',
        lat: location.lat + 0.015,
        lng: location.lng - 0.01
      }
    ];
    setHospitals(mockHospitals);
    addHospitalMarkers(mockHospitals);
  };

  // Add hospital markers to map
  const addHospitalMarkers = (hospitalData) => {
    if (mapInstanceRef.current && window.L) {
      // Remove existing hospital markers (keep user marker)
      markersRef.current.slice(1).forEach(marker => mapInstanceRef.current.removeLayer(marker));
      markersRef.current = markersRef.current.slice(0, 1);

      // Add hospital markers
      hospitalData.forEach((hospital, index) => {
        const hospitalIcon = window.L.divIcon({
          html: `<div style="background-color: #dc2626; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">H</div>`,
          className: 'custom-hospital-marker',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        const marker = window.L.marker([hospital.lat, hospital.lng], { icon: hospitalIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div style="min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">${hospital.name}</h3>
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${hospital.address}</p>
              <p style="margin: 0 0 8px 0; font-size: 12px;"><strong>Distance:</strong> ${hospital.distance} km</p>
              <button onclick="window.open('https://www.openstreetmap.org/directions?from=${userLocation?.lat},${userLocation?.lng}&to=${hospital.lat},${hospital.lng}', '_blank')" 
                      style="background: #2563eb; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 12px; cursor: pointer;">
                Get Directions
              </button>
            </div>
          `);
        
        markersRef.current.push(marker);
      });
    }
  };

  // Format address from OSM tags
  const formatAddress = (tags) => {
    if (!tags) return 'Address not available';
    
    const parts = [];
    if (tags['addr:housenumber']) parts.push(tags['addr:housenumber']);
    if (tags['addr:street']) parts.push(tags['addr:street']);
    if (tags['addr:city']) parts.push(tags['addr:city']);
    
    return parts.length > 0 ? parts.join(', ') : 'Address not available';
  };

  // Get emergency services based on hospital tags
  const getEmergencyServices = (tags) => {
    const services = ['Emergency Room'];
    
    if (tags?.emergency === 'yes') services.push('Emergency Services');
    if (tags?.['healthcare:speciality']) {
      const specialties = tags['healthcare:speciality'].split(';');
      specialties.forEach(specialty => {
        if (specialty.includes('trauma')) services.push('Trauma Center');
        if (specialty.includes('cardiac')) services.push('Cardiac Care');
        if (specialty.includes('pediatric')) services.push('Pediatric Care');
      });
    }
    
    return services;
  };

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (pos1, pos2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = (pos2.lat - pos1.lat) * Math.PI / 180;
    const dLon = (pos2.lng - pos1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(pos1.lat * Math.PI / 180) * Math.cos(pos2.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance.toFixed(1);
  };

  // Get directions using OpenStreetMap
  const getDirections = (hospital) => {
    if (userLocation) {
      const url = `https://www.openstreetmap.org/directions?from=${userLocation.lat},${userLocation.lng}&to=${hospital.lat},${hospital.lng}`;
      window.open(url, '_blank');
    }
  };

  // Call hospital
  const callHospital = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50/60 to-pink-50/40">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-red-100/60 sticky top-0 z-[1000]">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl flex items-center justify-center mr-4">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Emergency Care Finder</h1>
                <p className="text-sm text-slate-600">Find immediate medical help near you</p>
              </div>
            </div>
            
            <button
              onClick={getCurrentLocation}
              disabled={loading}
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-6 py-3 rounded-xl flex items-center font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? (
                <Loader className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Navigation className="w-5 h-5 mr-2" />
              )}
              Find Nearby Care
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Emergency Notice */}
        <div className="bg-red-100 border border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Life-Threatening Emergency?</h3>
              <p className="text-red-700 mb-4">If you're experiencing chest pain, difficulty breathing, severe bleeding, or loss of consciousness, call emergency services immediately.</p>
              <button 
                onClick={() => window.location.href = 'tel:112'}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center font-medium transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call 112 Now
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative z-10">
            <div className="h-96 bg-slate-100 relative overflow-hidden">
              <div ref={mapRef} className="w-full h-full relative z-0" />
              {!window.L && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">Map loading...</p>
                  </div>
                </div>
              )}
              
              
            </div>
          </div>

          {/* Hospital List */}
          <div className="space-y-4 relative z-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Nearby Emergency Care</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-700 font-medium mb-2">Location Error</p>
                    <p className="text-red-600 text-sm mb-3">{error}</p>
                    <div className="space-y-2 text-xs text-red-600">
                      <p><strong>Troubleshooting tips:</strong></p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Check if location services are enabled in your browser</li>
                        <li>Make sure you're using HTTPS (not HTTP)</li>
                        <li>Try refreshing the page and clicking "Allow" when prompted</li>
                        <li>Check your browser's location settings</li>
                      </ul>
                    </div>
                    <button 
                      onClick={getCurrentLocation}
                      className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            )}

            {!loading && hospitals.length > 0 && (
              <div className="space-y-4 max-h-96 overflow-y-auto relative z-0">
                {hospitals.map((hospital) => (
                  <div
                    key={hospital.id}
                    className="bg-white rounded-xl p-6 border border-slate-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedHospital(hospital)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-800 mb-1">{hospital.name}</h3>
                        <p className="text-slate-600 text-sm mb-2">{hospital.address}</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center text-slate-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            {hospital.distance} km
                          </div>
                          <div className="flex items-center text-slate-600">
                            <Car className="w-4 h-4 mr-1" />
                            {hospital.estimatedTime}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="text-slate-700">{hospital.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          hospital.isOpen 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          <Clock className="w-3 h-3 inline mr-1" />
                          {hospital.isOpen ? 'Open 24/7' : 'Closed'}
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hospital.emergencyServices.map((service, index) => (
                        <span
                          key={index}
                          className="bg-red-50 text-red-700 px-2 py-1 rounded-lg text-xs"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          getDirections(hospital);
                        }}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300"
                      >
                        <Route className="w-4 h-4 mr-2" />
                        Directions
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          callHospital(hospital.phone);
                        }}
                        className="flex-1 border-2 border-red-200 hover:bg-red-50 hover:border-red-300 text-red-700 px-4 py-2 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && hospitals.length === 0 && !error && (
              <div className="bg-white rounded-xl p-8 text-center">
                <Heart className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-4">Click "Find Nearby Care" to locate emergency facilities near you.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Emergency Numbers */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-red-100/40 relative z-10">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">Emergency Contact Numbers</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button 
              onClick={() => window.location.href = 'tel:112'}
              className="flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-700 px-4 py-3 rounded-xl transition-all duration-300"
            >
              <Phone className="w-4 h-4 mr-2" />
              <div className="text-left">
                <div className="font-medium">Emergency Services</div>
                <div className="text-sm">112</div>
              </div>
            </button>
            <button 
              onClick={() => window.location.href = 'tel:108'}
              className="flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-xl transition-all duration-300"
            >
              <Phone className="w-4 h-4 mr-2" />
              <div className="text-left">
                <div className="font-medium">Ambulance</div>
                <div className="text-sm">108</div>
              </div>
            </button>
            <button 
              onClick={() => window.location.href = 'tel:1075'}
              className="flex items-center justify-center bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-xl transition-all duration-300"
            >
              <Phone className="w-4 h-4 mr-2" />
              <div className="text-left">
                <div className="font-medium">Helpline</div>
                <div className="text-sm">1075</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="fixed top-16 left-16 w-72 h-72 bg-gradient-to-r from-red-400/10 to-rose-400/10 rounded-full blur-3xl animate-pulse pointer-events-none -z-10"></div>
      <div className="fixed bottom-16 right-16 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-red-400/10 rounded-full blur-3xl animate-pulse pointer-events-none -z-10"></div>
    </div>
  );
};

export default EmergencyCareFinder;