import { useState } from "react";
import {
  ArrowLeft,
  UserCheck,
  AlertTriangle,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare,
  FileText,
  Shield,
  Calendar,
  Phone,
  Heart,
  Stethoscope,
  Brain,
  Activity,
  Users,
  TrendingUp,
} from "lucide-react";

const ClinicalReviewPage = ({ setCurrentPage }) => {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);

  // Mock clinical cases data
  const clinicalCases = [
    {
      id: "CASE-001",
      patientId: "PT-12345",
      timestamp: new Date("2024-01-15T10:30:00"),
      urgency: "high",
      status: "pending",
      symptoms: ["severe headache", "nausea", "light sensitivity"],
      aiDiagnosis: ["Migraine (85%)", "Tension headache (45%)", "Cluster headache (30%)"],
      confidence: 85,
      followUpRequired: true,
      patientAge: 34,
      patientGender: "Female",
    },
    {
      id: "CASE-002",
      patientId: "PT-12346",
      timestamp: new Date("2024-01-15T09:15:00"),
      urgency: "emergency",
      status: "escalated",
      symptoms: ["chest pain", "shortness of breath", "sweating"],
      aiDiagnosis: ["Acute coronary syndrome (92%)", "Panic attack (35%)", "GERD (20%)"],
      confidence: 92,
      reviewedBy: "Dr. Sarah Johnson",
      notes: "Patient directed to emergency department immediately",
      followUpRequired: false,
      patientAge: 58,
      patientGender: "Male",
    },
    {
      id: "CASE-003",
      patientId: "PT-12347",
      timestamp: new Date("2024-01-15T08:45:00"),
      urgency: "moderate",
      status: "reviewed",
      symptoms: ["fever", "cough", "fatigue"],
      aiDiagnosis: ["Viral upper respiratory infection (78%)", "Bacterial pneumonia (25%)", "COVID-19 (40%)"],
      confidence: 78,
      reviewedBy: "Dr. Michael Chen",
      notes: "Recommended home care with follow-up in 3 days",
      followUpRequired: true,
      patientAge: 28,
      patientGender: "Female",
    },
    {
      id: "CASE-004",
      patientId: "PT-12348",
      timestamp: new Date("2024-01-15T07:20:00"),
      urgency: "low",
      status: "completed",
      symptoms: ["mild headache", "stress"],
      aiDiagnosis: ["Tension headache (90%)", "Stress-related symptoms (75%)"],
      confidence: 90,
      reviewedBy: "Dr. Emily Rodriguez",
      notes: "Self-care recommendations provided",
      followUpRequired: false,
      patientAge: 42,
      patientGender: "Male",
    },
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "emergency":
        return "bg-red-50 text-red-700 border-red-200";
      case "high":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "moderate":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "reviewed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "escalated":
        return "bg-red-50 text-red-700 border-red-200";
      case "completed":
        return "bg-teal-50 text-teal-700 border-teal-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const filteredCases = clinicalCases.filter((case_) => {
    const matchesSearch =
      case_.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.symptoms.some((symptom) => symptom.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "pending" && case_.status === "pending") ||
      (selectedTab === "reviewed" && case_.status === "reviewed") ||
      (selectedTab === "emergency" && case_.urgency === "emergency");

    return matchesSearch && matchesTab;
  });

  const stats = [
    { 
      label: "Pending Review", 
      value: clinicalCases.filter((c) => c.status === "pending").length, 
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    {
      label: "Emergency Cases",
      value: clinicalCases.filter((c) => c.urgency === "emergency").length,
      icon: AlertTriangle,
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
      textColor: "text-red-700"
    },
    {
      label: "Completed Today",
      value: clinicalCases.filter((c) => c.status === "completed").length,
      icon: CheckCircle,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700"
    },
    { 
      label: "Follow-up Required", 
      value: clinicalCases.filter((c) => c.followUpRequired).length, 
      icon: Calendar,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700"
    },
  ];

  // Custom components
  const Badge = ({ children, className = "" }) => (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${className}`}>
      {children}
    </span>
  );

  const Card = ({ children, className = "", onClick }) => (
    <div className={`rounded-2xl border shadow-sm ${className}`} onClick={onClick}>
      {children}
    </div>
  );

  const CardHeader = ({ children }) => (
    <div className="p-6 border-b border-teal-50">
      {children}
    </div>
  );

  const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );

  const CardTitle = ({ children, className = "" }) => (
    <h2 className={`text-lg font-semibold ${className}`}>
      {children}
    </h2>
  );

  const TabsList = ({ children, className = "" }) => (
    <div className={`inline-flex h-10 items-center justify-center rounded-xl bg-teal-50 p-1 text-slate-600 ${className}`}>
      {children}
    </div>
  );

  const TabsTrigger = ({ value, children, isActive, onClick }) => (
    <button
      onClick={() => onClick(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive ? "bg-white text-teal-700 shadow-sm border border-teal-100" : "hover:bg-white/60 hover:text-teal-700"
      }`}
    >
      {children}
    </button>
  );

  const ProgressBar = ({ value }) => (
    <div className="w-full bg-teal-100 rounded-full h-2">
      <div 
        className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-full transition-all duration-300" 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/80 border-b border-teal-100/40 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center space-x-2 px-3 py-1 text-sm text-slate-600 hover:text-teal-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-slate-900">Clinical Review Portal</h1>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Heart className="w-3 h-3 text-rose-500" />
                    <span>Human-in-the-loop • Evidence-Based Care</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 text-sm border border-teal-200 hover:bg-teal-50 bg-white/80 rounded-xl transition-colors">
                <Download className="w-4 h-4 text-teal-600" />
                <span className="text-slate-700">Export Report</span>
              </button>
              <button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors shadow-sm">
                <Shield className="w-4 h-4" />
                <span>Clinical Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="backdrop-blur-sm bg-white/80 border-teal-100/60">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span>Updated in real-time</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cases List */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm bg-white/80 border-teal-100/60">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-slate-800">
                    <Activity className="w-5 h-5 text-teal-600" />
                    <span>Clinical Assessment Queue</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input
                        placeholder="Search cases..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 bg-white/90 border border-teal-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300"
                      />
                    </div>
                    <button className="p-2 border border-teal-100 hover:bg-teal-50 bg-white/80 rounded-xl transition-colors">
                      <Filter className="w-4 h-4 text-teal-600" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Tabs */}
                <div className="mb-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger 
                      value="pending" 
                      isActive={selectedTab === "pending"}
                      onClick={setSelectedTab}
                    >
                      Pending
                    </TabsTrigger>
                    <TabsTrigger 
                      value="reviewed" 
                      isActive={selectedTab === "reviewed"}
                      onClick={setSelectedTab}
                    >
                      Reviewed
                    </TabsTrigger>
                    <TabsTrigger 
                      value="emergency" 
                      isActive={selectedTab === "emergency"}
                      onClick={setSelectedTab}
                    >
                      Emergency
                    </TabsTrigger>
                    <TabsTrigger 
                      value="all" 
                      isActive={selectedTab === "all"}
                      onClick={setSelectedTab}
                    >
                      All Cases
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Cases */}
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {filteredCases.map((case_) => (
                    <Card
                      key={case_.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md border ${
                        selectedCase?.id === case_.id 
                          ? "ring-2 ring-teal-500 bg-teal-50/50 border-teal-200" 
                          : "bg-white/90 border-teal-100/40 hover:border-teal-200 hover:bg-white"
                      }`}
                      onClick={() => setSelectedCase(case_)}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Badge className={getUrgencyColor(case_.urgency)}>
                              {case_.urgency.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(case_.status)}>
                              {case_.status.toUpperCase()}
                            </Badge>
                            {case_.followUpRequired && (
                              <Badge className="bg-amber-50 text-amber-700 border-amber-200">
                                FOLLOW-UP
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-slate-500">
                            {case_.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Case ID</p>
                            <p className="text-sm font-medium text-slate-800">{case_.id}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Patient</p>
                            <p className="text-sm font-medium text-slate-800">{case_.patientId}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Demographics</p>
                            <p className="text-sm text-slate-600">{case_.patientAge}y, {case_.patientGender}</p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Presenting Symptoms</p>
                          <div className="flex flex-wrap gap-1">
                            {case_.symptoms.map((symptom, index) => (
                              <Badge key={index} className="bg-slate-50 text-slate-700 border-slate-200">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">AI Assessment</p>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-700">{case_.aiDiagnosis[0]}</p>
                            <div className="flex items-center space-x-2">
                              <Brain className="w-3 h-3 text-teal-500" />
                              <span className="text-xs text-slate-500">{case_.confidence}%</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <ProgressBar value={case_.confidence} />
                          </div>
                        </div>

                        {case_.reviewedBy && (
                          <div className="pt-3 border-t border-teal-100">
                            <div className="flex items-center space-x-2">
                              <UserCheck className="w-3 h-3 text-emerald-500" />
                              <p className="text-xs text-slate-600">Reviewed by {case_.reviewedBy}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Case Details */}
          <div className="lg:col-span-1">
            <Card className="backdrop-blur-sm bg-white/80 border-teal-100/60 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <span>Patient Care Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCase ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                        <Users className="w-4 h-4 text-teal-600" />
                        <span>Patient Information</span>
                      </h3>
                      <div className="space-y-3 text-sm bg-slate-50/50 rounded-xl p-4">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Case ID:</span>
                          <span className="font-medium text-slate-800">{selectedCase.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Patient ID:</span>
                          <span className="font-medium text-slate-800">{selectedCase.patientId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Age:</span>
                          <span className="font-medium text-slate-800">{selectedCase.patientAge} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Gender:</span>
                          <span className="font-medium text-slate-800">{selectedCase.patientGender}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Timestamp:</span>
                          <span className="font-medium text-slate-800">{selectedCase.timestamp.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-teal-600" />
                        <span>Clinical Assessment</span>
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">Presenting Symptoms</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedCase.symptoms.map((symptom, index) => (
                              <Badge key={index} className="bg-rose-50 text-rose-700 border-rose-200">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2 flex items-center space-x-1">
                            <Brain className="w-3 h-3 text-teal-500" />
                            <span>AI Differential Diagnosis</span>
                          </p>
                          <div className="space-y-2 bg-slate-50/50 rounded-xl p-4">
                            {selectedCase.aiDiagnosis.map((diagnosis, index) => (
                              <div key={index} className="text-sm text-slate-700 flex items-center space-x-2">
                                <span className="w-5 h-5 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-medium">
                                  {index + 1}
                                </span>
                                <span>{diagnosis}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">AI Confidence Score</p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-600">Assessment Confidence</span>
                              <span className="font-medium text-slate-800">{selectedCase.confidence}%</span>
                            </div>
                            <ProgressBar value={selectedCase.confidence} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedCase.notes && (
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-2 flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-teal-600" />
                          <span>Clinical Notes</span>
                        </h3>
                        <div className="bg-teal-50/50 border border-teal-100 rounded-xl p-4">
                          <p className="text-sm text-slate-700">{selectedCase.notes}</p>
                          {selectedCase.reviewedBy && (
                            <div className="mt-2 pt-2 border-t border-teal-200">
                              <p className="text-xs text-slate-500">— {selectedCase.reviewedBy}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve Assessment</span>
                      </button>
                      <button className="w-full bg-white/90 border border-teal-200 hover:bg-teal-50 text-slate-700 px-4 py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors">
                        <MessageSquare className="w-4 h-4 text-teal-600" />
                        <span>Add Clinical Notes</span>
                      </button>
                      <button className="w-full bg-white/90 border border-teal-200 hover:bg-teal-50 text-slate-700 px-4 py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors">
                        <Phone className="w-4 h-4 text-teal-600" />
                        <span>Contact Patient</span>
                      </button>
                      {selectedCase.urgency === "emergency" && (
                        <button className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-4 py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-sm">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Emergency Escalation</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-teal-500" />
                    </div>
                    <p className="text-slate-600 mb-2">Select a case to review</p>
                    <p className="text-sm text-slate-500">Choose a patient case from the queue to begin your clinical review</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalReviewPage;