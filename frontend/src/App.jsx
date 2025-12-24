import { useState } from 'react'
import { ArrowLeft, ExternalLink, AlertCircle, Heart, Pill, Utensils, ShieldAlert, Activity } from 'lucide-react'
import SymptomForm from './components/SymptomForm'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [showSources, setShowSources] = useState(false)

  const handleAnalyze = async (symptoms) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Received data from backend:', data)
      setResult(data)
    } catch (err) {
      console.error('Error:', err)
      setError('Failed to analyze symptoms. Please ensure the server is running and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoBack = () => {
    setResult(null)
    setError(null)
    setShowSources(false)
  }

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Main Content Area - Left Side */}
      <div className="flex-1 bg-[#1a1f2e] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="absolute inset-0 bg-cyan-400 rounded-2xl opacity-30 blur-md animate-pulse"></div>
                <svg className="w-7 h-7 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.5 3.5c-1.4 0-2.6.6-3.5 1.5-.9-.9-2.1-1.5-3.5-1.5-2.8 0-5 2.2-5 5 0 1 .3 2 .8 2.8L12 16l3.7-4.7c.5-.8.8-1.8.8-2.8 0-2.8-2.2-5-5-5zm-7.5 5c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3zM7 14c-2.2 0-4 1.8-4 4v4h2v-4c0-1.1.9-2 2-2s2 .9 2 2v4h2v-4c0-2.2-1.8-4-4-4zm10 0c-2.2 0-4 1.8-4 4v4h2v-4c0-1.1.9-2 2-2s2 .9 2 2v4h2v-4c0-2.2-1.8-4-4-4z"/>
                  <circle cx="12" cy="8.5" r="1.5" fill="white"/>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white">
                Health Triage AI
              </h1>
            </div>
            <p className="text-gray-400 text-sm ml-15">
              Powered by NEXUS AI
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-indigo-900 bg-opacity-50 border border-indigo-500 rounded-2xl px-6 py-3 mb-8">
            <p className="text-sm text-indigo-200">
              ⚠️ For informational purposes only. Always consult a healthcare professional.
            </p>
          </div>

          {/* Content */}
          {!loading && !result && (
            <SymptomForm onAnalyze={handleAnalyze} error={error} />
          )}

          {loading && <LoadingSpinner />}

          {result && (
            <ResultCard 
              result={result} 
              onGoBack={handleGoBack} 
              getSeverityColor={getSeverityColor}
              showSources={showSources}
              setShowSources={setShowSources}
            />
          )}
        </div>
      </div>

      {/* Sidebar - Right Side */}
      <div className="w-96 bg-gray-900 border-l border-gray-700 overflow-y-auto">
        <div className="p-6 sticky top-0">
          <Sidebar result={result} />
        </div>
      </div>
    </div>
  )
}

