import { useState } from 'react'

const examples = [
  'I have a persistent headache and vomiting',
  'I feel chest pain and shortness of breath',
  'I have fever, cough and body ache for 3 days',
  'Sharp stomach pain and diarrhea',
]

export default function SymptomForm({ onAnalyze, error }) {
  const [symptoms, setSymptoms] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (symptoms.trim()) {
      onAnalyze(symptoms)
    }
  }

  const handleExampleClick = (example) => {
    setSymptoms(example)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-scale-in">
      {/* Textarea */}
      <div>
        <label htmlFor="symptoms" className="block text-white font-semibold text-lg mb-3">
          Describe your symptoms in detail:
        </label>
        <textarea
          id="symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="input-field min-h-[160px] resize-y"
          placeholder="Example: I have a severe headache, nausea, and sensitivity to light for the past 2 days..."
          required
        />
      </div>

      {/* Quick Examples */}
      <div className="bg-gray-800 bg-opacity-70 rounded-2xl p-6 border border-gray-700">
        <h4 className="text-base font-semibold text-indigo-400 mb-4">
          Quick Examples (Click to use):
        </h4>
        <div className="flex flex-wrap gap-3">
          {examples.map((example, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleExampleClick(example)}
              className="bg-gray-700 text-indigo-300 text-sm px-5 py-2.5 rounded-xl border border-gray-600
                       hover:bg-indigo-600 hover:text-white hover:border-indigo-500
                       transition-all duration-300 font-medium"
            >
              {example.split(' ').slice(0, 3).join(' ')}...
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900 bg-opacity-50 border border-red-500 rounded-2xl p-4 animate-slide-in">
          <p className="text-red-300 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <button 
          type="submit" 
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl
                   font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105
                   transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>🔍</span>
          Analyze Symptoms
        </button>
        <button
          type="button"
          onClick={() => setSymptoms('')}
          className="bg-gray-700 text-gray-200 px-8 py-4 rounded-xl font-semibold text-lg
                   hover:bg-gray-600 hover:shadow-md transition-all duration-300"
        >
          Clear
        </button>
      </div>
    </form>
  )
}