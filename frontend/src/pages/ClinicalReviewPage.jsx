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
    },
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "emergency":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "reviewed":
        return "bg-green-100 text-green-800 border-green-200";
      case "escalated":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
    { label: "Pending Review", value: clinicalCases.filter((c) => c.status === "pending").length, icon: Clock },
    {
      label: "Emergency Cases",
      value: clinicalCases.filter((c) => c.urgency === "emergency").length,
      icon: AlertTriangle,
    },
    {
      label: "Completed Today",
      value: clinicalCases.filter((c) => c.status === "completed").length,
      icon: CheckCircle,
    },
    { label: "Follow-up Required", value: clinicalCases.filter((c) => c.followUpRequired).length, icon: Calendar },
  ];

  // Custom components
  const Badge = ({ children, className = "" }) => (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${className}`}>
      {children}
    </span>
  );

  const Card = ({ children, className = "", onClick }) => (
    <div className={`rounded-lg border ${className}`} onClick={onClick}>
      {children}
    </div>
  );

  const CardHeader = ({ children }) => (
    <div className="p-6 border-b border-white/20">
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
    <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}>
      {children}
    </div>
  );

  const TabsTrigger = ({ value, children, isActive, onClick }) => (
    <button
      onClick={() => onClick(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive ? "bg-background text-foreground shadow-sm" : "hover:bg-background/60"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/70 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center space-x-2 px-3 py-1 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-slate-900">Clinical Review Portal</h1>
                  <p className="text-sm text-slate-600">Human-in-the-loop validation system</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-3 py-1 text-sm border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
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
            <Card key={index} className="backdrop-blur-sm bg-white/60 border-white/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cases List */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm bg-white/60 border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Clinical Cases</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input
                        placeholder="Search cases..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 bg-white/80 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="p-2 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Tabs */}
                <div className="mb-6">
                  <TabsList className="grid w-full grid-cols-4 bg-slate-100">
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
                <div className="space-y-4">
                  {filteredCases.map((case_) => (
                    <Card
                      key={case_.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedCase?.id === case_.id ? "ring-2 ring-blue-500 bg-blue-50/50" : "bg-white/60"
                      }`}
                      onClick={() => setSelectedCase(case_)}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Badge className={getUrgencyColor(case_.urgency)}>{case_.urgency.toUpperCase()}</Badge>
                            <Badge className={getStatusColor(case_.status)}>{case_.status.toUpperCase()}</Badge>
                          </div>
                          <div className="text-sm text-slate-500">{case_.timestamp.toLocaleString()}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-slate-700">Case ID</p>
                            <p className="text-sm text-slate-600">{case_.id}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700">Patient ID</p>
                            <p className="text-sm text-slate-600">{case_.patientId}</p>
                          </div>
                        </div>

                        <div className="mt-3">
                          <p className="text-sm font-medium text-slate-700 mb-1">Symptoms</p>
                          <div className="flex flex-wrap gap-1">
                            {case_.symptoms.map((symptom, index) => (
                              <Badge key={index} className="bg-slate-50 text-slate-700 border-slate-200">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3">
                          <p className="text-sm font-medium text-slate-700 mb-1">AI Diagnosis</p>
                          <p className="text-sm text-slate-600">{case_.aiDiagnosis[0]}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-16 h-1 bg-gray-200 rounded-full">
                              <div
                                className="h-1 bg-blue-500 rounded-full"
                                style={{ width: `${case_.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-500">{case_.confidence}% confidence</span>
                          </div>
                        </div>

                        {case_.reviewedBy && (
                          <div className="mt-3 pt-3 border-t border-slate-200">
                            <p className="text-xs text-slate-500">Reviewed by {case_.reviewedBy}</p>
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
            <Card className="backdrop-blur-sm bg-white/60 border-white/20 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Case Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCase ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Case Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Case ID:</span>
                          <span className="font-medium">{selectedCase.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Patient ID:</span>
                          <span className="font-medium">{selectedCase.patientId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Timestamp:</span>
                          <span className="font-medium">{selectedCase.timestamp.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Clinical Assessment</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-1">Symptoms</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedCase.symptoms.map((symptom, index) => (
                              <Badge key={index} className="bg-slate-50 text-slate-700 border-slate-200">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">AI Differential Diagnosis</p>
                          <div className="space-y-2">
                            {selectedCase.aiDiagnosis.map((diagnosis, index) => (
                              <div key={index} className="text-sm text-slate-600">
                                {index + 1}. {diagnosis}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-1">AI Confidence Score</p>
                          <div className="flex items-center space-x-2">
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-blue-500 rounded-full"
                                style={{ width: `${selectedCase.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{selectedCase.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedCase.notes && (
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-2">Clinical Notes</h3>
                        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">{selectedCase.notes}</p>
                      </div>
                    )}

                    <div className="space-y-3">
                      <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve Diagnosis</span>
                      </button>
                      <button className="w-full bg-transparent border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span>Add Clinical Notes</span>
                      </button>
                      <button className="w-full bg-transparent border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                        <Phone className="w-4 h-4" />
                        <span>Contact Patient</span>
                      </button>
                      {selectedCase.urgency === "emergency" && (
                        <button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Escalate to Emergency</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Eye className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">Select a case to view details</p>
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