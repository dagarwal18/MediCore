const QuickQuestions = ({ onQuestionClick }) => {
  const quickQuestions = [
    "I have a headache and fever",
    "What are the symptoms of flu?",
    "When should I see a doctor?",
    "I'm feeling anxious lately"
  ];

  return (
    <div className="px-6 pb-4">
      <div className="text-sm text-slate-600 mb-3">Quick questions to get started:</div>
      <div className="flex flex-wrap gap-2">
        {quickQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="text-xs bg-white/60 border border-white/20 hover:bg-white/80 px-3 py-2 rounded-lg transition-all"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickQuestions;