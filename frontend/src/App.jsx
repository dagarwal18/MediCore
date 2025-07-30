import { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SymptomChecker from './pages/SymptomChecker';
import MonitoringPage from './pages/MonitoringPage';
import ClinicalReviewPage from './pages/ClinicalReviewPage';
import TriageSystem from './pages/TriagePage';
import EmergencyCareFinder from './pages/EmergencyCarePage';
import LoginRegister from './pages/AuthPage';

const App = () => {
  // Initialize currentPage based on whether JWT token exists in localStorage
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem('token') ? 'home' : 'auth'
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'auth':
        return <LoginRegister setCurrentPage={setCurrentPage} />;
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
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
        return <LoginRegister setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 overflow-y-auto">
        {renderCurrentPage()}
        {currentPage === 'home' && <Footer />}
      </div>
    </div>
  );
};

export default App;
