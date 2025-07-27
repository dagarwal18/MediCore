import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import ComplianceSection from '../components/ComplianceSection';
import FeaturesSection from '../components/FeaturesSection';
import EmergencySection from '../components/EmergencySection';

const HomePage = ({ setCurrentPage }) => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <HeroSection setCurrentPage={setCurrentPage} />
      <FeaturesSection 
        setCurrentPage={setCurrentPage}
        hoveredFeature={hoveredFeature}
        setHoveredFeature={setHoveredFeature}
      />
      <ComplianceSection />
      <EmergencySection setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default HomePage;