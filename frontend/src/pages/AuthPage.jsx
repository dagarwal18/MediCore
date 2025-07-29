import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  Shield,
  Heart,
  CheckCircle,
  AlertTriangle,
  Stethoscope,
  Brain,
  UserCheck,
  Activity,
  Star,
  MessageCircle,
  Camera,
  Upload,
  X,
  Check
} from "lucide-react";

const LoginRegister = ({ setCurrentPage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [step, setStep] = useState(1); // For multi-step registration
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    // Login fields
    email: "",
    password: "",
    rememberMe: false,
    
    // Registration fields
    firstName: "",
    lastName: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    emergencyContact: "",
    emergencyContactPhone: "",
    medicalHistory: [],
    currentMedications: [],
    allergies: [],
    agreeToTerms: false,
    agreeToPrivacy: false,
    marketingOptIn: false
  });

  const profileImageRef = useRef(null);

  // Medical conditions for selection
  const commonConditions = [
    "Diabetes", "Hypertension", "Asthma", "Heart Disease", 
    "Arthritis", "Depression", "Anxiety", "Thyroid Disorders",
    "High Cholesterol", "Osteoporosis", "COPD", "Kidney Disease"
  ];

  const commonAllergies = [
    "Penicillin", "Shellfish", "Nuts", "Dairy", "Eggs", 
    "Soy", "Latex", "Pollen", "Dust Mites", "Pet Dander"
  ];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
    if (profileImageRef.current) {
      profileImageRef.current.value = '';
    }
  };

  const validateCurrentStep = () => {
    const newErrors = {};

    if (isLogin) {
      if (!formData.email) newErrors.email = "Email is required";
      else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email";
      
      if (!formData.password) newErrors.password = "Password is required";
    } else {
      // Registration validation based on step
      switch (step) {
        case 1:
          if (!formData.firstName) newErrors.firstName = "First name is required";
          if (!formData.lastName) newErrors.lastName = "Last name is required";
          if (!formData.email) newErrors.email = "Email is required";
          else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email";
          if (!formData.phone) newErrors.phone = "Phone number is required";
          else if (!validatePhone(formData.phone)) newErrors.phone = "Please enter a valid phone number";
          break;

        case 2:
          if (!formData.password) newErrors.password = "Password is required";
          else if (!validatePassword(formData.password)) {
            newErrors.password = "Password must be at least 8 characters with uppercase, lowercase, and number";
          }
          if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
          else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
          }
          if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
          if (!formData.gender) newErrors.gender = "Please select your gender";
          break;

        case 3:
          if (!formData.emergencyContact) newErrors.emergencyContact = "Emergency contact name is required";
          if (!formData.emergencyContactPhone) newErrors.emergencyContactPhone = "Emergency contact phone is required";
          else if (!validatePhone(formData.emergencyContactPhone)) {
            newErrors.emergencyContactPhone = "Please enter a valid phone number";
          }
          break;

        case 4:
          if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms of service";
          if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = "You must agree to the privacy policy";
          break;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateCurrentStep()) return;

  setIsLoading(true);

  const API_BASE_URL = 'http://localhost:8000'; // Update if needed

  try {
    if (isLogin) {
      // Handle login (unchanged, as it doesn't use the new fields)
      const loginData = {
        username: formData.email,
        password: formData.password,
      };

      if (!formData.email || !formData.password) {
        throw new Error('Email and password are required for login');
      }

      console.log("Login data:", loginData);

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const { access_token, token_type } = await response.json();
      localStorage.setItem('token', `${token_type} ${access_token}`);

      console.log("Login successful:", { email: formData.email });

      setSuccess(true);
      setTimeout(() => {
        setCurrentPage('home');
      }, 2000);
    } else {
      if (step < 4) {
        setStep(step + 1);
      } else {
        // Handle registration
        // Combine firstName and lastName into full_name
        const fullName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim();
        if (!fullName) {
          throw new Error('First name and last name are required to create full name');
        }

        const registerData = {
          email: formData.email,
          full_name: fullName, // Combined for backend
          password: formData.password,
        };

        // Validation
        if (!registerData.email || !registerData.full_name || !registerData.password) {
          throw new Error('Email, full name, and password are required for registration');
        }
        if (!registerData.email.includes('@')) {
          throw new Error('Invalid email format');
        }

        console.log("Registration data:", registerData);

        const registerResponse = await fetch(`${API_BASE_URL}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registerData),
        });

        if (!registerResponse.ok) {
          const errorData = await registerResponse.json();
          throw new Error(errorData.detail || 'Registration failed');
        }

        const { user_id } = await registerResponse.json();
        console.log("User registered successfully:", { user_id });

        // Auto-login to get token
        const loginData = {
          username: formData.email,
          password: formData.password,
        };

        const loginResponse = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(loginData),
        });

        if (!loginResponse.ok) {
          throw new Error('Auto-login after registration failed');
        }

        const { access_token, token_type } = await loginResponse.json();
        const token = `${token_type} ${access_token}`;
        localStorage.setItem('token', token);

        // Update profile: Combine medicalHistory and allergies into a single string
        const combinedMedicalHistory = [
          formData.medicalHistory?.length > 0 ? `Medical History: ${formData.medicalHistory.join(', ')}` : '',
          formData.allergies?.length > 0 ? `Allergies: ${formData.allergies.join(', ')}` : '',
        ].filter(Boolean).join('; ') || undefined; // undefined if empty

        const profileUpdateData = {
          full_name: fullName, // Optional update
          age: formData.age ? parseInt(formData.age, 10) : undefined, // Assuming age is collected elsewhere
          sex: formData.sex, // Assuming collected elsewhere
          medical_history: combinedMedicalHistory,
          // If you extend backend: Add phone and emergencyContact here
          // phone: formData.phone,
          // emergency_contact: formData.emergencyContact,
        };

        // Remove undefined fields
        Object.keys(profileUpdateData).forEach(key => profileUpdateData[key] === undefined && delete profileUpdateData[key]);

        console.log("Profile update data:", profileUpdateData);

        const profileResponse = await fetch(`${API_BASE_URL}/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify(profileUpdateData),
        });

        if (!profileResponse.ok) {
          const errorData = await profileResponse.json();
          throw new Error(errorData.detail || 'Profile update failed');
        }

        console.log("Registration and profile update successful:", formData);

        setSuccess(true);
        setTimeout(() => {
          setCurrentPage('home');
          // Optional: setIsLogin(true);
        }, 2000);
      }
    }
  } catch (error) {
    console.error("Error in handleSubmit:", error);
    if (error.response) {
      error.response.json().then((data) => console.error("Backend error details:", data));
    }
    setErrors(error.message || 'An unexpected error occurred');
  } finally {
    setIsLoading(false);
  }
};



  const renderLoginForm = () => (
    <div className="space-y-6">
      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white/80'
            }`}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
              errors.password ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white/80'
            }`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {errors.password}
          </p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
            className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
          />
          <span className="ml-2 text-sm text-slate-600">Remember me</span>
        </label>
        <button type="button" className="text-sm text-teal-600 hover:text-teal-700">
          Forgot password?
        </button>
      </div>
    </div>
  );

