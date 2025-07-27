// AI response simulation utility
export const generateAIResponse = (userMessage) => {
  const responses = {
    'headache': "Headaches can have various causes. If accompanied by fever, it might indicate an infection. Consider rest, hydration, and over-the-counter pain relief. Seek medical attention if symptoms worsen or persist for more than 2 days.",
    
    'fever': "Fever is your body's natural response to infection. Stay hydrated, rest, and monitor your temperature. Seek medical care if fever exceeds 103°F (39.4°C), persists for more than 3 days, or is accompanied by severe symptoms.",
    
    'flu': "Common flu symptoms include fever, body aches, fatigue, cough, and congestion. Most people recover within 7-10 days with rest and fluids. Consider antiviral medication if symptoms are severe or you're at high risk. Seek medical care if you have difficulty breathing or severe dehydration.",
    
    'anxiety': "Anxiety is common and treatable. Practice deep breathing exercises, maintain regular exercise, and try mindfulness techniques. If anxiety interferes with daily life, disrupts sleep, or causes physical symptoms, consider speaking with a mental health professional.",
    
    'doctor': "You should see a doctor if you experience: severe or worsening symptoms, symptoms lasting more than a few days, high fever, difficulty breathing, chest pain, severe headache, or if you have concerns about existing health conditions. Trust your instincts about your body.",
    
    'cough': "Coughs can be caused by viral infections, allergies, or other conditions. Stay hydrated, use throat lozenges, and consider honey for soothing. See a doctor if the cough persists for more than 2 weeks, produces blood, or is accompanied by high fever.",
    
    'stomach': "Stomach issues can range from food poisoning to stress. Stay hydrated with clear fluids, try the BRAT diet (bananas, rice, applesauce, toast), and rest. Seek medical attention for severe pain, persistent vomiting, or signs of dehydration.",
    
    'chest pain': "Chest pain should always be taken seriously. It could indicate heart problems, muscle strain, or other conditions. Seek immediate medical attention, especially if accompanied by shortness of breath, nausea, or pain radiating to arms or jaw.",
    
    'breathing': "Difficulty breathing requires immediate medical attention. Call emergency services if you have severe shortness of breath, chest pain, or blue lips/fingernails. For mild breathing issues, try sitting upright and taking slow, deep breaths.",
    
    'default': "I understand your concern. Based on what you've described, I recommend monitoring your symptoms closely. If they persist, worsen, or you develop additional concerning symptoms, please consult with a healthcare professional for proper evaluation and treatment. Remember, this is general information and not a substitute for professional medical advice."
  };

  const lowerMessage = userMessage.toLowerCase();
  
  // Check for emergency keywords first
  const emergencyKeywords = ['chest pain', 'can\'t breathe', 'difficulty breathing', 'severe pain', 'emergency'];
  for (const keyword of emergencyKeywords) {
    if (lowerMessage.includes(keyword)) {
      return "⚠️ This sounds like it could be a medical emergency. Please call emergency services (911) immediately or go to the nearest emergency room. Do not delay seeking immediate medical care.";
    }
  }
  
  // Check for specific conditions
  for (const [key, response] of Object.entries(responses)) {
    if (key !== 'default' && lowerMessage.includes(key)) {
      return response;
    }
  }
  
  return responses.default;
};