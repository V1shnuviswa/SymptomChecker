export default function LoadingSpinner() {
  return (
    <div className="text-center py-12">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent"></div>
      <p className="mt-4 text-primary-600 font-semibold">
        AI Agent is analyzing your symptoms...
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Using DeepTech analysis
      </p>
    </div>
  )
}
