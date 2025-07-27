import { ArrowLeft, Activity, MessageCircle } from 'lucide-react';

const MonitoringPage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="backdrop-blur-md bg-white/70 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-slate-900">Health Monitoring</h1>
                  <div className="text-sm text-slate-600">Track your health metrics</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Health Monitoring</h2>
          <p className="text-lg text-slate-600 mb-8">
            Monitor your vital signs, track symptoms, and get personalized health recommendations powered by AI.
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-orange-900 mb-2">Feature In Development</h3>
            <p className="text-orange-800">
              We're building comprehensive health monitoring tools including vitals tracking, medication reminders, 
              and trend analysis. Stay tuned for updates!
            </p>
            <button
              onClick={() => setCurrentPage('chat')}
              className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-2 px-6 rounded-lg font-medium flex items-center justify-center mx-auto"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat About Your Health
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;