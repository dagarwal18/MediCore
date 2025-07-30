import { useState, useRef, useEffect } from "react";
import { apiFetch } from "../utils/apiFetch";
import {
  ArrowLeft,
  MessageCircle,
  Send,
  Mic,
  User,
  Bot,
  AlertTriangle,
  CheckCircle,
  Clock,
  Brain,
  Shield,
  FileText,
  Phone,
  Calendar,
  Database,
  Heart,
  Stethoscope,
  Paperclip,
  Upload,
  X,
  Download,
  Eye,
  Trash2,
} from "lucide-react";


const SymptomChecker = ({ setCurrentPage }) => {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "system",
      content:
        "Welcome to SahayAI. I'm here to help you understand your symptoms with compassionate, evidence-based guidance. Your wellbeing is my priority, and I'll ask gentle questions to better understand how you're feeling today.",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps] = useState(7);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    // Sample files for demonstration
    {
      id: "1",
      name: "Blood_Test_Results_Jan2025.pdf",
      type: "application/pdf",
      size: "2.4 MB",
      uploadDate: new Date("2025-01-15"),
      category: "Lab Results"
    },
    {
      id: "2", 
      name: "MRI_Scan_Report.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: "1.8 MB",
      uploadDate: new Date("2025-01-10"),
      category: "Imaging"
    },
    {
      id: "3",
      name: "Prescription_History.txt",
      type: "text/plain", 
      size: "45 KB",
      uploadDate: new Date("2025-01-08"),
      category: "Medications"
    }
  ]);
  
  const [patientProfile, setPatientProfile] = useState({
    age: "",
    gender: "",
    medicalHistory: [],
    currentMedications: [],
    allergies: [],
    emergencyContact: "",
  });
  const [pendingFiles, setPendingFiles] = useState([]);
  const [assessmentPhase, setAssessmentPhase] = useState("onboarding");
  const [extractedSymptoms, setExtractedSymptoms] = useState([]);
  const [urgencyLevel, setUrgencyLevel] = useState("low");
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const [errors, setErrors] = useState("");
  const [triageMessageCount, setTriageMessageCount] = useState(0);
  const TRIAGE_LIMIT = 9;  // Set your desired k, e.g. 3, 5 etc

  
  const recognitionRef = useRef(null);
  const chatContainerRef = useRef(null); // New ref for the scrollable chat div
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Setup browser SpeechRecognition
useEffect(() => {
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognitionRef.current = new SpeechRecognition();

  recognitionRef.current.lang = 'en-US';
  recognitionRef.current.interimResults = false;
  recognitionRef.current.maxAlternatives = 1;

  // On result, update input field
  recognitionRef.current.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInput((prevInput) => prevInput ? prevInput + ' ' + transcript : transcript);
    setIsRecording(false);
  };

  recognitionRef.current.onerror = (event) => {
    setIsRecording(false);
    // Optional: alert or log error
  };

  recognitionRef.current.onend = () => {
    setIsRecording(false);
  };
}, []);

