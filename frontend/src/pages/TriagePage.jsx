import { useState, useEffect } from "react"
import {
  ArrowLeft,
  AlertTriangle,
  Phone,
  Calendar,
  CheckCircle,
  User,
  MapPin,
  Stethoscope,
  Ambulance,
  Hospital,
  UserCheck,
  MessageSquare,
  FileText,
} from "lucide-react"

export default function TriageSystem({setCurrentPage}) {
  const [triageResult, setTriageResult] = useState(null)
  const [isProcessing, setIsProcessing] = useState(true)
  const [selectedResource, setSelectedResource] = useState(null)

  // Mock patient data from diagnosis
  const patientData = {
    diagnosis: "Migraine with Aura",
    probability: 85.3,
    urgency: "moderate",
    symptoms: ["severe headache", "light sensitivity", "nausea"],
    riskFactors: ["history of migraines", "female", "age 34"],
    vitalSigns: {
      bloodPressure: "140/90",
      heartRate: 88,
      temperature: "98.6°F",
      oxygenSaturation: 98,
    },
  }

  const runTriageAlgorithm = async () => {
    setIsProcessing(true)

    // Simulate triage processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate triage decision based on diagnosis
    const decision = {
      level: "telemedicine",
      priority: 3,
      timeframe: "Within 4-6 hours",
      actions: [
        "Schedule telemedicine consultation",
        "Begin migraine management protocol",
        "Monitor symptom progression",
        "Prepare medication history",
      ],
      reasoning: [
        "Moderate urgency migraine with established pattern",
        "No immediate life-threatening symptoms",
        "Patient has history of similar episodes",
        "Telemedicine appropriate for initial management",
      ],
      resources: [
        {
          type: "telemedicine",
          name: "MediCore Telehealth",
          availability: "Available now",
          waitTime: "15 minutes",
          contact: "Start Video Call",
        },
        {
          type: "clinic",
          name: "Northside Medical Center",
          availability: "Next appointment: Today 3:30 PM",
          distance: "2.3 miles",
          waitTime: "45 minutes",
          contact: "(555) 123-4567",
        },
        {
          type: "clinic",
          name: "Downtown Urgent Care",
          availability: "Walk-in available",
          distance: "1.8 miles",
          waitTime: "60-90 minutes",
          contact: "(555) 987-6543",
        },
        {
          type: "emergency",
          name: "City General Hospital ER",
          availability: "24/7 Emergency",
          distance: "3.1 miles",
          waitTime: "2-4 hours",
          contact: "911 or (555) 555-0911",
        },
      ],
    }

    setTriageResult(decision)
    setIsProcessing(false)
  }

  useEffect(() => {
    runTriageAlgorithm()
  }, [])

  const getUrgencyColor = (level) => {
    switch (level) {
      case "emergency":
        return "bg-red-100 text-red-800 border-red-200"
      case "urgent-care":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "telemedicine":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const getResourceIcon = (type) => {
    switch (type) {
      case "telemedicine":
        return MessageSquare
      case "clinic":
        return Stethoscope
      case "hospital":
        return Hospital
      case "emergency":
        return Ambulance
      default:
        return CheckCircle
    }
  }


  const handleClinicalReview = () => {
    // Replace with your navigation logic
    console.log("Navigate to clinical review")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="backdrop-blur-md bg-white bg-opacity-70 border-b border-white border-opacity-20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-transparent border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Diagnosis
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-slate-900">Clinical Triage System</h1>
                  <p className="text-sm text-slate-600">Automated care pathway determination</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                Emergency: 911
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Patient Summary */}
        <div className="mb-6 backdrop-blur-sm bg-white bg-opacity-60 border border-white border-opacity-20 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Patient Assessment Summary</span>
            </h3>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-slate-700">Primary Diagnosis</p>
                <p className="text-sm text-slate-900 font-semibold">{patientData.diagnosis}</p>
                <p className="text-xs text-slate-600">{patientData.probability}% confidence</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Urgency Level</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getUrgencyColor(patientData.urgency)}`}>
                  {patientData.urgency.toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Key Symptoms</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {patientData.symptoms.map((symptom, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Vital Signs</p>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>BP: {patientData.vitalSigns.bloodPressure}</div>
                  <div>HR: {patientData.vitalSigns.heartRate} bpm</div>
                  <div>Temp: {patientData.vitalSigns.temperature}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isProcessing ? (
          <div className="backdrop-blur-sm bg-white bg-opacity-60 border border-white border-opacity-20 rounded-lg shadow-sm">
            <div className="p-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Processing Triage Decision</h3>
                <p className="text-slate-600 mb-4">Analyzing symptoms, urgency level, and available care options...</p>
                <div className="w-64 mx-auto bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          triageResult && (
            <div className="space-y-6">
              {/* Triage Decision */}
              <div className={`border-2 ${getUrgencyColor(triageResult.level)} backdrop-blur-sm bg-white bg-opacity-60 rounded-lg shadow-sm`}>
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <AlertTriangle className="w-6 h-6" />
                    <span>Triage Decision: {triageResult.level.replace("-", " ").toUpperCase()}</span>
                  </h3>
                  <p className="text-slate-600">
                    Priority Level {triageResult.priority} • {triageResult.timeframe}
                  </p>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Recommended Actions</h4>
                      <ul className="space-y-2">
                        {triageResult.actions.map((action, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Clinical Reasoning</h4>
                      <ul className="space-y-2">
                        {triageResult.reasoning.map((reason, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-slate-700">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Care Options */}
              <div className="backdrop-blur-sm bg-white bg-opacity-60 border border-white border-opacity-20 rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Available Care Options</span>
                  </h3>
                  <p className="text-sm text-slate-600">
                    Select the most appropriate care option based on your needs and availability
                  </p>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {triageResult.resources.map((resource, index) => {
                      const IconComponent = getResourceIcon(resource.type)
                      const isRecommended = index === 0

                      return (
                        <div
                          key={index}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md border rounded-lg p-4 ${
                            isRecommended ? "ring-2 ring-blue-500 bg-blue-50 bg-opacity-50" : "bg-white bg-opacity-60"
                          } ${selectedResource?.name === resource.name ? "ring-2 ring-green-500" : ""}`}
                          onClick={() => setSelectedResource(resource)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  resource.type === "emergency"
                                    ? "bg-red-500"
                                    : resource.type === "telemedicine"
                                      ? "bg-blue-500"
                                      : resource.type === "clinic"
                                        ? "bg-green-500"
                                        : "bg-orange-500"
                                }`}
                              >
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-slate-900">{resource.name}</h4>
                                <p className="text-sm text-slate-600">{resource.availability}</p>
                              </div>
                            </div>
                            {isRecommended && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Recommended
                              </span>
                            )}
                          </div>

                          <div className="space-y-2 text-sm">
                            {resource.distance && (
                              <div className="flex items-center justify-between">
                                <span className="text-slate-600">Distance:</span>
                                <span className="font-medium">{resource.distance}</span>
                              </div>
                            )}
                            {resource.waitTime && (
                              <div className="flex items-center justify-between">
                                <span className="text-slate-600">Wait Time:</span>
                                <span className="font-medium">{resource.waitTime}</span>
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600">Contact:</span>
                              <span className="font-medium">{resource.contact}</span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <button
                              className={`w-full px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                                resource.type === "emergency"
                                  ? "bg-red-600 hover:bg-red-700"
                                  : resource.type === "telemedicine"
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-green-600 hover:bg-green-700"
                              }`}
                            >
                              {resource.type === "telemedicine"
                                ? "Start Video Call"
                                : resource.type === "emergency"
                                  ? "Call Emergency"
                                  : "Schedule Appointment"}
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Selected Resource Details */}
              {selectedResource && (
                <div className="backdrop-blur-sm bg-white bg-opacity-60 border border-white border-opacity-20 rounded-lg shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Selected: {selectedResource.name}</span>
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Next Steps</h4>
                        <div className="space-y-3">
                          {[
                            "Confirm appointment or start consultation",
                            "Prepare medical history and current symptoms",
                            "Follow prescribed treatment plan"
                          ].map((step, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {index + 1}
                              </div>
                              <span className="text-sm">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Preparation Checklist</h4>
                        <div className="space-y-2">
                          {[
                            "List of current medications",
                            "Insurance information",
                            "Symptom timeline and severity",
                            "Previous medical records",
                            "Emergency contact information",
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <span className="text-sm text-slate-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                      <button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Confirm Appointment
                      </button>
                      <button className="flex-1 bg-transparent border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Export Summary
                      </button>
                      <button 
                        onClick={handleClinicalReview}
                        className="flex-1 bg-transparent border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                      >
                        <UserCheck className="w-4 h-4 mr-2" />
                        Clinical Review
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Emergency Override */}
              <div className="border-2 border-red-200 bg-red-50 backdrop-blur-sm rounded-lg shadow-sm">
                <div className="p-6">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-8 h-8 text-red-600" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-red-900">Emergency Override</h3>
                      <p className="text-red-700">
                        If symptoms worsen or you experience chest pain, difficulty breathing, or loss of consciousness,
                        call 911 immediately regardless of this triage recommendation.
                      </p>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Call 911
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}