import { Heart, Shield, UserCheck, Stethoscope, Activity, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                SahaayAI
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Compassionate healthcare technology that puts your wellbeing first. 
              Trusted by patients and healthcare professionals worldwide.
            </p>
            
            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center bg-slate-800/60 px-3 py-1.5 rounded-full text-xs">
                <Shield className="w-3 h-3 mr-1.5 text-teal-400" />
                HIPAA Secure
              </div>
              <div className="flex items-center bg-slate-800/60 px-3 py-1.5 rounded-full text-xs">
                <UserCheck className="w-3 h-3 mr-1.5 text-emerald-400" />
                Doctor Reviewed
              </div>
            </div>
          </div>

          {/* Care Services */}
          <div>
            <h4 className="font-semibold mb-4 text-teal-300 flex items-center">
              <Stethoscope className="w-4 h-4 mr-2" />
              Care Services
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="hover:text-teal-300 transition-colors cursor-pointer">Symptom Assessment</li>
              <li className="hover:text-teal-300 transition-colors cursor-pointer">Health Monitoring</li>
              <li className="hover:text-teal-300 transition-colors cursor-pointer">Personalized Care Plans</li>
              <li className="hover:text-teal-300 transition-colors cursor-pointer">Wellness Tracking</li>
              <li className="hover:text-teal-300 transition-colors cursor-pointer">Emergency Support</li>
            </ul>
          </div>

          {/* For Healthcare Providers */}
          <div>
            <h4 className="font-semibold mb-4 text-emerald-300 flex items-center">
              <UserCheck className="w-4 h-4 mr-2" />
              For Providers
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="hover:text-emerald-300 transition-colors cursor-pointer">Clinical Dashboard</li>
              <li className="hover:text-emerald-300 transition-colors cursor-pointer">Patient Analytics</li>
              <li className="hover:text-emerald-300 transition-colors cursor-pointer">EHR Integration</li>
              <li className="hover:text-emerald-300 transition-colors cursor-pointer">Quality Assurance</li>
              <li className="hover:text-emerald-300 transition-colors cursor-pointer">Training Resources</li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-rose-300 flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Support & Care
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center hover:text-rose-300 transition-colors cursor-pointer">
                <Phone className="w-3 h-3 mr-2" />
                24/7 Health Support
              </li>
              <li className="flex items-center hover:text-rose-300 transition-colors cursor-pointer">
                <Mail className="w-3 h-3 mr-2" />
                care@healthcare-ai.com
              </li>
              <li className="flex items-center hover:text-rose-300 transition-colors cursor-pointer">
                <Activity className="w-3 h-3 mr-2" />
                Health Resources
              </li>
              <li className="flex items-center hover:text-rose-300 transition-colors cursor-pointer">
                <Shield className="w-3 h-3 mr-2" />
                Privacy & Security
              </li>
              <li className="flex items-center hover:text-rose-300 transition-colors cursor-pointer">
                <MapPin className="w-3 h-3 mr-2" />
                Find Care Centers
              </li>
            </ul>
          </div>
        </div>



        {/* Bottom Section */}
        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-slate-400 mb-2">
                © 2024 MediCare AI. Dedicated to your wellbeing with compassionate technology.
              </p>
              <p className="text-xs text-slate-500">
                <strong>Important:</strong> This platform provides health guidance and support. Always consult healthcare 
                professionals for medical decisions and emergencies. Call 911 for life-threatening situations.
              </p>
            </div>
            
            {/* Heartbeat animation */}
            <div className="flex items-center">
              <span className="text-xs text-slate-500 mr-3">Caring for you</span>
              <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
              <svg width="60" height="20" viewBox="0 0 60 20" className="ml-2 animate-pulse">
                <path
                  d="M0,10 L10,10 L12,10 L14,5 L16,15 L18,8 L20,10 L30,10 L32,10 L34,5 L36,15 L38,8 L40,10 L50,10 L52,10 L54,5 L56,15 L58,8 L60,10"
                  stroke="rgb(251, 113, 133)"
                  strokeWidth="1.5"
                  fill="none"
                  className="opacity-60"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-16 left-16 w-48 h-48 bg-gradient-to-r from-teal-600/10 to-emerald-600/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-16 right-20 w-40 h-40 bg-gradient-to-r from-rose-600/10 to-pink-600/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
      
      {/* Floating medical icons */}
      <div className="absolute top-20 right-32 animate-bounce opacity-20" style={{animationDelay: '1s'}}>
        <Stethoscope className="w-6 h-6 text-teal-400" />
      </div>
      <div className="absolute bottom-24 left-24 animate-bounce opacity-20" style={{animationDelay: '3s'}}>
        <Activity className="w-5 h-5 text-emerald-400" />
      </div>
      <div className="absolute top-1/3 right-16 animate-bounce opacity-20" style={{animationDelay: '5s'}}>
        <Heart className="w-4 h-4 text-rose-400" />
      </div>
      
      {/* Medical cross patterns */}
      <div className="absolute top-1/4 left-12 w-1 h-6 bg-teal-400/20 rounded-full animate-pulse"></div>
      <div className="absolute top-1/4 left-9 w-6 h-1 bg-teal-400/20 rounded-full animate-pulse"></div>
      
      <div className="absolute bottom-1/3 right-12 w-1 h-4 bg-emerald-400/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/3 right-10 w-4 h-1 bg-emerald-400/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
    </footer>
  );
};

export default Footer;