const handleVoiceInput = () => {
  if (!recognitionRef.current) return;
  if (!isRecording) {
    setIsRecording(true);
    recognitionRef.current.start();
  } else {
    recognitionRef.current.stop();
    setIsRecording(false);
  }
};


  const scrollToBottom = () => {
  if (chatContainerRef.current) {
    const { scrollHeight, clientHeight } = chatContainerRef.current;
    chatContainerRef.current.scrollTop = scrollHeight - clientHeight; // Scroll to bottom instantly
    // Or add smooth animation: chatContainerRef.current.scrollTo({ top: scrollHeight, behavior: 'smooth' });
  }
};

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Emergency symptoms detection
  const emergencySymptoms = [
    "chest pain",
    "difficulty breathing",
    "severe headache",
    "loss of consciousness",
    "severe bleeding",
    "stroke symptoms",
    "heart attack",
    "severe abdominal pain",
  ];

  const checkForEmergency = (text) => {
    const lowerText = text.toLowerCase();
    return emergencySymptoms.some((symptom) => lowerText.includes(symptom));
  };

  // NLU and symptom extraction simulation
  const extractSymptoms = (text) => {
    const commonSymptoms = [
      "headache",
      "fever",
      "cough",
      "nausea",
      "fatigue",
      "dizziness",
      "chest pain",
      "shortness of breath",
      "abdominal pain",
      "joint pain",
    ];

    const found = commonSymptoms.filter((symptom) => 
      text.toLowerCase().includes(symptom)
    );
    return found;
  };

  const handleRestartTriage = () => {
  setTriageMessageCount(0);
  setSessionId(null);
  setMessages([
    {
      id: "welcome",
      role: "system",
      content:
        "Welcome to SahayAI. I'm here to help you understand your symptoms with compassionate, evidence-based guidance. Your wellbeing is my priority, and I'll ask gentle questions to better understand how you're feeling today.",
      timestamp: new Date(),
    },
  ]);
  setInput("");
  setPendingFiles([]);

  // Clear saved session id in localStorage if any
  localStorage.removeItem("triageSessionId");
};

  // Dynamic follow-up questions based on symptoms
  const generateFollowUpQuestions = (symptoms) => {
    const questions = [];

    if (symptoms.includes("headache")) {
      questions.push("On a scale of 1-10, how would you rate your headache?");
      questions.push("When did you first notice the headache?");
      questions.push("Have you experienced headaches like this before?");
    }

    if (symptoms.includes("fever")) {
      questions.push("Have you been able to take your temperature?");
      questions.push("How long have you been feeling feverish?");
      questions.push("Are you experiencing chills or night sweats?");
    }

    if (symptoms.includes("chest pain")) {
      questions.push("Can you describe the chest pain - is it sharp or dull?");
      questions.push("Does the pain spread to other areas?");
      questions.push("Does it hurt more when you breathe or move?");
    }

    return questions.slice(0, 3); // Limit to 3 follow-up questions
  };

  

  // File handling functions
  // In SymptomChecker.jsx
const handleFileUpload = async (event) => {
  const files = Array.from(event.target.files);
  if (!files.length) {
    alert('Please select at least one file to upload.');
    return;
  }

  setIsLoading(true);

  try {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));  // Key 'files' matches backend

    const response = await apiFetch('/upload', {
      method: 'POST',
      body: formData,
      headers: {}  // Empty—apiFetch handles it
    });

    // Update local state with uploaded files
    const newFiles = files.map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: formatFileSize(file.size),
      uploadDate: new Date(),
      category: categorizeFile(file.type),
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Add confirmation message
    const confirmationMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `Thank you for uploading your medical documents. I've received ${files.length} file(s) and updated your knowledge base: ${response.message}`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, confirmationMessage]);

  } catch (error) {
    console.error('Upload error:', error);
    if (error.message.includes('422')) {
      alert('Upload failed: Invalid request format (possible file validation issue). Ensure files are valid and try again.');
    } else if (error.message.includes('401')) {
      alert('Session expired. Please log in again.');
      localStorage.removeItem('token');
      // Optional: Redirect to login
    } else {
      alert('Failed to upload files: ' + error.message);
    }
  } finally {
    setIsLoading(false);
    event.target.value = ''; // Reset input
  }
};

