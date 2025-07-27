import { MessageCircle, Brain, Shield, Database, UserCheck, BarChart3, ArrowRight, Heart, Activity, Stethoscope } from 'lucide-react';

const FeaturesSection = ({ setCurrentPage, hoveredFeature, setHoveredFeature }) => {
  const features = [
    {
      icon: MessageCircle,
      title: "Compassionate AI Assessment",
      description: "Gentle, conversational symptom evaluation that listens to your concerns with empathy and understanding",
      color: "from-teal-500 to-emerald-500",
      page: "symptom-checker",
    },
    {
      icon: Brain,
      title: "Evidence-Based Care",
      description: "Clinical insights backed by medical research and validated by healthcare professionals",
      color: "from-emerald-500 to-teal-500",
      page: "diagnosis",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Your health information is protected with enterprise-grade security and HIPAA compliance",
      color: "from-teal-600 to-cyan-600",
      page: "triage",
    },
    {
      icon: UserCheck,
      title: "Doctor Reviewed",
      description: "All assessments are reviewed by qualified healthcare professionals for accuracy and safety",
      color: "from-cyan-500 to-blue-500",
      page: "clinical-review",
    },
    {
      icon: Heart,
      title: "Personalized Care",
      description: "Tailored health guidance that considers your unique medical history and individual needs",
      color: "from-rose-500 to-pink-500",
      page: "integration",
    },
    {
      icon: Activity,
      title: "Continuous Monitoring",
      description: "Track your health journey with ongoing support and progress monitoring tools",
      color: "from-blue-500 to-indigo-500",
      page: "monitoring",
    },
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50/20 to-emerald-50/10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-teal-100 text-teal-700 hover:bg-teal-200 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
            <Stethoscope className="w-4 h-4 mr-2 text-teal-600" />
            Comprehensive Healthcare Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
            Healthcare That
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"> Cares</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Experience healthcare technology designed with compassion, backed by clinical expertise, 
            and focused on your wellbeing every step of the way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group cursor-pointer h-full backdrop-blur-sm bg-white/80 border border-teal-100/60 hover:bg-white/95 hover:border-teal-200 transition-all duration-500 hover:scale-105 hover:shadow-xl rounded-2xl relative overflow-hidden"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              onClick={() => setCurrentPage(feature.page)}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 via-transparent to-emerald-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 p-8">
                <div className="text-center mb-6">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center transform transition-all duration-300 shadow-lg ${
                      hoveredFeature === index ? "scale-110 rotate-3 shadow-xl" : ""
                    }`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl mb-3 group-hover:text-teal-700 transition-colors font-semibold text-slate-800">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
                
                {/* Call to action */}
                <div className="text-center">
                  <div className="inline-flex items-center text-teal-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-medium mr-2">Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
              
              {/* Decorative medical cross */}
              <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <div className="w-1 h-6 bg-teal-400 rounded-full"></div>
                <div className="w-6 h-1 bg-teal-400 rounded-full absolute top-2.5 -left-2.5"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust indicators at bottom
        <div className="flex flex-wrap justify-center gap-8 mt-16 text-sm text-slate-500">
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-2 text-teal-600" />
            HIPAA Compliant
          </div>
          <div className="flex items-center">
            <UserCheck className="w-4 h-4 mr-2 text-teal-600" />
            Clinically Validated
          </div>
          <div className="flex items-center">
            <Heart className="w-4 h-4 mr-2 text-rose-500" />
            Patient-Centered
          </div>
          <div className="flex items-center">
            <Activity className="w-4 h-4 mr-2 text-emerald-600" />
            Evidence-Based
          </div>
        </div>*/}
      </div> 

      {/* Background decorative elements matching HeroSection */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-teal-400/10 to-emerald-400/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-32 right-16 w-48 h-48 bg-gradient-to-r from-rose-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute bottom-16 left-1/3 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>
      
      {/* Floating medical icons */}
      <div className="absolute top-20 right-20 animate-bounce" style={{animationDelay: '2s'}}>
        <Heart className="w-6 h-6 text-rose-400/30" />
      </div>
      <div className="absolute bottom-32 left-20 animate-bounce" style={{animationDelay: '4s'}}>
        <Activity className="w-5 h-5 text-emerald-400/30" />
      </div>
      <div className="absolute top-1/2 right-8 animate-bounce" style={{animationDelay: '6s'}}>
        <Stethoscope className="w-7 h-7 text-teal-400/30" />
      </div>
      
      {/* Medical cross patterns
      <div className="absolute top-1/3 left-12 w-2 h-8 bg-teal-300/30 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 left-8 w-8 h-2 bg-teal-300/30 rounded-full animate-pulse"></div>
      
      <div className="absolute bottom-1/4 right-1/4 w-1.5 h-6 bg-emerald-300/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/4 right-1/4 w-6 h-1.5 bg-emerald-300/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div> */}
    </section>
  );
};

export default FeaturesSection;