// ResultCard Component
function ResultCard({ result, onGoBack, getSeverityColor, showSources, setShowSources }) {
  return (
    <div className="animate-slide-in space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          Analysis Result
        </h2>
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 px-6 py-2.5 bg-gray-700 hover:bg-gray-600
                   text-white rounded-lg transition-all duration-300 font-medium text-sm"
        >
          + New Analysis
        </button>
      </div>

      {/* Opening Message - Cyan glow effect */}
      {result.opening_message && (
        <div className="neon-card bg-gray-800 bg-opacity-50 rounded-2xl p-6 border border-blue-400">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-blue-400 mb-2 text-lg">We're Here to Help</h3>
              <p className="text-white leading-relaxed text-sm">{result.opening_message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Your Symptoms - Purple/Pink glow effect */}
      <div className="neon-card bg-gray-800 bg-opacity-50 rounded-2xl p-6 border border-purple-400">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-purple-400 mb-2">Your Symptoms</h3>
            <p className="text-white leading-relaxed text-sm">{result.symptoms}</p>
          </div>
          <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-yellow-500 text-gray-900">
            {result.severity?.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Diagnosis */}
      {result.diagnosis && (
        <div className="neon-card bg-gray-800 bg-opacity-50 rounded-2xl p-6 border border-indigo-400">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-indigo-400 flex items-center gap-2">
              Understanding Your Condition
            </h3>
          </div>
          <div className="ml-16">
            <ul className="space-y-3">
              {(Array.isArray(result.diagnosis) 
                ? result.diagnosis 
                : (typeof result.diagnosis === 'string' ? result.diagnosis.split('\n\n').filter(p => p.trim()) : [result.diagnosis])
              ).map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-white">
                  <span className="text-indigo-400 font-bold text-xl flex-shrink-0 mt-0.5">•</span>
                  <span className="text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Medications Section with Strong Disclaimer */}
      {result.medications && result.medications.length > 0 && (
        <div className="neon-card bg-gray-800 bg-opacity-50 rounded-2xl p-6 border border-violet-400">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-violet-400 mb-4">Possible Medications</h3>
              
              {/* Strong Medical Disclaimer */}
              <div className="bg-violet-900 bg-opacity-30 border border-violet-500 rounded-xl p-5 mb-4">
                <p className="text-sm font-bold text-violet-300 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  IMPORTANT MEDICAL DISCLAIMER
                </p>
                <p className="text-sm text-white leading-relaxed">
                  {result.medication_disclaimer || 
                    "DO NOT take any of these medications without consulting your doctor or pharmacist first. These are general suggestions only and may not be appropriate for your specific situation, medical history, or current medications."}
                </p>
              </div>

              <ul className="space-y-3">
                {result.medications.map((med, index) => (
                  <li key={index} className="flex items-start gap-3 text-white bg-gray-700 bg-opacity-50 rounded-lg p-3">
                    <span className="text-violet-400 font-bold text-xl">•</span>
                    <span className="text-sm">{med}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Diet Recommendations */}
      {result.diet && result.diet.length > 0 && (
        <div className="neon-card bg-gray-800 bg-opacity-50 rounded-2xl p-6 border border-sky-400">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-sky-400 mb-4">Diet Recommendations</h3>
              <ul className="space-y-3">
                {result.diet.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-white bg-gray-700 bg-opacity-50 rounded-lg p-3">
                    <span className="text-sky-400 font-bold text-xl">✓</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Precautions & Immediate Remedies */}
      {result.precautions && (
        <div className="neon-card bg-gray-800 bg-opacity-50 rounded-2xl p-6 border border-blue-400">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-400 mb-3">Precautions & Immediate Remedies</h3>
              <div className="text-white leading-relaxed space-y-3 text-sm">
                {result.precautions.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Do's and Don'ts */}
      {result.dos_donts && (result.dos_donts.dos?.length > 0 || result.dos_donts.donts?.length > 0) && (
        <div className="neon-card bg-gray-800 bg-opacity-50 rounded-2xl p-6 border border-purple-400">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">✓✗</span>
            </div>
            <h3 className="text-xl font-bold text-purple-400">Do's and Don'ts</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 ml-16">
            {/* Do's */}
            {result.dos_donts.dos && result.dos_donts.dos.length > 0 && (
              <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 border border-purple-400">
                <h4 className="font-bold text-purple-400 mb-3 flex items-center gap-2">
                  <span className="text-xl">✓</span> Do's
                </h4>
                <ul className="space-y-2">
                  {result.dos_donts.dos.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-white">
                      <span className="text-purple-400 font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Don'ts */}
            {result.dos_donts.donts && result.dos_donts.donts.length > 0 && (
              <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 border border-purple-400">
                <h4 className="font-bold text-purple-400 mb-3 flex items-center gap-2">
                  <span className="text-xl">✗</span> Don'ts
                </h4>
                <ul className="space-y-2">
                  {result.dos_donts.donts.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-white">
                      <span className="text-purple-400 font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Doctor Visit Alert - Always show if doctor_visit is yes OR if doctor_specialist exists */}
      {(result.doctor_visit?.toLowerCase() === 'yes' || result.doctor_specialist) && (
        <div className="neon-card bg-gray-800 bg-opacity-50 rounded-2xl p-6 border border-violet-400">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-violet-400 mb-3">⚕️ Doctor Consultation Recommended</h3>
              <p className="text-white mb-3 text-sm">
                Based on your symptoms, we recommend consulting with a healthcare professional 
                for proper evaluation and treatment.
              </p>
              {result.doctor_specialist && (
                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 border border-violet-500">
                  <p className="font-semibold text-violet-400 mb-2">Recommended Specialist:</p>
                  <div className="text-white space-y-2 text-sm">
                    {result.doctor_specialist.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


    </div>
  )
}

// Sidebar Component
function Sidebar({ result }) {
  if (!result) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span className="text-indigo-400">◈</span> New Analysis
          </h3>
          <p className="text-gray-400 text-sm">
            Enter your symptoms to get started with AI-powered health analysis.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Analytics Dashboard */}
      {result.severity && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-white font-semibold mb-4 text-base flex items-center gap-2">
            📊 Analysis Dashboard
          </h3>
          
          {/* Severity Indicator */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Risk Level</span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                result.severity?.toLowerCase() === 'high' ? 'bg-red-500 text-white' :
                result.severity?.toLowerCase() === 'moderate' ? 'bg-yellow-500 text-gray-900' :
                'bg-green-500 text-white'
              }`}>{result.severity?.toUpperCase()}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  result.severity?.toLowerCase() === 'high' ? 'bg-red-500 w-full' :
                  result.severity?.toLowerCase() === 'moderate' ? 'bg-yellow-500 w-2/3' :
                  'bg-green-500 w-1/3'
                }`}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-700 bg-opacity-50 rounded-lg p-3 border border-gray-600">
              <div className="text-2xl font-bold text-indigo-400">
                {result.medications?.length || 0}
              </div>
              <div className="text-xs text-gray-400 mt-1">Medications</div>
            </div>
            <div className="bg-gray-700 bg-opacity-50 rounded-lg p-3 border border-gray-600">
              <div className="text-2xl font-bold text-purple-400">
                {result.diet?.length || 0}
              </div>
              <div className="text-xs text-gray-400 mt-1">Diet Items</div>
            </div>
            <div className="bg-gray-700 bg-opacity-50 rounded-lg p-3 border border-gray-600">
              <div className="text-2xl font-bold text-blue-400">
                {result.diagnosis?.length || 0}
              </div>
              <div className="text-xs text-gray-400 mt-1">Key Points</div>
            </div>
            <div className="bg-gray-700 bg-opacity-50 rounded-lg p-3 border border-gray-600">
              <div className="text-2xl font-bold text-sky-400">
                {result.sources?.length || 0}
              </div>
              <div className="text-xs text-gray-400 mt-1">Sources</div>
            </div>
          </div>

          {/* Doctor Visit Status */}
          {result.doctor_visit?.toLowerCase() === 'yes' && (
            <div className="mt-3 bg-violet-900 bg-opacity-30 border border-violet-500 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <span className="text-violet-400 text-lg">⚕️</span>
                <span className="text-xs font-semibold text-violet-300">Doctor Visit Recommended</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-base">
          <span className="text-indigo-400">◈</span> Quick Actions
        </h3>
        <ul className="space-y-2.5 text-sm text-gray-300">
          <li className="flex items-start gap-2 hover:text-white transition-colors cursor-pointer">
            <span className="text-indigo-400 mt-0.5">•</span>
            <span>Start new analysis</span>
          </li>
          <li className="flex items-start gap-2 hover:text-white transition-colors cursor-pointer">
            <span className="text-indigo-400 mt-0.5">•</span>
            <span>Consult healthcare professional</span>
          </li>
        </ul>
      </div>

      {/* Final Recommendations */}
      {result.recommendations && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-base">
            💡 Final Recommendations
          </h3>
          <div className="text-sm text-gray-300 leading-relaxed space-y-2">
            {result.recommendations.split('\n\n').slice(0, 2).map((paragraph, index) => (
              <p key={index} className="text-xs leading-relaxed">{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {/* Medical Sources */}
      {result.sources && result.sources.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-base">
            📚 Medical Sources
          </h3>
          <div className="space-y-2">
            {result.sources.slice(0, 3).map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-indigo-400 hover:text-indigo-300 transition-colors leading-snug"
              >
                → {source.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Health Tips */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-base">
          ✨ General Health Tips
        </h3>
        <ul className="space-y-2 text-xs text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-indigo-400 mt-0.5">•</span>
            <span>Stay hydrated throughout the day</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400 mt-0.5">•</span>
            <span>Get adequate rest and sleep</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400 mt-0.5">•</span>
            <span>Monitor your symptoms regularly</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400 mt-0.5">•</span>
            <span>Follow medical advice carefully</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default App
