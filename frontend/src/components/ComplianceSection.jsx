import { CheckCircle } from 'lucide-react';

const ComplianceSection = () => {
  const complianceFeatures = [
    "HIPAA/GDPR Encryption",
    "Two-Factor Authentication",
    "Audit Logging",
    "Data Retention Policies",
    "Clinical Validation",
    "Emergency Protocols",
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 text-slate-900">Enterprise Security & Compliance</h3>
          <p className="text-lg text-slate-600">
            Built for healthcare organizations with stringent security and regulatory requirements
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complianceFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-lg p-6 hover:bg-white/80 transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-slate-900">{feature}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;