import { Phone, Stethoscope, AlertTriangle, Heart, Activity, Clock } from 'lucide-react';

const EmergencySection = ({ setCurrentPage }) => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-red-50 via-rose-50/60 to-pink-50/40 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
            <AlertTriangle className="w-4 h-4 mr-2 text-red-600" />
            Emergency Response System
          </div>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
            When Every
            <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent"> Second Matters</span>
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Our compassionate AI recognizes emergency symptoms instantly and guides you to immediate care. 
            Your safety is our highest priority, with 24/7 emergency protocols and direct healthcare connections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Emergency Call Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-red-100/60 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-transparent to-rose-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-slate-800">Immediate Emergency</h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Life-threatening symptoms detected? Get immediate professional help with direct emergency services connection.
              </p>
              <button 
                onClick={() => window.location.href = 'tel:112'}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-8 py-4 rounded-xl flex items-center justify-center text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Emergency: 112
              </button>
            </div>
            
            {/* Decorative pulse animation */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-red-400 rounded-full animate-ping opacity-30"></div>
            <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>

          {/* Find Care Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-teal-100/60 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-transparent to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-slate-800">Find Emergency Care</h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Locate nearby emergency rooms, urgent care centers, and healthcare facilities open 24/7 in your area.
              </p>
              <button 
                onClick={() => setCurrentPage('emergency-support')}
                className="w-full border-2 border-teal-200 hover:bg-teal-50 hover:border-teal-300 bg-transparent text-teal-700 text-lg px-8 py-4 rounded-xl flex items-center justify-center font-medium transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Stethoscope className="w-5 h-5 mr-2" />
                Find Emergency Care
              </button>
            </div>
            
            {/* Decorative medical cross */}
            <div className="absolute top-6 right-6 opacity-10">
              <div className="w-1 h-6 bg-teal-400 rounded-full"></div>
              <div className="w-6 h-1 bg-teal-400 rounded-full absolute top-2.5 -left-2.5"></div>
            </div>
          </div>
        </div>

        {/* Emergency indicators */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-red-100/40 shadow-sm">
          <h5 className="text-lg font-semibold text-slate-800 mb-4 text-center">Our Emergency Detection System Monitors:</h5>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-red-500" />
              Chest Pain & Heart Issues
            </div>
            <div className="flex items-center">
              <Activity className="w-4 h-4 mr-2 text-red-500" />
              Severe Breathing Problems
            </div>
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
              Loss of Consciousness
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-red-500" />
              Stroke Symptoms
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-sm text-slate-500 mt-8 text-center max-w-3xl mx-auto">
          <strong>Always call 112 for life-threatening emergencies.</strong> Our AI provides guidance but cannot replace 
          immediate professional medical intervention. Trust your instincts - when in doubt, seek emergency care.
        </p>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-16 left-16 w-72 h-72 bg-gradient-to-r from-red-400/15 to-rose-400/15 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-32 right-20 w-56 h-56 bg-gradient-to-r from-pink-400/15 to-red-400/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-r from-rose-400/15 to-pink-400/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>
      
      {/* Floating emergency icons */}
      <div className="absolute top-24 right-32 animate-bounce" style={{animationDelay: '2s'}}>
        <AlertTriangle className="w-7 h-7 text-red-400/40" />
      </div>
      <div className="absolute bottom-32 left-24 animate-bounce" style={{animationDelay: '4s'}}>
        <Heart className="w-6 h-6 text-rose-400/40" />
      </div>
      <div className="absolute top-1/2 left-12 animate-bounce" style={{animationDelay: '6s'}}>
        <Activity className="w-5 h-5 text-red-400/40" />
      </div>
      
      {/* Medical cross patterns */}
      <div className="absolute top-1/4 right-16 w-2 h-8 bg-red-300/30 rounded-full animate-pulse"></div>
      <div className="absolute top-1/4 right-12 w-8 h-2 bg-red-300/30 rounded-full animate-pulse"></div>
      
      <div className="absolute bottom-1/3 left-20 w-1.5 h-6 bg-rose-300/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/3 left-16 w-6 h-1.5 bg-rose-300/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>

      {/* Emergency heartbeat line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-center overflow-hidden">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-500 animate-bounce mr-3" style={{animationDelay: '0.5s'}} />
          
          {/* ECG-style emergency heartbeat line */}
          <svg width="400" height="30" viewBox="0 0 400 30" className="animate-pulse">
            <path
              d="M0,15 L30,15 L35,15 L40,5 L45,25 L50,10 L55,15 L85,15 L90,15 L95,5 L100,25 L105,10 L110,15 L140,15 L145,15 L150,5 L155,25 L160,10 L165,15 L195,15 L200,15 L205,5 L210,25 L215,10 L220,15 L250,15 L255,15 L260,5 L265,25 L270,10 L275,15 L305,15 L310,15 L315,5 L320,25 L325,10 L330,15 L360,15 L365,15 L370,5 L375,25 L380,10 L385,15 L400,15"
              stroke="rgb(239, 68, 68)"
              strokeWidth="2"
              fill="none"
              className="opacity-60"
            />
          </svg>
          
          <AlertTriangle className="w-5 h-5 text-red-500 animate-bounce ml-3" style={{animationDelay: '1.5s'}} />
        </div>
      </div>
    </section>
  );
};

export default EmergencySection;