const handleFileSelection = (event) => {
  const files = Array.from(event.target.files);
  if (!files.length) return;
  setPendingFiles(files);
  event.target.value = ''; // Reset input so user can select again if needed
};


  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const categorizeFile = (fileType) => {
    if (fileType.includes('pdf') || fileType.includes('document')) {
      return 'Lab Results';
    } else if (fileType.includes('image')) {
      return 'Imaging';
    } else if (fileType.includes('text')) {
      return 'Notes';
    } else {
      return 'Other';
    }
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) {
      return <FileText className="w-4 h-4 text-red-500" />;
    } else if (fileType.includes('image')) {
      return <Eye className="w-4 h-4 text-blue-500" />;
    } else if (fileType.includes('document')) {
      return <FileText className="w-4 h-4 text-blue-600" />;
    } else {
      return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Lab Results':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Imaging':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Medications':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Notes':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleSendMessage = async () => {
  // Prevent sending text if triage isn't complete and files are selected
  if (triageMessageCount < TRIAGE_LIMIT && pendingFiles.length > 0) {
    alert("Please complete triage questions before uploading files.");
    return;  // <== Important to return early here so code below doesn't run
  }
  
  if (!input.trim() && pendingFiles.length === 0) return;

  // Add user message immediately to UI
  if (input.trim()) {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }]);
  }

  setIsLoading(true);

  try {
    let responseData;

    if (triageMessageCount < TRIAGE_LIMIT) {
      // Send text-only input messages first to /triage
      // Note: Typically, triage doesn't handle files, so if files selected, you may want to block or warn user for now
      if (pendingFiles.length > 0) {
        alert("Please complete triage questions before uploading files.");
        setIsLoading(false);
        return;
      }

      responseData = await apiFetch('/triage', {
        method: 'POST',
        body: JSON.stringify({ session_id: sessionId, message: input }),
      });

      // Set session id if new
      if (!sessionId) setSessionId(responseData.session_id);

      setTriageMessageCount(prev => prev + 1);

      // Update your state based on triage response as before
      // ...

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseData.reply,
        timestamp: new Date(),
        // add others as needed
      };
      setMessages(prev => [...prev, assistantMessage]);

    } else {
      // After triage limit reached, send message + files (if any) via /chat

      const formData = new FormData();
      pendingFiles.forEach((file) => formData.append('files', file));
      if (input.trim()) formData.append('query', input);

      responseData = await apiFetch('/chat', {
        method: 'POST',
        body: formData,
        headers: {}, // apiFetch handles multipart
      });

      // Handle upload results to update uploadedFiles
      if (responseData.upload_results) {
        const newlyUploaded = responseData.upload_results
          .filter(r => r.status !== 'error')
          .map((res) => ({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: res.filename,
            type: categorizeFile(res.filename),
            size: "Unknown",
            uploadDate: new Date(),
            category: categorizeFile(res.filename),
          }));
        setUploadedFiles(prev => [...prev, ...newlyUploaded]);
      }

      // Append assistant answer
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseData.answer || "No answer available.",
        timestamp: new Date(),
      }]);

      // Clear pending files after upload
      setPendingFiles([]);
    }

    // Clear input
    setInput("");

  } catch (error) {
    console.error('Message sending error:', error);
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: "system",
      content: "Sorry, there was an error. Please try again.",
      timestamp: new Date(),
    }]);
  } finally {
    setIsLoading(false);
  }
};

  const handleQuickResponse = (response) => {
    setInput(response);
    setTimeout(() => handleSendMessage(), 100);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "emergency":
        return "text-red-600 bg-red-50 border-red-200";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "moderate":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
    }
  };

  const ProgressBar = ({ value }) => (
    <div className="w-full bg-teal-100 rounded-full h-2">
      <div 
        className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-full transition-all duration-300" 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );

  const Badge = ({ children, className = "" }) => (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );

  return (
    <div className="max-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/80 border-b border-teal-100/40 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
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
                  <h1 className="font-semibold text-slate-900">Compassionate Health Assessment</h1>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Heart className="w-3 h-3 text-rose-500" />
                    <span>Patient-Centered Care • Evidence-Based</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRestartTriage}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Restart Session
            </button>
            
            {/* Progress Indicator */}
            {/* <div className="flex items-center space-x-4">
              <div className="text-sm text-slate-600">
                Step {currentStep} of {totalSteps}
              </div>
              <div className="w-32">
                <ProgressBar value={(currentStep / totalSteps) * 100} />
              </div>
            </div> */}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Patient Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Health Profile Card */}
            {/* <div className="backdrop-blur-sm bg-white/80 border border-teal-100/60 rounded-2xl shadow-sm">
              <div className="p-6 border-b border-teal-50">
                <h2 className="text-lg font-semibold flex items-center space-x-2 text-slate-800">
                  <User className="w-5 h-5 text-teal-600" />
                  <span>Your Health Profile</span>
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Age & Gender</label>
                  <p className="text-sm text-slate-600">
                    {patientProfile.age || "Not provided"} • {patientProfile.gender || "Not specified"}
                  </p>
                </div>

                {extractedSymptoms.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-slate-700">Current Symptoms</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {extractedSymptoms.map((symptom, index) => (
                        <Badge key={index} className="bg-teal-50 text-teal-700 border border-teal-200">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {urgencyLevel !== "low" && (
                  <div>
                    <label className="text-sm font-medium text-slate-700">Care Priority</label>
                    <Badge className={`text-xs ${getUrgencyColor(urgencyLevel)}`}>
                      {urgencyLevel.toUpperCase()}
                    </Badge>
                  </div>
                )}

                {confidenceScore > 0 && (
                  <div>
                    <label className="text-sm font-medium text-slate-700">Assessment Confidence</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <ProgressBar value={confidenceScore} />
                      <span className="text-xs text-slate-600">{confidenceScore}%</span>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-teal-100">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <Shield className="w-3 h-3 text-teal-500" />
                    <span>Secure & HIPAA compliant</span>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Your Reports Card */}
            <div className="backdrop-blur-sm bg-white/80 border border-teal-100/60 rounded-2xl shadow-sm">
              <div className="p-6 border-b border-teal-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold flex items-center space-x-2 text-slate-800">
                    <FileText className="w-5 h-5 text-teal-600" />
                    <span>Your Reports</span>
                  </h2>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-1 px-3 py-1 text-xs bg-teal-50 text-teal-700 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Add Files</span>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {uploadedFiles.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">No reports uploaded yet</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 text-xs text-teal-600 hover:text-teal-700"
                    >
                      Upload your first report
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="group bg-slate-50/50 border border-slate-100 rounded-lg p-3 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-2 flex-1 min-w-0">
                            {getFileIcon(file.type)}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-800 truncate" title={file.name}>
                                {file.name}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={`text-xs ${getCategoryColor(file.category)}`}>
                                  {file.category}
                                </Badge>
                                <span className="text-xs text-slate-500">{file.size}</span>
                              </div>
                              <p className="text-xs text-slate-400 mt-1">
                                {file.uploadDate.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => removeFile(file.id)}
                              className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                              title="Remove file"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}


                {/* Your hidden file input ref—assuming it's defined elsewhere */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                  onChange={handleFileUpload}
                />

                {/* Optional: Your file count footer, if you have it */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <Database className="w-3 h-3 text-teal-500" />
                    <span>{uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''} uploaded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="h-[calc(100vh-200px)] flex flex-col backdrop-blur-sm bg-white/80 border border-teal-100/60 rounded-2xl shadow-sm">
              {/* Messages Area */}
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[calc(100vh-250px)]">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-teal-500 to-emerald-500"
                          : message.role === "system"
                            ? "bg-gradient-to-r from-rose-500 to-pink-500"
                            : "bg-gradient-to-r from-emerald-500 to-teal-500"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Heart className="w-4 h-4 text-white" />
                      )}
                    </div>

                    <div className={`max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
                      <div
                        className={`inline-block p-4 rounded-2xl ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                            : message.urgency === "emergency"
                              ? "bg-red-50 border-2 border-red-200 text-red-900"
                              : "bg-white/90 backdrop-blur-sm border border-teal-100/40 text-slate-800"
                        }`}
                      >
                        <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>

                        {message.confidence && (
                          <div className="mt-2 pt-2 border-t border-white/20">
                            <div className="flex items-center space-x-2 text-xs opacity-75">
                              <Brain className="w-3 h-3" />
                              <span>Confidence: {message.confidence}%</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Follow-up Questions */}
                      {message.followUp && message.followUp.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <div className="text-xs text-slate-600 mb-2">You can click to respond:</div>
                          {message.followUp.map((question, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickResponse(question)}
                              className="text-xs bg-white/80 border border-teal-100 hover:bg-teal-50 hover:border-teal-200 px-3 py-1 rounded-lg mr-2 mb-2 transition-colors"
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      )}

                      <div
                        className={`flex items-center mt-2 text-xs text-slate-500 ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.role === "user" && <CheckCircle className="w-3 h-3 ml-2 text-teal-500" />}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-sm">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm border border-teal-100/40 rounded-2xl p-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm text-slate-600">Carefully analyzing your symptoms...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {pendingFiles.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2 max-w-full overflow-x-auto">
                {pendingFiles.map((file, idx) => (
                  <div
                    key={`${file.name}-${file.size}-${idx}`}
                    className="flex items-center bg-teal-50 border border-teal-200 rounded-full px-3 py-1 text-xs text-teal-700 shadow-sm whitespace-nowrap"
                  >
                    {file.name}
                    <button
                      type="button"
                      onClick={() => setPendingFiles(prev => prev.filter((_, i) => i !== idx))}
                      className="ml-2 text-teal-500 hover:text-red-500 focus:outline-none"
                      aria-label={`Remove file ${file.name}`}
                      disabled={isLoading}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="p-6 border-t border-teal-100/40">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-teal-100/40 p-2 shadow-sm">
                <div className="flex items-center space-x-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Please describe how you're feeling..."
                    className="flex-1 border-0 bg-transparent focus:outline-none px-3 py-2 placeholder-slate-400"
                    disabled={isLoading}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (!(triageMessageCount < TRIAGE_LIMIT && pendingFiles.length > 0)) {
                          handleSendMessage();
                        } else {
                          alert("Please complete triage questions before uploading files.");
                        }
                      }
                    }}
                  />

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      if (files.length > 0) {
                        setPendingFiles((prev) => [...prev, ...files]);
                      }
                      e.target.value = '';
                    }}
                    disabled={isLoading}
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-slate-500 hover:text-teal-600 transition-colors"
                    title="Upload files"
                    disabled={isLoading}
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    className={`p-2 text-slate-500 hover:text-teal-600 transition-colors ${isRecording ? "text-red-500" : ""}`}
                    onClick={handleVoiceInput}
                    disabled={isLoading}
                    title={isRecording ? "Stop recording" : "Start voice typing"}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  {isRecording && <span className="ml-2 text-xs text-red-500">Listening...</span>}


                  <button
                    onClick={handleSendMessage}
                    disabled={(pendingFiles.length === 0 && !input.trim()) || isLoading}
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 disabled:opacity-50 text-white p-2 rounded-lg transition-colors shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-xs hover:text-teal-600 transition-colors">
                    <Calendar className="w-3 h-3" />
                    <span>Schedule Visit</span>
                  </button>
                  <button className="flex items-center space-x-1 text-xs hover:text-teal-600 transition-colors">
                    <FileText className="w-3 h-3" />
                    <span>Save Summary</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Emergency Banner */}
        {urgencyLevel === "emergency" && (
          <div className="mt-6 border-2 border-red-500 bg-red-50 rounded-2xl shadow-lg">
            <div className="p-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-red-900">IMMEDIATE CARE NEEDED</h3>
                  <p className="text-red-700">
                    I'm concerned about your symptoms and want to ensure you receive immediate care. Please seek emergency medical attention right away.
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
                    <Phone className="w-4 h-4 mr-2" />
                    Call 911
                  </button>
                  <button className="border border-red-200 hover:bg-red-50 bg-transparent text-red-700 px-4 py-2 rounded-lg transition-colors">
                    Find Emergency Room
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;