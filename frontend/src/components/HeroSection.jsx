import { MessageCircle, Shield, UserCheck, Star, Heart, Activity } from 'lucide-react';

const HeroSection = ({ setCurrentPage }) => {
  return (
    <section className="relative overflow-hidden py-6 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
            <Heart className="w-4 h-4 mr-2 text-rose-500" />
            Trusted Healthcare AI Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-800">आरोग्य-Driven Care</span>
            <br />
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Powered by Innovation
            </span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            We understand that your health is precious. Our compassionate AI provides gentle, thorough clinical 
            assessments with the care and attention you deserve, backed by evidence-based medicine and human expertise.
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-slate-500">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-teal-600" />
              HIPAA Compliant
            </div>
            <div className="flex items-center">
              <UserCheck className="w-4 h-4 mr-2 text-teal-600" />
              Doctor Reviewed
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-teal-600" />
              Evidence-Based
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('symptom-checker')}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-lg px-8 py-4 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 z-20"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Begin Your Assessment
            </button>
            <button
              onClick={() => setCurrentPage('clinical-review')}
              className="bg-white border-2 border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-teal-700 text-lg px-8 py-4 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <UserCheck className="w-5 h-5 mr-2" />
              Healthcare Provider Portal
            </button>
          </div>
          
          <p className="text-sm text-slate-500 mt-6 max-w-2xl mx-auto">
            Our AI provides initial guidance and screening. Always consult with a healthcare professional 
            for medical decisions and emergency situations.
          </p>
        </div>
        
        {/* Reassuring statistics
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-teal-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-1">500K+</div>
            <div className="text-sm text-slate-600">Patients Helped</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-1">24/7</div>
            <div className="text-sm text-slate-600">Available Support</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-rose-500" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-1">98.5%</div>
            <div className="text-sm text-slate-600">Satisfaction Rate</div>
          </div>
        </div> */}
      </div>

      {/* Enhanced floating elements */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-teal-400/15 to-emerald-400/15 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-40 right-10 w-64 h-64 bg-gradient-to-r from-rose-400/15 to-pink-400/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>
      
      {/* Medical cross patterns */}
      <div className="absolute top-1/2 left-1/4 w-3 h-12 bg-teal-300/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-3 bg-teal-300/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      
      <div className="absolute top-1/3 left-3/4 w-2 h-8 bg-emerald-300/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 left-3/4 w-8 h-2 bg-emerald-300/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      {/* Heartbeat line separator at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-center overflow-hidden">
        <div className="flex items-center">
          <Heart className="w-6 h-6 text-rose-500 animate-bounce mr-4" style={{animationDelay: '0.5s'}} />
          
          {/* ECG-style heartbeat line */}
          <svg width="600" height="40" viewBox="0 0 600 40" className="animate-pulse">
            <path
              d="M0,20 L50,20 L60,20 L65,5 L70,35 L75,10 L80,20 L130,20 L140,20 L145,5 L150,35 L155,10 L160,20 L210,20 L220,20 L225,5 L230,35 L235,10 L240,20 L290,20 L300,20 L305,5 L310,35 L315,10 L320,20 L370,20 L380,20 L385,5 L390,35 L395,10 L400,20 L450,20 L460,20 L465,5 L470,35 L475,10 L480,20 L530,20 L540,20 L545,5 L550,35 L555,10 L560,20 L600,20"
              stroke="rgb(239, 68, 68)"
              strokeWidth="2"
              fill="none"
              className="opacity-70"
            />
          </svg>
          
          <Heart className="w-6 h-6 text-rose-500 animate-bounce ml-4" style={{animationDelay: '1.5s'}} />
        </div>
        
        {/* Subtle gradient overlay to fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-white/60"></div>
      </div>
      
      {/* Floating medical icons */}
      <div className="absolute top-32 right-32 animate-bounce" style={{animationDelay: '2s'}}>
        <Shield className="w-8 h-8 text-teal-400/40" />
      </div>
      <div className="absolute bottom-40 left-16 animate-bounce" style={{animationDelay: '4s'}}>
        <Activity className="w-6 h-6 text-emerald-400/40" />
      </div>
    </section>
  );
};

export default HeroSection;