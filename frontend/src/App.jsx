import { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SymptomChecker from './pages/SymptomChecker';
import MonitoringPage from './pages/MonitoringPage';
import ClinicalReviewPage from './pages/ClinicalReviewPage';
import TriageSystem from './pages/TriagePage';
import EmergencyCareFinder from './pages/EmergencyCarePage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'symptom-checker':
        return <SymptomChecker setCurrentPage={setCurrentPage} />;
      case 'triage':
        return <TriageSystem setCurrentPage={setCurrentPage} />;
      case 'monitoring':
        return <MonitoringPage setCurrentPage={setCurrentPage} />;
      case 'clinical-review':
        return <ClinicalReviewPage setCurrentPage={setCurrentPage} />;
      case 'emergency-support':
        return <EmergencyCareFinder setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderCurrentPage()}
      {currentPage === 'home' && <Footer />}
    </div>
  );
};

export default App;