const renderRegistrationStep = () => {
  switch (step) {
    case 1:
      return (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Personal Information</h3>
            <p className="text-sm text-slate-600">Let's start with your basic details</p>
          </div>

          {/* Profile Image Upload */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center overflow-hidden">
                {profileImagePreview ? (
                  <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-white" />
                )}
              </div>
              <button
                type="button"
                onClick={() => profileImageRef.current?.click()}
                className="absolute -bottom-2 -right-2 bg-white border-2 border-teal-200 rounded-full p-2 hover:bg-teal-50 transition-colors shadow-sm"
              >
                <Camera className="w-4 h-4 text-teal-600" />
              </button>
              {profileImagePreview && (
                <button
                  type="button"
                  onClick={removeProfileImage}
                  className="absolute -top-2 -right-2 bg-red-100 border-2 border-red-200 rounded-full p-1 hover:bg-red-200 transition-colors"
                >
                  <X className="w-3 h-3 text-red-600" />
                </button>
              )}
            </div>
            <input
              ref={profileImageRef}
              type="file"
              accept="image/*"
              onChange={handleProfileImageUpload}
              className="hidden"
            />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                  errors.firstName ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white/80'
                }`}
                placeholder="First name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                  errors.lastName ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white/80'
                }`}
                placeholder="Last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white/80'
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                  errors.phone ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white/80'
                }`}
                placeholder="Enter your phone number"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>
      );

    case 2:
      return (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Security & Personal Details</h3>
            <p className="text-sm text-slate-600">Create a secure password and tell us about yourself</p>
          </div>

          {/* Password Fields */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full pl-10 pr-12 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white/80'
                }`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.password}
              </p>
            )}
            <div className="mt-1 space-y-0.5">
              <div className={`flex items-center text-xs ${formData.password.length >= 8 ? 'text-green-600' : 'text-slate-400'}`}>
                <Check className="w-3 h-3 mr-1" />
                At least 8 characters
              </div>
              <div className={`flex items-center text-xs ${/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'text-green-600' : 'text-slate-400'}`}>
                <Check className="w-3 h-3 mr-1" />
                Uppercase and lowercase letters
              </div>
              <div className={`flex items-center text-xs ${/(?=.*\d)/.test(formData.password) ? 'text-green-600' : 'text-slate-400'}`}>
                <Check className="w-3 h-3 mr-1" />
                At least one number
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`w-full pl-10 pr-12 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                  errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white/80'
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Date of Birth
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                  errors.dateOfBirth ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white/80'
                }`}
              />
            </div>
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Gender
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Male', 'Female', 'Other'].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => handleInputChange('gender', gender)}
                  className={`p-2 border rounded-xl text-sm font-medium transition-colors ${
                    formData.gender === gender
                      ? 'bg-teal-50 border-teal-500 text-teal-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
            )}
          </div>
        </div>
      );

    case 3:
      return (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Emergency Contact & Medical History</h3>
            <p className="text-sm text-slate-600">Help us provide better care in case of emergencies</p>
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Emergency Contact Name
            </label>
            <input
              type="text"
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                errors.emergencyContact ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white/80'
              }`}
              placeholder="Full name of emergency contact"
            />
            {errors.emergencyContact && (
              <p className="mt-1 text-sm text-red-600">{errors.emergencyContact}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Emergency Contact Phone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="tel"
                value={formData.emergencyContactPhone}
                onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                  errors.emergencyContactPhone ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white/80'
                }`}
                placeholder="Emergency contact phone number"
              />
            </div>
            {errors.emergencyContactPhone && (
              <p className="mt-1 text-sm text-red-600">{errors.emergencyContactPhone}</p>
            )}
          </div>

          {/* Medical History */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Medical History (Optional)
            </label>
            <div className="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto">
              {commonConditions.map((condition) => (
                <label key={condition} className="flex items-center p-1 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.medicalHistory.includes(condition)}
                    onChange={() => handleArrayToggle('medicalHistory', condition)}
                    className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="ml-2 text-sm text-slate-600">{condition}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Known Allergies (Optional)
            </label>
            <div className="grid grid-cols-2 gap-1 max-h-24 overflow-y-auto">
              {commonAllergies.map((allergy) => (
                <label key={allergy} className="flex items-center p-1 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.allergies.includes(allergy)}
                    onChange={() => handleArrayToggle('allergies', allergy)}
                    className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="ml-2 text-sm text-slate-600">{allergy}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      );

    case 4:
      return (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Terms & Preferences</h3>
            <p className="text-sm text-slate-600">Please review and accept our terms to complete registration</p>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-3">
            <label className={`flex items-start p-3 border rounded-xl cursor-pointer transition-colors ${
              errors.agreeToTerms ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:bg-slate-50'
            }`}>
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 mt-1"
              />
              <div className="ml-3">
                <span className="text-sm font-medium text-slate-700">
                  I agree to the Terms of Service
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  By checking this, you agree to our terms of service and conditions of use.
                </p>
              </div>
            </label>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.agreeToTerms}
              </p>
            )}

            <label className={`flex items-start p-3 border rounded-xl cursor-pointer transition-colors ${
              errors.agreeToPrivacy ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:bg-slate-50'
            }`}>
              <input
                type="checkbox"
                checked={formData.agreeToPrivacy}
                onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 mt-1"
              />
              <div className="ml-3">
                <span className="text-sm font-medium text-slate-700">
                  I agree to the Privacy Policy
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  We will protect your personal information according to our privacy policy.
                </p>
              </div>
            </label>
            {errors.agreeToPrivacy && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.agreeToPrivacy}
              </p>
            )}

            <label className="flex items-start p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={formData.marketingOptIn}
                onChange={(e) => handleInputChange('marketingOptIn', e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 mt-1"
              />
              <div className="ml-3">
                <span className="text-sm font-medium text-slate-700">
                  Send me health tips and updates (Optional)
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  Receive helpful health information and product updates via email.
                </p>
              </div>
            </label>
          </div>

          {/* Registration Summary */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3">
            <h4 className="text-sm font-semibold text-teal-800 mb-1">Registration Summary</h4>
            <div className="space-y-0.5 text-xs text-teal-700">
              <p>• Name: {formData.firstName} {formData.lastName}</p>
              <p>• Email: {formData.email}</p>
              <p>• Phone: {formData.phone}</p>
              <p>• Emergency Contact: {formData.emergencyContact}</p>
              {formData.medicalHistory.length > 0 && (
                <p>• Medical History: {formData.medicalHistory.join(', ')}</p>
              )}
              {formData.allergies.length > 0 && (
                <p>• Allergies: {formData.allergies.join(', ')}</p>
              )}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side - Info Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="backdrop-blur-sm bg-white/80 border border-teal-100/60 rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                {isLogin ? 'Welcome Back!' : 'Join Our Healthcare Community'}
              </h2>
              <p className="text-slate-600 mb-6">
                {isLogin 
                  ? 'Sign in to access your personalized health assessments and continue your wellness journey with our compassionate AI.'
                  : 'Create your account to get personalized health guidance, secure medical record storage, and 24/7 access to our AI health assistant.'
                }
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-3">
            <div className="backdrop-blur-sm bg-white/80 border border-teal-100/60 rounded-2xl shadow-sm">
              {success ? (
                // Success State
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {isLogin ? 'Welcome Back!' : 'Registration Successful!'}
                  </h2>
                  <p className="text-slate-600 mb-6">
                    {isLogin 
                      ? 'You have successfully signed in. Redirecting to your dashboard...'
                      : 'Your account has been created successfully. Welcome to SahayAI!'
                    }
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <Activity className="w-4 h-4 text-teal-600 animate-pulse" />
                    <span className="text-sm text-slate-600">Redirecting...</span>
                  </div>
                </div>
              ) : (
                // Form State
                <>
                  {/* Form Header */}
                  <div className="p-6 border-b border-teal-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                          {isLogin ? 'Sign In' : 'Create Account'}
                        </h2>
                        <p className="text-sm text-slate-600">
                          {isLogin 
                            ? 'Access your health dashboard' 
                            : 'Start your personalized health journey'
                          }
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsLogin(!isLogin);
                          setStep(1);
                          setErrors({});
                        }}
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                      >
                        {isLogin ? 'Create Account' : 'Sign In'}
                      </button>
                    </div>
                  </div>

                  {/* Form Body */}
                  <form onSubmit={handleSubmit} className="p-6">
                    {isLogin ? renderLoginForm() : renderRegistrationStep()}

                    {/* Submit Button */}
                    <div className="mt-8 space-y-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 text-white text-lg px-6 py-4 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                            <span>Processing...</span>
                          </div>
                        ) : (
                          <>
                            {isLogin ? (
                              <>
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Sign In to Your Account
                              </>
                            ) : (
                              step < 4 ? (
                                <>
                                  Continue
                                  <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-5 h-5 mr-2" />
                                  Complete Registration
                                </>
                              )
                            )}
                          </>
                        )}
                      </button>

                      {/* Back Button for Registration */}
                      {!isLogin && step > 1 && (
                        <button
                          type="button"
                          onClick={() => setStep(step - 1)}
                          className="w-full bg-white border-2 border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-teal-700 text-lg px-6 py-4 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                          <ArrowLeft className="w-5 h-5 mr-2" />
                          Back to Previous Step
                        </button>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-6 border-t border-teal-100 text-center">
                      <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
                        <Shield className="w-3 h-3 text-teal-500" />
                        <span>Secure & HIPAA compliant • Your privacy is protected</span>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-teal-400/15 to-emerald-400/15 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-40 right-10 w-64 h-64 bg-gradient-to-r from-rose-400/15 to-pink-400/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>
      
      {/* Medical cross patterns */}
      <div className="absolute top-1/2 left-1/4 w-3 h-12 bg-teal-300/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-3 bg-teal-300/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      
      <div className="absolute top-1/3 right-1/4 w-2 h-8 bg-emerald-300/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-2 bg-emerald-300/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      {/* Floating medical icons */}
      <div className="absolute top-32 right-32 animate-bounce" style={{animationDelay: '2s'}}>
        <Shield className="w-8 h-8 text-teal-400/40" />
      </div>
      <div className="absolute bottom-40 left-16 animate-bounce" style={{animationDelay: '4s'}}>
        <Activity className="w-6 h-6 text-emerald-400/40" />
      </div>
    </div>
  );
};

export default LoginRegister;
