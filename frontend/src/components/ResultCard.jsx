const severityColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200',
  unknown: 'bg-gray-100 text-gray-800 border-gray-200',
}

const urgencyColors = {
  immediate: 'bg-red-100 text-red-800',
  soon: 'bg-orange-100 text-orange-800',
  routine: 'bg-blue-100 text-blue-800',
}

export default function ResultCard({ result, onGoBack }) {
  return (
    <div className="animate-slide-in">
      {/* Header */}
      <div className="gradient-bg text-white p-6 rounded-t-2xl -mx-8 sm:-mx-10 -mt-8 sm:-mt-10 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">📋 Analysis Result</h2>
      </div>

      <div className="space-y-4">
        {/* Symptoms */}
        <Section
          icon="🩺"
          title="Symptoms"
          badge={
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                severityColors[result.severity || 'unknown']
              }`}
            >
              {(result.severity || 'UNKNOWN').toUpperCase()} SEVERITY
            </span>
          }
        >
          <p className="text-gray-700">{result.symptoms}</p>
        </Section>

        {/* Diagnosis */}
        <Section icon="🔬" title="Diagnosis">
          <p className="text-gray-700 leading-relaxed">{result.diagnosis}</p>
          {result.possible_conditions && result.possible_conditions.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-sm text-gray-600 mb-2">
                Possible Conditions:
              </h4>
              <ul className="space-y-1">
                {result.possible_conditions.map((condition, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Section>

        {/* Medications with Strong Disclaimer */}
        <Section
          icon="💊"
          title="Medications"
          className="bg-red-50 border-red-300"
        >
          <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-bold text-red-900 mb-1">IMPORTANT MEDICAL DISCLAIMER</p>
                <p className="text-red-800 text-sm leading-relaxed">
                  {result.medication_disclaimer ||
                    'Do NOT take any medications without proper consultation with a qualified healthcare professional. The medications listed below are for informational purposes ONLY and should not be taken without a doctor\'s prescription and guidance.'}
                </p>
              </div>
            </div>
          </div>

          {result.medications && result.medications.length > 0 ? (
            <ul className="space-y-2">
              {result.medications.map((med, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-primary-500 font-bold mt-1">✓</span>
                  <span>{med}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic">
              Consult a doctor for appropriate medications
            </p>
          )}
        </Section>

        {/* Diet Recommendations */}
        <Section icon="🥗" title="Diet Recommendations">
          {result.diet && result.diet.length > 0 ? (
            <ul className="space-y-2">
              {result.diet.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Maintain a balanced diet and stay hydrated</p>
          )}
        </Section>

        {/* Precautions */}
        <Section icon="⚠️" title="Precautions & Self-Care">
          <p className="text-gray-700 leading-relaxed">{result.precautions}</p>
        </Section>

        {/* Doctor Consultation Alert */}
        {result.doctor_visit && result.doctor_visit.toLowerCase() === 'yes' && (
          <Section
            icon="👨‍⚕️"
            title="Doctor Consultation Required"
            className="bg-yellow-50 border-yellow-300"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {result.urgency && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      urgencyColors[result.urgency.toLowerCase()] || urgencyColors.routine
                    }`}
                  >
                    {(result.urgency || 'ROUTINE').toUpperCase()}
                  </span>
                )}
              </div>
              <p className="text-yellow-900 flex-1">
                Based on your symptoms and their severity, we{' '}
                <strong>strongly recommend</strong> consulting a healthcare professional{' '}
                {result.urgency === 'immediate' ? 'immediately' : 'as soon as possible'}.
              </p>
            </div>
          </Section>
        )}

        {/* Emergency Warning */}
        {result.when_to_seek_emergency && (
          <Section
            icon="🚨"
            title="When to Seek Emergency Care"
            className="bg-red-50 border-red-400"
          >
            <p className="text-red-900 font-semibold leading-relaxed">
              {result.when_to_seek_emergency}
            </p>
          </Section>
        )}

        {/* Recommendations */}
        <Section icon="💡" title="General Recommendations">
          <p className="text-gray-700 leading-relaxed">{result.recommendations}</p>
        </Section>

        {/* Back Button */}
        <div className="pt-4 flex justify-center">
          <button onClick={onGoBack} className="btn-primary">
            ← Check Another Symptom
          </button>
        </div>
      </div>
    </div>
  )
}

function Section({ icon, title, children, badge, className = '' }) {
  return (
    <div className={`section-card ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
          <span className="text-2xl">{icon}</span>
          {title}
        </h3>
        {badge && badge}
      </div>
      {children}
    </div>
  )
}
